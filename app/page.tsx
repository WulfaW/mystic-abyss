'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Download, Swords, Users, Skull, Zap } from 'lucide-react'
import { GiBroadsword, GiDaggers, GiSpellBook, GiHolySymbol, GiShield, GiBowArrow, GiHarp, GiMusket, GiDaemonSkull } from 'react-icons/gi'
import { motion } from 'framer-motion'

const itchUrl = 'https://arno4436.itch.io/the-mystic-abyys-2'

const screenshots = [
  'https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc1NC5wbmc=/original/Oi0skn.png',
  'https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc1Ni5wbmc=/original/f7YA5q.png',
  'https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc1Ny5wbmc=/original/rS24Ro.png',
  'https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc2MC5wbmc=/original/pxl4wT.png',
]

const features = [
  { icon: Users, title: '8 Kişilik Co-op', desc: 'Steam ve yerel IP üzerinden arkadaşlarınla in. Ölünce ruhuna dönüşürsün, dostların seni diriltebilir.' },
  { icon: Skull, title: '15 Muhafız, 30 Kat', desc: 'Her koşuda muhafızlar ve katlar yeniden üretilir. Hiçbir iniş bir öncekine benzemez.' },
  { icon: Zap, title: 'Korozyon Sistemi', desc: 'Uçurum zihnini çürütür. 100\'e ulaşırsa beden çözülür. Güç verir ama azami canı düşürür.' },
  { icon: Swords, title: 'PvP Arenası', desc: 'Kan Kolezyumu\'nda 2-8 kişilik Herkes Herkese veya Takım Savaşı modları seni bekliyor.' },
]

// Oyundaki herkese açık Steam (Spacewar) lobileri; kurucunun oyunu /api/lobbies'e bildirir
type Lobby = {
  id: string
  name: string
  players: number
  max: number
  state: 'lobi' | 'oyunda'
  floor: number
  mode: '' | 'ffa' | 'team'
  oath: string
  ver: string
}

function useLobbies() {
  const [lobbies, setLobbies] = useState<Lobby[] | null>(null)
  useEffect(() => {
    let alive = true
    const load = () =>
      fetch('/api/lobbies', { cache: 'no-store' })
        .then((r) => r.json())
        .then((d) => alive && setLobbies(d.lobbies ?? []))
        .catch(() => alive && setLobbies((l) => l ?? []))
    load()
    const t = setInterval(() => document.visibilityState === 'visible' && load(), 15000)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [])
  return lobbies
}

function lobbyTag(l: Lobby): [string, string] {
  if (l.mode === 'ffa') return ['PVP · HERKES', '#c0392b']
  if (l.mode === 'team') return ['PVP · TAKIM', '#c0392b']
  if (l.oath && l.oath !== 'Yemin yok') return [l.oath.toLocaleUpperCase('tr'), '#e67e22']
  return ['CO-OP', '#5a8a3a']
}

// Ateş kıvılcımları componenti
function Embers() {
  const [embers, setEmbers] = useState<any[]>([])

  useEffect(() => {
    // Rastgele 30 kıvılcım oluştur
    const newEmbers = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 5 + 5 + 's',
      animationDelay: Math.random() * 10 + 's',
      width: Math.random() * 4 + 2 + 'px',
      height: Math.random() * 4 + 2 + 'px',
    }))
    setEmbers(newEmbers)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {embers.map((e) => (
        <div
          key={e.id}
          className="ember"
          style={{
            left: e.left,
            width: e.width,
            height: e.height,
            animationDuration: e.animationDuration,
            animationDelay: e.animationDelay,
          }}
        />
      ))}
    </div>
  )
}

