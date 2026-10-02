'use client'

import { ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { GiDaemonSkull, GiCrossbow, GiDungeonGate, GiShield } from 'react-icons/gi'

export default function PatchNotes() {
  return (
    <main className="min-h-screen relative pt-24 pb-20 px-4 md:px-8 bg-[#050000]">
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top, rgba(80,10,10,0.2) 0%, transparent 80%)',
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* GERİ DÖN BUTONU */}
        <a href="/" className="inline-flex items-center gap-2 text-[#a89070] hover:text-[#e8d5b0] transition-colors mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
          <ChevronLeft size={16} /> Ana Sayfaya Dön
        </a>

        {/* BAŞLIK */}
        <div className="text-center mb-16">
          <p className="text-[#c0392b] tracking-[0.3em] uppercase text-sm mb-2" style={{ fontFamily: 'Cinzel, serif' }}>GÜNCELLEME</p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase glow-red" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#e8d5b0' }}>
            YAMA 1.3
          </h1>
          <p className="text-[#8a7060] mt-4 tracking-widest uppercase">Mystic Abyss II Online 💀</p>
          <div className="mt-6 inline-block bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-2 rounded text-sm">
            <b>Zorunlu Güncelleme:</b> Eski sürümle bağlanamazsınız.
          </div>
        </div>

        {/* GİRİŞ METNİ */}
        <div className="stone-border p-6 md:p-10 mb-12" style={{ background: 'rgba(15,3,0,0.8)' }}>
          <p className="text-lg leading-relaxed text-[#c8b89a] italic text-center">
            "Karanlık giderek yoğunlaşıyor. Korozyon zihinleri daha hızlı çürütüyor, uçurumun diplerinden daha önce hiç görülmemiş kabuslar yüzeye çıkıyor. Hayatta kalmak artık sadece bir umut..."
          </p>
          <p className="text-sm mt-4 text-[#8a7060] text-right">— Geliştirici Ekip (Anıl)</p>
        </div>

        <div className="gold-divider mb-12" />

        {/* BÖLÜM 1: ZORLUK */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="p-3 rounded-full bg-black/50 border border-[#3a1a0a] text-red-500 shadow-[0_0_15px_rgba(200,0,0,0.3)]">
              <GiDaemonSkull size={32} />
            </span>
            <h2 className="text-2xl md:text-3xl uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
              OYUN ZORLAŞTI
            </h2>
          </div>
          <ul className="space-y-4 pl-4 md:pl-20">
            <li className="flex gap-4 items-start">
              <span className="text-[#c0392b] mt-1">✦</span>
              <p className="text-lg text-[#c8b89a] leading-relaxed">
                <strong className="text-[#e8d5b0]">Düşmanlar Güçlendi:</strong> Daha dayanıklı, daha sert ve daha hızlı. Odalar artık çok daha kalabalık ve seçkin (elite) düşmanlar daha sık beliriyor.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#c0392b] mt-1">✦</span>
              <p className="text-lg text-[#c8b89a] leading-relaxed">
                <strong className="text-[#e8d5b0]">Korozyon Tehlikesi:</strong> Korozyon artık çok daha hızlı birikiyor. Ayrıca ara ara ölümcül <span className="text-red-400">uçurum dalgaları</span> geliyor.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#c0392b] mt-1">✦</span>
              <p className="text-lg text-[#c8b89a] leading-relaxed">
                <strong className="text-[#e8d5b0]">İksir Sınırı:</strong> Her iksir türünden maksimum 2 adet ile başlarsınız. Her 3 seviyede bir sınır +1 artar.
              </p>
            </li>
          </ul>
        </div>

        {/* BÖLÜM 2: YENİ DÜŞMANLAR */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="p-3 rounded-full bg-black/50 border border-[#3a1a0a] text-[#a89070] shadow-[0_0_15px_rgba(150,100,50,0.2)]">
              <GiCrossbow size={32} />
            </span>
            <h2 className="text-2xl md:text-3xl uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
              YENİ DÜŞMANLAR
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-20">
            
            <div className="stone-border p-5 bg-black/40 hover:bg-black/60 transition-colors">
              <h3 className="text-lg text-[#e8d5b0] mb-2 uppercase tracking-widest font-bold">🏹 Kemik Okçu</h3>
              <p className="text-[#a89070] text-sm leading-relaxed">Uzaktan oldukça hızlı ok atar. Seçkin (Elite) versiyonu üçlü yaylım ateşi yapar.</p>
            </div>

            <div className="stone-border p-5 bg-black/40 hover:bg-black/60 transition-colors">
              <h3 className="text-lg text-[#e8d5b0] mb-2 uppercase tracking-widest font-bold">🛡️ Mezar Şövalyesi</h3>
              <p className="text-[#a89070] text-sm leading-relaxed">Sahip olduğu dev kalkan önden gelen vuruşları keser. Sadece arkasından vurarak hasar verebilirsiniz.</p>
            </div>

            <div className="stone-border p-5 bg-black/40 hover:bg-black/60 transition-colors">
              <h3 className="text-lg text-[#e8d5b0] mb-2 uppercase tracking-widest font-bold">🧪 Şişkin Ceset</h3>
              <p className="text-[#a89070] text-sm leading-relaxed">Öldüğü anda zehirli bir patlama yaratır. Yaklaşmadan uzaktan öldürmeniz tavsiye edilir.</p>
            </div>

            <div className="stone-border p-5 bg-black/40 hover:bg-black/60 transition-colors">
              <h3 className="text-lg text-[#e8d5b0] mb-2 uppercase tracking-widest font-bold">🔥 Ateş İmpi</h3>
              <p className="text-[#a89070] text-sm leading-relaxed">Havada uçarak sürekli üstünüze ateş topları fırlatan sinir bozucu yaratıklar.</p>
            </div>
            
            <div className="stone-border p-5 bg-black/40 hover:bg-black/60 transition-colors md:col-span-2">
              <h3 className="text-lg text-[#c0392b] mb-2 uppercase tracking-widest font-bold">👀 Gölge Avcısı</h3>
              <p className="text-[#a89070] text-sm leading-relaxed">Neredeyse tamamen görünmezdir ve aniden tam arkanızda belirerek saldırır. Sürekli arkanızı kollayın.</p>
            </div>

          </div>
        </div>

        {/* BÖLÜM 3: DİĞER */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="p-3 rounded-full bg-black/50 border border-[#3a1a0a] text-blue-400 shadow-[0_0_15px_rgba(50,100,200,0.2)]">
              <GiDungeonGate size={32} />
            </span>
            <h2 className="text-2xl md:text-3xl uppercase tracking-widest" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
              DİĞER GÜNCELLEMELER
            </h2>
          </div>
          <ul className="space-y-4 pl-4 md:pl-20">
            <li className="flex gap-4 items-start">
              <span className="text-[#c0392b] mt-1">✦</span>
              <p className="text-lg text-[#c8b89a] leading-relaxed">
                Artık göl ve çukurların üzerinden ateş edilebiliyor.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#c0392b] mt-1">✦</span>
              <p className="text-lg text-[#c8b89a] leading-relaxed">
                Yepyeni <b>Sade Arayüz</b> seçeneği eklendi. (Eski arayüze geçmek için: Ayarlar {">"} Ayrıntılı arayüz).
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#c0392b] mt-1">✦</span>
              <p className="text-lg text-[#c8b89a] leading-relaxed">
                Her oda türünün (Zindan, Mağara, vb.) artık kendine has özel duvar tasarımları var.
              </p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#c0392b] mt-1">✦</span>
              <p className="text-lg text-[#c8b89a] leading-relaxed">
                Oyuna harika bir atmosfer katan <b>Yeni Ortam Sesleri</b> eklendi: <span className="italic text-[#a89070]">Çan, ilahi, sıçanlar, su, lav, müzik kutusu…</span>
              </p>
            </li>
          </ul>
        </div>
        
        <div className="gold-divider" />
        
        <div className="text-center mt-12">
          <p className="text-[#5a3a2a] text-sm tracking-widest font-bold uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
            Karanlıkta Yalnız Değilsiniz
          </p>
        </div>

      </div>
    </main>
  )
}
