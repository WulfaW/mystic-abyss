'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import { 
  GiDaemonSkull, GiCrossbow, GiDungeonGate, 
  GiHarp, GiMagicSwirl, GiSoundWaves, GiMap
} from 'react-icons/gi'

const PATCHES = [
  {
    id: 'v1.3',
    title: 'YAMA 1.3',
    subtitle: 'Mystic Abyss II Online 💀',
    date: 'Yeni Güncelleme',
    mandatory: true,
    intro: 'Karanlık giderek yoğunlaşıyor. Korozyon zihinleri daha hızlı çürütüyor, uçurumun diplerinden daha önce hiç görülmemiş kabuslar yüzeye çıkıyor. Hayatta kalmak artık sadece bir umut...',
    sections: [
      {
        id: 'v1.3-zorluk',
        title: 'OYUN ZORLAŞTI',
        icon: GiDaemonSkull,
        color: 'text-red-500',
        items: [
          '<strong class="text-[#e8d5b0]">Düşmanlar Güçlendi:</strong> Daha dayanıklı, daha sert ve daha hızlı. Odalar artık çok daha kalabalık ve seçkin (elite) düşmanlar daha sık beliriyor.',
          '<strong class="text-[#e8d5b0]">Korozyon Tehlikesi:</strong> Korozyon artık çok daha hızlı birikiyor. Ayrıca ara ara ölümcül <span class="text-red-400">uçurum dalgaları</span> geliyor.',
          '<strong class="text-[#e8d5b0]">İksir Sınırı:</strong> Her iksir türünden maksimum 2 adet ile başlarsınız. Her 3 seviyede bir sınır +1 artar.'
        ]
      },
      {
        id: 'v1.3-dusmanlar',
        title: 'YENİ DÜŞMANLAR',
        icon: GiCrossbow,
        color: 'text-[#a89070]',
        cards: [
          { title: '🏹 Kemik Okçu', desc: 'Uzaktan oldukça hızlı ok atar. Seçkin (Elite) versiyonu üçlü yaylım ateşi yapar.' },
          { title: '🛡️ Mezar Şövalyesi', desc: 'Sahip olduğu dev kalkan önden gelen vuruşları keser. Sadece arkasından vurarak hasar verebilirsiniz.' },
          { title: '🧪 Şişkin Ceset', desc: 'Öldüğü anda zehirli bir patlama yaratır. Yaklaşmadan uzaktan öldürmeniz tavsiye edilir.' },
          { title: '🔥 Ateş İmpi', desc: 'Havada uçarak sürekli üstünüze ateş topları fırlatan sinir bozucu yaratıklar.' },
          { title: '👀 Gölge Avcısı', desc: 'Neredeyse tamamen görünmezdir ve aniden tam arkanızda belirerek saldırır. Sürekli arkanızı kollayın.', span: true }
        ]
      },
      {
        id: 'v1.3-diger',
        title: 'DİĞER GÜNCELLEMELER',
        icon: GiDungeonGate,
        color: 'text-blue-400',
        items: [
          'Artık göl ve çukurların üzerinden ateş edilebiliyor.',
          'Yepyeni <b>Sade Arayüz</b> seçeneği eklendi. (Eski arayüze geçmek için: Ayarlar > Ayrıntılı arayüz).',
          'Her oda türünün (Zindan, Mağara, vb.) artık kendine has özel duvar tasarımları var.',
          'Oyuna harika bir atmosfer katan <b>Yeni Ortam Sesleri</b> eklendi: <span class="italic text-[#a89070]">Çan, ilahi, sıçanlar, su, lav, müzik kutusu…</span>'
        ]
      }
    ]
  },
  {
    id: 'v1.2.1',
    title: 'YAMA 1.2.1',
    subtitle: 'Mystic Abyss II Online 🎸',
    date: 'Önceki Güncelleme',
    mandatory: true,
    intro: 'Ozan sınıfı baştan aşağı yenilendi. Müzik ruhun gıdasıdır derler, ama bu notalar düşmanların ruhunu bedeninden söküp alacak...',
    sections: [
      {
        id: 'v1.2.1-ozan',
        title: 'OZAN BAŞTAN',
        icon: GiHarp,
        color: 'text-purple-400',
        items: [
          '<strong class="text-[#e8d5b0]">Q - Ezgi Notaları:</strong> Renk renk notalar düşmanlara kıvrılarak uçar, çarpınca patlar.',
          '<strong class="text-[#e8d5b0]">K Geliştirmeleri:</strong> +2 nota, +2 nota ve hız, %60 hasar + ses patlaması, seken nota seçenekleri eklendi.',
          '<strong class="text-[#e8d5b0]">E - Savaş Marşı:</strong> 15 sn boyunca sen ve yakındaki dostlar +%15 hasar kazanır, -%15 daha az hasar alırsınız. (25 sn bekleme süresi).',
          '<strong class="text-[#e8d5b0]">R - Metal Destan:</strong> Distorsiyonlu metal riffi çalar. Takımdaki herkes 5 sn boyunca HİÇ HASAR ALMAZ! 🤘'
        ]
      },
      {
        id: 'v1.2.1-nekromant',
        title: 'NEKROMANT',
        icon: GiMagicSwirl,
        color: 'text-green-500',
        items: [
          'Çağrılan ölüler artık duvarın içinde sıkışıp kalmıyor, duvarın önünde düzgünce beliriyor.',
          'Tırpan artık Azrail gibi dik tutuluyor; birinci şahıs (FPS) kamerasında iki elle, çok daha geniş ve acımasız bir yayla savruluyor.'
        ]
      },
      {
        id: 'v1.2.1-muzik',
        title: 'MÜZİK',
        icon: GiSoundWaves,
        color: 'text-yellow-400',
        items: [
          'Müzik geçişleri çok daha yumuşak hale getirildi. Bir parça en az 50 saniye çalmadan diğeri başlamayacak.',
          'Parçalar artık iki kat daha uzun: İkinci tur uzaktan gelir gibi boğuk başlıyor ve giderek açılıyor.',
          'Zorlu odanın bozulma (distortion) efekti artık aniden değil, yavaşça ve gerilim yaratarak geliyor.'
        ]
      },
      {
        id: 'v1.2.1-harita',
        title: 'HARİTA VE DÜZELTMELER',
        icon: GiMap,
        color: 'text-gray-400',
        items: [
          'Teras korkulukları ve galeri köşeleri artık birbirine girmiyor (clipping düzeltildi).',
          'Sıra, tezgâh, parmaklık, lahit, kitaplık ve taht gibi objelerin birbirine veya duvara girmesi engellendi.',
          'Tavan kirişleri, zincirler, sarkıtlar ve devasa kökler artık yüksek salonlarda havada asılı kalmıyor, fizik kurallarına uyuyor.'
        ]
      }
    ]
  }
]