// Ortak fade-in componenti
function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function Page() {
  const [activeShot, setActiveShot] = useState(0)
  const [lobbyOpen, setLobbyOpen] = useState(true)
  const lobbies = useLobbies()
  const online = lobbies?.reduce((n, l) => n + l.players, 0) ?? 0

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <Embers />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#050302]/90 backdrop-blur-md"
        style={{ 
          borderBottom: '1px solid #2a1a0a',
          boxShadow: '0 4px 30px rgba(0,0,0,0.8)' 
        }}>
        <a href="#" className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase flex items-center group"
          style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', color: '#e8d5b0' }}>
          <span style={{ textShadow: '0 0 15px rgba(180,0,0,0.4)' }}>Mystic Abyss</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-xs tracking-[0.15em] uppercase"
          style={{ fontFamily: 'Cinzel, serif' }}>
          {[
            { label: 'Sınıflar', href: '#siniflar' },
            { label: 'Özellikler', href: '#ozellikler' },
            { label: 'Hakkında', href: '#hakkinda' },
          ].map(({ label, href }) => (
            <li key={label}>
              <a href={href} 
                className="relative text-[#a89070] hover:text-[#e8d5b0] transition-colors duration-300 py-2 group">
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c0392b] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
          <li>
            <a href={itchUrl} target="_blank" rel="noreferrer"
              className="diablo-btn diablo-btn-primary"
              style={{ padding: '8px 24px', fontSize: '0.75rem', letterSpacing: '0.2em', boxShadow: '0 0 0 2px #050000, 0 0 0 3px #5a1a1a, inset 0 0 10px rgba(0,0,0,0.95)' }}>
              HEMEN İNDİR
            </a>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}>
        {/* Karartma ve duman katmanı (yazı okunsun diye) */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(180deg, rgba(5,0,0,0.4) 0%, rgba(5,0,0,0.8) 50%, rgba(5,0,0,1) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(150,0,0,0.2) 0%, transparent 80%)',
        }} />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#8a6a3a' }}>
            — Online Co-op Dungeon Roguelike —
          </p>

          <h1 className="text-5xl md:text-8xl font-black uppercase leading-none mb-6 glow-red"
            style={{ fontFamily: 'Cinzel Decorative, Cinzel, serif', color: '#f0d9b5' }}>
            Mystic<br />
            <span style={{ color: '#8b0000', textShadow: '0 0 40px rgba(180,0,0,0.9), 0 0 80px rgba(120,0,0,0.5)' }}>
              Abyss
            </span>
            <span className="text-3xl md:text-5xl align-top ml-2" style={{ color: '#c0392b' }}>II</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#a89070' }}>
            8 kişilik online co-op. 30 katlı zindan. 9 sınıf. Uçurumun Kalbini durdur — eğer aklın yerinde kalırsa.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center">
            <a href={itchUrl} target="_blank" rel="noreferrer"
              className="diablo-btn diablo-btn-primary">
              OYUNU İNDİR
            </a>
            <a href="#siniflar"
              className="diablo-btn diablo-btn-secondary">
              DAHA FAZLA BİLGİ ↗
            </a>
          </div>

          <div className="mt-14">
            <a href="#ozellikler" className="inline-block text-xs uppercase tracking-[0.2em] transition-colors"
               style={{ color: '#a89070', fontFamily: 'Cinzel, serif', borderBottom: '1px solid #5a4a3a', paddingBottom: '4px' }}
               onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8d5b0'; (e.currentTarget as HTMLElement).style.borderBottomColor = '#c9973a'; }}
               onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a89070'; (e.currentTarget as HTMLElement).style.borderBottomColor = '#5a4a3a'; }}>
              Mystic Abyss II'ye Yeni mi Başlıyorsun? ↓
            </a>
          </div>
        </motion.div>

        {/* Aşağı kaydır */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" 
          style={{ color: '#4a3a2a' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      <div className="flex justify-center my-16">
        <svg width="600" height="24" viewBox="0 0 600 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
          <path d="M0 12h250l10-10 10 10h60l10-10 10 10h250" stroke="#3a2a1a" strokeWidth="2" />
          <circle cx="300" cy="12" r="4" fill="#8b0000" />
          <path d="M290 12l10-10 10 10-10 10z" fill="#3a2a1a" />
        </svg>
      </div>

      {/* ── UÇURUMA HOŞ GELDİN (50/50 Split) ── */}
      <section id="hakkinda" className="py-12 px-4 max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group cursor-pointer stone-border overflow-hidden">
              <img 
                src="https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc1Ni5wbmc=/original/f7YA5q.png" 
                alt="Mystic Abyss Oynanış" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#a89070] flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:border-[#e8d5b0] transition-colors">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[#e8d5b0] border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl uppercase tracking-widest mb-6" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
                UÇURUMA<br/>HOŞ GELDİN
              </h2>
              <p className="leading-relaxed text-base md:text-lg mb-6" style={{ color: '#8a7060' }}>
                Aksiyon roguelike türünü baştan tanımlayan ve amansız bir zorluk sunan bu karanlık dünyayı keşfet. Aethelgard şehrinin altında yatan dehşet, 30 katlık sonsuz bir zindanda seni bekliyor.
              </p>
              <p className="leading-relaxed text-base md:text-lg" style={{ color: '#8a7060' }}>
                Karanlık yayılırken korozyon zihnini yutuyor. Uçurum her adımda değişiyor, yeni tuzaklar ve muhafızlar karşına çıkıyor. Bu lanetli derinliklerde her şeyi tüketen karanlığa ışık getirmeye çok az kişi cesaret edebilir.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="flex justify-center my-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b0000]/20 to-transparent pointer-events-none blur-3xl"></div>
        <svg width="600" height="24" viewBox="0 0 600 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70 relative z-10">
          <path d="M0 12h250l10-10 10 10h60l10-10 10 10h250" stroke="#3a2a1a" strokeWidth="2" />
          <circle cx="300" cy="12" r="4" fill="#8b0000" />
          <path d="M290 12l10-10 10 10-10 10z" fill="#3a2a1a" />
        </svg>
      </div>

      {/* ── SON GÜNCELLEMELER / ÖZELLİKLER (2 Column Cards) ── */}
      <section id="ozellikler" className="py-12 px-4 max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: '#c0392b', fontFamily: 'Cinzel, serif' }}>
              Uçurum'da Yeni
            </p>
            <h2 className="text-3xl md:text-4xl uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
              SON GÜNCELLEMELER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full stone-border overflow-hidden mb-8 relative group cursor-pointer">
                <img 
                  src="https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc1NC5wbmc=/original/Oi0skn.png" 
                  alt="Co-op Mode" 
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-center pb-6">
                   <h3 className="text-2xl uppercase tracking-widest glow-red" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#f0d9b5' }}>
                    MYSTIC ABYSS<br/><span className="text-sm tracking-[0.3em]" style={{ color: '#e8d5b0' }}>CO-OP MODU</span>
                  </h3>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: '#8a7060', fontFamily: 'Cinzel, serif' }}>
                8 Kişilik Çok Oyunculu
              </p>
              <h4 className="text-xl uppercase tracking-widest mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
                KARANLIĞA BİRLİKTE İNİN
              </h4>
              <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: '#8a7060' }}>
                Yerel ağ veya Steam üzerinden dostlarınızı çağırın. Öldüğünüzde bir ruha dönüşür, arkadaşlarınız sizi diriltene kadar beklersiniz. Zindan her seferinde yeniden üretilir.
              </p>
              <a href={itchUrl} target="_blank" rel="noreferrer" className="diablo-btn diablo-btn-secondary w-full sm:w-auto">
                CO-OP DETAYLARI
              </a>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full stone-border overflow-hidden mb-8 relative group cursor-pointer">
                <img 
                  src="https://img.itch.zone/aW1hZ2UvNTA1NzQ5My8zMDM5Nzc2MC5wbmc=/original/pxl4wT.png" 
                  alt="Korozyon" 
                  className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-center pb-6">
                   <h3 className="text-2xl uppercase tracking-widest" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#f0d9b5' }}>
                    MYSTIC ABYSS<br/><span className="text-sm tracking-[0.3em]" style={{ color: '#c0392b' }}>KOROZYON LANETİ</span>
                  </h3>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: '#8a7060', fontFamily: 'Cinzel, serif' }}>
                Yeni Mekanik
              </p>
              <h4 className="text-xl uppercase tracking-widest mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
                ZİHNİNİZİ KORUYUN
              </h4>
              <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: '#8a7060' }}>
                Karanlıkta kaldıkça korozyon seviyeniz artar. Artan korozyon size güç verir ancak azami sağlığınızı düşürür. Korozyon 100'e ulaştığında bedeniniz çözülür ve ölürsünüz.
              </p>
              <a href={itchUrl} target="_blank" rel="noreferrer" className="diablo-btn diablo-btn-secondary w-full sm:w-auto">
                MEKANİKLERİ İNCELE
              </a>
            </div>

          </div>
        </FadeIn>
      </section>

      <div className="gold-divider" />

      {/* ── SINIFLAR ── */}
      <section id="siniflar" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl uppercase tracking-widest mb-4" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
              DOKUZ SINIF
            </h2>
            <p className="text-base" style={{ color: '#8a7060' }}>
              Her sınıfın kendine özgü silahı, pasif yeteneği ve nihai gücü (ultisi) vardır. Uçuruma kim olarak ineceksin?
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Savaşçı', desc: 'Uzun kılıç ve ağır zırh. Ön safın kırılmaz kalesi.', icon: <GiBroadsword size={40} /> },
            { name: 'Düzenbaz', desc: 'Çift hançerli gölge. Gizlenerek yaklaşır, öldürerek kaybolur.', icon: <GiDaggers size={40} /> },
            { name: 'Büyücü', desc: 'Ateş ve buzun ustası. Kıyamet Ateşiyle gökten azap indirir.', icon: <GiSpellBook size={40} /> },
            { name: 'Ruhban', desc: 'Kutsal topuzlu şifacı. Düşenleri ayağa kaldırır.', icon: <GiHolySymbol size={40} /> },
            { name: 'Paladin', desc: 'Savaş çekiçli kutsal şövalye. İlahi Hüküm ile yargılar.', icon: <GiShield size={40} /> },
            { name: 'Okçu', desc: 'Keskin nişancı. Ok yağmuruyla düşmanı durdurmadan vurur.', icon: <GiBowArrow size={40} /> },
            { name: 'Ozan', desc: 'Sazlı destek ustası. Türküleriyle ekibi efsaneye dönüştürür.', icon: <GiHarp size={40} /> },
            { name: 'Silahşör', desc: 'Altıpatlarlı nişancı. Ejder Namlusuyla her şeyi yakıp geçer.', icon: <GiMusket size={40} /> },
            { name: 'Cinci', desc: 'Kara kitaplı çağırıcı. Cinler ve iblislerle düşmanı ezer.', icon: <GiDaemonSkull size={40} /> },
          ].map(({ name, desc, icon }, index) => (
            <FadeIn key={name} delay={index * 0.05}>
              <div className="group perspective-1000 h-64 w-full cursor-default">
                <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                  
                  {/* ÖN YÜZ (FRONT) */}
                  <div className="absolute inset-0 backface-hidden stone-border flex flex-col items-center justify-center p-8"
                    style={{ background: 'linear-gradient(to bottom, rgba(15,3,0,0.8), rgba(5,0,0,0.95))' }}>
                    <div className="mb-4 p-4 rounded-full" style={{ background: 'rgba(100,0,0,0.1)', color: '#c0392b', border: '1px solid #3a1a1a' }}>
                      {icon}
                    </div>
                    <h3 className="text-xl uppercase tracking-widest glow-red" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
                      {name}
                    </h3>
                  </div>

                  {/* ARKA YÜZ (BACK) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 stone-border flex flex-col items-center justify-center p-6 text-center"
                    style={{ background: 'linear-gradient(to bottom, rgba(40,10,0,0.9), rgba(15,0,0,0.95))', boxShadow: '0 0 30px rgba(150,20,0,0.2)' }}>
                    <h3 className="text-sm uppercase tracking-widest mb-3 glow-red" style={{ fontFamily: 'Cinzel, serif', color: '#c0392b' }}>
                      {name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#e8d5b0' }}>{desc}</p>
                  </div>
                  
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* ── KURULUM ── */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl uppercase tracking-widest mb-12" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
            Uçuruma İn
          </h2>
          <ol className="text-left space-y-6 mb-12">
            {[
              { n: '01', t: 'İndir', d: "Itch.io'dan zip dosyasını ücretsiz indirin (yaklaşık 41 MB)." },
              { n: '02', t: 'Çıkart', d: 'Arşivi istediğiniz bir klasöre çıkartın. Kurulum gerekmez.' },
              { n: '03', t: 'Başlat', d: 'MysticAbyssII.exe dosyasını çalıştırın. Online için Steam açık olsun.' },
            ].map(({ n, t, d }) => (
              <li key={n} className="flex gap-6 items-start">
                <span className="text-4xl font-black shrink-0" style={{ fontFamily: 'Cinzel, serif', color: '#3a1a0a', lineHeight: 1 }}>{n}</span>
                <div>
                  <h4 className="text-base uppercase tracking-widest mb-1" style={{ fontFamily: 'Cinzel, serif', color: '#c9973a' }}>{t}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: '#6a5a4a' }}>{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href={itchUrl} target="_blank" rel="noreferrer"
            className="diablo-btn diablo-btn-primary">
            Itch.io'dan Ücretsiz İndir
          </a>
        </FadeIn>
      </section>
      {/* ── FOOTER ── */}
      <footer className="py-12 text-center relative z-10" style={{ borderTop: '1px solid #1a0a00' }}>
        <p className="text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'Cinzel, serif', color: '#3a2a1a' }}>
          The Mystic Abyss II
        </p>
        <p className="text-xs mb-4" style={{ color: '#3a2a1a' }}>Geliştirici: Anıl</p>
        <a href={itchUrl} target="_blank" rel="noreferrer"
          className="text-xs tracking-widest uppercase hover:text-[#c0392b] transition-colors"
          style={{ color: '#5a2a1a', fontFamily: 'Cinzel, serif' }}>
          arno4436.itch.io/the-mystic-abyys-2
        </a>
      </footer>

      {/* ── AKTİF LOBİLER (Sağ Alt Sabit Panel) ── */}
      <div className="fixed bottom-0 right-0 z-40 w-72"
        style={{ background: 'rgba(8,2,0,0.97)', border: '1px solid #2a1200', borderBottom: 'none' }}>
        <button
          onClick={() => setLobbyOpen(!lobbyOpen)}
          className="w-full flex items-center justify-between px-4 py-3 transition-colors"
          style={{ borderBottom: '1px solid #2a1200' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(30,5,0,0.8)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif', color: '#c9973a' }}>
            ◆ Aktif Lobiler{lobbies && lobbies.length > 0 ? ` (${lobbies.length})` : ''}
          </span>
          {lobbyOpen ? <ChevronDown size={14} style={{ color: '#5a3a1a' }} /> : <ChevronUp size={14} style={{ color: '#5a3a1a' }} />}
        </button>
        {lobbyOpen && (
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {lobbies === null && (
              <p className="text-center text-xs" style={{ color: '#4a3a2a' }}>Lobiler yükleniyor…</p>
            )}
            {lobbies?.length === 0 && (
              <p className="text-center text-xs leading-relaxed" style={{ color: '#4a3a2a' }}>
                Şu an açık lobi yok.<br />Oyunda Steam lobisi kur, burada görünsün.
              </p>
            )}
            {lobbies?.map((l) => {
              const [tag, col] = lobbyTag(l)
              return (
                <div key={l.id} className="text-xs p-3" style={{ border: '1px solid #1a0a00', background: 'rgba(15,3,0,0.8)' }}>
                  <div className="flex justify-between items-center mb-1 gap-2">
                    <span className="truncate" style={{ fontFamily: 'Cinzel, serif', color: '#a07030', fontSize: '10px', letterSpacing: '0.1em' }}>
                      {l.name.toLocaleUpperCase('tr')}
                    </span>
                    <span className="shrink-0" style={{ color: col, fontSize: '10px' }}>[{tag}]</span>
                  </div>
                  <div className="flex justify-between" style={{ color: '#4a3a2a' }}>
                    <span>
                      {l.state === 'oyunda'
                        ? (l.mode ? 'Arenada' : l.floor > 0 ? `Kat ${l.floor}` : 'Oyunda')
                        : (l.players >= l.max ? 'Lobi dolu' : 'Lobide · katılınabilir')}
                    </span>
                    <span>{l.players}/{l.max} oyuncu</span>
                  </div>
                </div>
              )
            })}
            {lobbies && lobbies.length > 0 && (
              <p className="text-center text-xs" style={{ color: '#3a2a1a', fontFamily: 'Cinzel, serif' }}>
                {online} oyuncu uçurumda · Steam
              </p>
            )}
          </div>
        )}
      </div>

    </main>
  )
}
