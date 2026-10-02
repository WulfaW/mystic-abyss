// Liderlik tablosu: oyun, biten her koşuyu (ölüm ya da zafer) buraya bildirir.
// Tablolar: "all" (tüm zamanların en derin inişleri), "d-YYYY-MM-DD" (Günün Uçurumu),
// "w-N" (Haftalık Meydan Okuma: herkes aynı tohum ve yeminle). Her oyuncunun yalnızca en iyi koşusu tutulur.
//
// Depolama: lobilerle aynı Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN); yoksa sunucu belleği.
// Sıralama puanı: kat * 100000 + (99999 - süre sn) → önce derinlik, eşitlikte hızlı olan önde.

import { createHash } from 'node:crypto'

export const dynamic = 'force-dynamic'

const KV_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
// Oyunla paylaşılan imza anahtarı (sahte skor göndermeyi zorlaştırır)
const SECRET = process.env.LB_SECRET ?? '3a72d923749ed87547798d5507bcc8d3'
const KEEP = 100
const CLASSES = ['warrior', 'rogue', 'mage', 'priest', 'paladin', 'archer', 'bard', 'gunslinger', 'warlock', 'necromancer']

export type Entry = {
  name: string
  cls: string
  floor: number
  kills: number
  time: number
  won: boolean
  party: number
  oath: string
  ver: string
  ts: number
}

async function redis(...cmd: (string | number)[]): Promise<unknown> {
  const r = await fetch(KV_URL!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    body: JSON.stringify(cmd),
    cache: 'no-store',
  })
  if (!r.ok) throw new Error(`redis ${r.status}`)
  return ((await r.json()) as { result: unknown }).result
}

type Mem = Map<string, Map<string, { score: number; json: string }>>
const mem = ((globalThis as { __maLb?: Mem }).__maLb ??= new Map())
const useKv = () => Boolean(KV_URL && KV_TOKEN)

function validBoard(b: string): boolean {
  return b === 'all' || /^d-\d{4}-\d{2}-\d{2}$/.test(b) || /^w-\d{3,6}$/.test(b)
}

// tablo türüne göre ömür: günlük 3 gün, haftalık 3 hafta, genel kalıcı
function ttlOf(b: string): number {
  if (b.startsWith('d-')) return 3 * 86400
  if (b.startsWith('w-')) return 21 * 86400
  return 0
}

async function top(board: string, n: number): Promise<(Entry & { rank: number })[]> {
  if (!useKv()) {
    const m = mem.get(board)
    if (!m) return []
    return [...m.values()]
      .sort((a, b) => b.score - a.score)
      .slice(0, n)
      .map((v, i) => ({ ...(JSON.parse(v.json) as Entry), rank: i + 1 }))
  }
  const ids = ((await redis('ZREVRANGE', `ma:lb:${board}`, 0, n - 1)) as string[] | null) ?? []
  if (!ids.length) return []
  const raw = ((await redis('HMGET', `ma:lbi:${board}`, ...ids)) as (string | null)[] | null) ?? []
  const out: (Entry & { rank: number })[] = []
  raw.forEach((j) => {
    if (!j) return
    try {
      out.push({ ...(JSON.parse(j) as Entry), rank: out.length + 1 })
    } catch {}
  })
  return out
}

async function submit(board: string, member: string, score: number, e: Entry): Promise<boolean> {
  const json = JSON.stringify(e)
  if (!useKv()) {
    let m = mem.get(board)
    if (!m) mem.set(board, (m = new Map()))
    const old = m.get(member)
    if (old && old.score >= score) return false
    m.set(member, { score, json })
    return true
  }
  const key = `ma:lb:${board}`
  const old = (await redis('ZSCORE', key, member)) as string | null
  if (old !== null && Number(old) >= score) return false
  await redis('ZADD', key, score, member)
  await redis('HSET', `ma:lbi:${board}`, member, json)
  // tablo şişmesin: ilk KEEP dışındakiler silinir
  const size = Number(await redis('ZCARD', key))
  if (size > KEEP + 20) {
    const drop = ((await redis('ZRANGE', key, 0, size - KEEP - 1)) as string[]) ?? []
    if (drop.length) {
      await redis('ZREM', key, ...drop)
      await redis('HDEL', `ma:lbi:${board}`, ...drop)
    }
  }
  const ttl = ttlOf(board)
  if (ttl) {
    await redis('EXPIRE', key, ttl)
    await redis('EXPIRE', `ma:lbi:${board}`, ttl)
  }
  return true
}

const clean = (s: unknown, n: number) =>
  String(s ?? '')
    .replace(/[\u0000-\u001f<>]/g, '')
    .trim()
    .slice(0, n)

const int = (v: unknown, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.floor(Number(v) || 0)))

export async function GET(req: Request) {
  const u = new URL(req.url)
  const boards = (u.searchParams.get('boards') ?? u.searchParams.get('board') ?? 'all').split(',').filter(validBoard).slice(0, 4)
  const n = int(u.searchParams.get('n') ?? 20, 1, 50)
  try {
    const res: Record<string, unknown> = {}
    for (const b of boards) res[b] = await top(b, n)
    return Response.json({ boards: res }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ boards: {}, error: 'depolama' }, { status: 503 })
  }
}

export async function POST(req: Request) {
  let b: Record<string, unknown>
  try {
    b = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'json' }, { status: 400 })
  }
  const boards = (Array.isArray(b.boards) ? b.boards : [b.board]).map((x) => String(x)).filter(validBoard).slice(0, 3)
  const sid = clean(b.sid, 20)
  const name = clean(b.name, 24)
  const cls = clean(b.cls, 16)
  const floor = int(b.floor, 1, 999)
  const kills = int(b.kills, 0, 999999)
  const time = int(b.time, 0, 999999)
  const won = Boolean(b.won)
  const ver = clean(b.ver, 12)
  // imza: oyun aynı alanları aynı sırayla birleştirip özetler
  const canon = [boards.join(','), sid, name, cls, floor, kills, time, won ? 1 : 0, ver].join('|')
  const sig = createHash('sha256').update(`${SECRET}|${canon}`).digest('hex')
  if (sig !== String(b.sig ?? '')) return Response.json({ ok: false, error: 'imza' }, { status: 403 })
  if (!boards.length || !name || !CLASSES.includes(cls)) return Response.json({ ok: false, error: 'alan' }, { status: 400 })
  if (sid && !/^\d{15,20}$/.test(sid)) return Response.json({ ok: false, error: 'sid' }, { status: 400 })
  // akla yatkınlık: bir katı 15 sn'den kısa sürede bitirmek, kat başına 250'den fazla öldürme olmaz
  if (time < floor * 15 || kills > floor * 250) return Response.json({ ok: false, error: 'şüpheli' }, { status: 400 })
  const e: Entry = {
    name,
    cls,
    floor,
    kills,
    time,
    won,
    party: int(b.party, 1, 8),
    oath: clean(b.oath, 24),
    ver,
    ts: Date.now(),
  }
  const member = sid ? `s:${sid}` : `n:${name.toLocaleLowerCase('tr')}`
  const score = floor * 100000 + (99999 - Math.min(time, 99999))
  try {
    const res: Record<string, boolean> = {}
    for (const bd of boards) res[bd] = await submit(bd, member, score, e)
    return Response.json({ ok: true, best: res })
  } catch {
    return Response.json({ ok: false, error: 'depolama' }, { status: 503 })
  }
}