export default function PatchNotes() {
  const [activeSection, setActiveSection] = useState('v1.3')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      let current = 'v1.3'
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop <= 150) {
          current = section.getAttribute('id') || 'v1.3'
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen relative pt-24 pb-20 px-4 md:px-8 bg-[#050000]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top, rgba(80,10,10,0.2) 0%, transparent 80%)',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* GERİ DÖN BUTONU */}
        <a href="/" className="inline-flex items-center gap-2 text-[#a89070] hover:text-[#e8d5b0] transition-colors mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
          <ChevronLeft size={16} /> Ana Sayfaya Dön
        </a>

        {/* 2 COLUMN LAYOUT (RIOT STYLE) */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* LEFT SIDEBAR (STICKY TOC) */}
          <div className="w-full md:w-64 shrink-0 md:sticky top-24">
            <div className="stone-border p-5 bg-black/80">
              <h3 className="text-[#e8d5b0] font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-[#3a1a0a]" style={{ fontFamily: 'Cinzel, serif' }}>
                İçindekiler
              </h3>
              
              <div className="flex flex-col gap-6">
                {PATCHES.map(patch => (
                  <div key={patch.id}>
                    <a 
                      href={`#${patch.id}`}
                      className={`block font-bold tracking-widest uppercase mb-3 transition-colors ${activeSection.startsWith(patch.id) ? 'text-[#c0392b]' : 'text-[#a89070] hover:text-[#e8d5b0]'}`}
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {patch.title}
                    </a>
                    <ul className="flex flex-col gap-2 pl-3 border-l border-[#3a1a0a]">
                      {patch.sections.map(sec => (
                        <li key={sec.id}>
                          <a 
                            href={`#${sec.id}`}
                            className={`block text-xs uppercase tracking-wider transition-colors ${activeSection === sec.id ? 'text-[#e8d5b0]' : 'text-[#5a3a2a] hover:text-[#a89070]'}`}
                          >
                            {sec.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (SCROLLING PATCH NOTES) */}
          <div className="flex-1 flex flex-col gap-24">
            
            {PATCHES.map((patch, idx) => (
              <div key={patch.id} id={patch.id} data-section className="scroll-mt-24">
                
                {/* PATCH HEADER */}
                <div className="mb-10">
                  <p className="text-[#c0392b] tracking-[0.3em] uppercase text-xs mb-2 font-bold">{patch.date}</p>
                  <h1 className="text-4xl md:text-6xl font-bold uppercase glow-red" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#e8d5b0' }}>
                    {patch.title}
                  </h1>
                  <p className="text-[#8a7060] mt-3 tracking-widest uppercase text-sm">{patch.subtitle}</p>
                  
                  {patch.mandatory && (
                    <div className="mt-6 inline-block bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-2 rounded text-xs tracking-wider">
                      <b>Zorunlu Güncelleme:</b> Eski sürümle bağlanamazsınız.
                    </div>
                  )}
                </div>

                {/* PATCH INTRO */}
                <div className="stone-border p-6 md:p-8 mb-12 bg-black/60">
                  <p className="text-md leading-relaxed text-[#c8b89a] italic border-l-2 border-[#c0392b] pl-4">
                    "{patch.intro}"
                  </p>
                </div>

                {/* PATCH SECTIONS */}
                <div className="flex flex-col gap-16">
                  {patch.sections.map(sec => (
                    <div key={sec.id} id={sec.id} data-section className="scroll-mt-24">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`p-3 rounded-full bg-black/50 border border-[#3a1a0a] ${sec.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                          <sec.icon size={24} />
                        </span>
                        <h2 className="text-xl md:text-2xl uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
                          {sec.title}
                        </h2>
                      </div>
                      
                      {sec.items && (
                        <ul className="space-y-4 pl-4 md:pl-16">
                          {sec.items.map((item, i) => (
                            <li key={i} className="flex gap-4 items-start">
                              <span className="text-[#c0392b] mt-1 text-sm">✦</span>
                              <p className="text-md text-[#c8b89a] leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      )}

                      {sec.cards && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-16">
                          {sec.cards.map((card, i) => (
                            <div key={i} className={`stone-border p-4 bg-black/40 hover:bg-black/60 transition-colors ${card.span ? 'md:col-span-2' : ''}`}>
                              <h3 className="text-md text-[#e8d5b0] mb-2 uppercase tracking-widest font-bold">{card.title}</h3>
                              <p className="text-[#a89070] text-xs leading-relaxed">{card.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* DIVIDER BETWEEN PATCHES */}
                {idx < PATCHES.length - 1 && (
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#5a3a2a] to-transparent mt-24" />
                )}
              </div>
            ))}

            <div className="text-center mt-12 pt-12 border-t border-[#3a1a0a]">
              <p className="text-[#5a3a2a] text-xs tracking-widest font-bold uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
                Karanlıkta Yalnız Değilsiniz
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
