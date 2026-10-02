// Aktif lobiler: Steam'in web'den lobi listeleme arayüzü yok (lobi arama yalnızca oyun
// istemcisinde çalışır). Bu yüzden herkese açık Spacewar lobisi kuran oyun, lobisini
// her ~30 sn'de bir buraya bildirir; 75 sn ses gelmeyen lobi listeden düşer.
//
// Depolama: Vercel'de Upstash Redis bağlıysa (KV_REST_API_URL / KV_REST_API_TOKEN ya da
// UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) oraya yazar; yoksa sunucu belleğinde tutar.

export const dynamic = 'force-dynamic'

const TTL_MS = 75_000
const MAX_LOBBIES = 60
const HASH = 'ma:lobbies'

export type Lobby = {
  id: string
  name: string
  players: number
  max: number
  state: 'lobi' | 'oyunda'
  floor: number
  mode: '' | 'ffa' | 'team'
  oath: string
  ver: string
  ts: number
}

// ---------------- depolama ----------------
const KV_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

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

const mem = ((globalThis as { __maLobbies?: Map<string, string> }).__maLobbies ??= new Map())

async function readAll(): Promise<Record<string, string>> {
  if (!KV_URL || !KV_TOKEN) return Object.fromEntries(mem)
  const flat = ((await redis('HGETALL', HASH)) as string[] | null) ?? []
  const out: Record<string, string> = {}
  for (let i = 0; i + 1 < flat.length; i += 2) out[flat[i]] = flat[i + 1]
  return out
}

async function put(id: string, json: string) {
  if (!KV_URL || !KV_TOKEN) return void mem.set(id, json)
  await redis('HSET', HASH, id, json)
}

async function drop(ids: string[]) {
  if (!ids.length) return
  if (!KV_URL || !KV_TOKEN) return void ids.forEach((i) => mem.delete(i))
  await redis('HDEL', HASH, ...ids)
}

// Süresi geçenleri temizleyip canlı lobileri döndürür
async function live(): Promise<Lobby[]> {
  const now = Date.now()
  const all = await readAll()
  const out: Lobby[] = []
  const stale: string[] = []
  for (const [id, raw] of Object.entries(all)) {
    try {
      const l = JSON.parse(raw) as Lobby
      if (now - l.ts < TTL_MS) out.push(l)
      else stale.push(id)
    } catch {
      stale.push(id)
    }
  }
  await drop(stale)
  // önce katılınabilir lobiler, sonra kalabalık olanlar
  return out.sort((a, b) => Number(a.state === 'oyunda') - Number(b.state === 'oyunda') || b.players - a.players)
}

// ---------------- doğrulama ----------------
const clean = (v: unknown, n: number) =>
  String(v ?? '').replace(/[\u0000-\u001f\u007f<>]/g, '').trim().slice(0, n)
const int = (v: unknown, lo: number, hi: number) => Math.min(hi, Math.max(lo, Math.trunc(Number(v) || 0)))
const validId = (v: unknown) => typeof v === 'string' && /^\d{15,20}$/.test(v)

function parse(b: Record<string, unknown>): Lobby | null {
  if (!validId(b.id)) return null
  const max = int(b.max, 1, 8)
  return {
    id: b.id as string,
    name: clean(b.name, 32) || 'İsimsiz',
    players: int(b.players, 1, max),
    max,
    state: b.state === 'oyunda' ? 'oyunda' : 'lobi',
    floor: int(b.floor, 0, 999),
    mode: b.mode === 'ffa' || b.mode === 'team' ? b.mode : '',
    oath: clean(b.oath, 24),
    ver: clean(b.ver, 12),
    ts: Date.now(),
  }
}

// ---------------- uç noktalar ----------------
export async function GET() {
  try {
    const lobbies = await live()
    return Response.json({ lobbies }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ lobbies: [], error: 'depolama' }, { status: 503 })
  }
}

// Oyun kurucusu: lobiyi bildir / güncelle
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  const l = parse(body)
  if (!l) return Response.json({ ok: false }, { status: 400 })
  try {
    const all = await readAll()
    if (!(l.id in all) && Object.keys(all).length >= MAX_LOBBIES) {
      // dolu görünüyorsa önce bayatları temizle
      if ((await live()).length >= MAX_LOBBIES) return Response.json({ ok: false }, { status: 429 })
    }
    await put(l.id, JSON.stringify(l))
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 503 })
  }
}

// Oyun kurucusu: lobi kapandı
export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get('id')
  if (!validId(id)) return Response.json({ ok: false }, { status: 400 })
  try {
    await drop([id!])
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 503 })
  }
}
