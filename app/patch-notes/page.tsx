'use client'

import { ArrowDown, ArrowUp, ChevronLeft, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { GiHarp, GiDaemonSkull, GiDungeonGate } from 'react-icons/gi'

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
          <p className="text-[#c0392b] tracking-[0.3em] uppercase text-sm mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Güncelleme</p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase glow-red" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#e8d5b0' }}>
            YAMA 1.2.1
          </h1>
          <p className="text-[#8a7060] mt-4">2 Ekim 2026</p>
        </div>

        {/* GİRİŞ METNİ */}
        <div className="stone-border p-6 md:p-10 mb-12" style={{ background: 'rgba(15,3,0,0.8)' }}>
          <p className="text-lg leading-relaxed text-[#c8b89a] italic">
            "Uçurumun derinliklerinden gelen feryatlar duyuldu. Ozanın notaları artık daha ölümcül yankılanırken, Nekromant'ın çağırdığı ruhlar duvarların ötesinden size bakıyor. Bu yama ile birlikte hayatta kalmak çok daha zor olacak."
          </p>
          <p className="text-sm mt-4 text-[#8a7060] text-right">— Geliştirici Ekip (Anıl)</p>
        </div>

        <div className="gold-divider mb-12" />

        {/* SINIF GÜNCELLEMELERİ */}
        <h2 className="text-3xl uppercase tracking-widest mb-8 flex items-center gap-4" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
          <span className="p-3 rounded bg-black/50 border border-[#3a1a0a] text-[#c0392b]"><GiHarp size={24} /></span>
          Ozan
        </h2>
        
        <div className="space-y-6 mb-16">
          {/* BUFF */}
          <div className="flex gap-4 items-start p-4 bg-gradient-to-r from-[rgba(20,40,20,0.3)] to-transparent border-l-4 border-green-700">
            <ArrowUp className="text-green-500 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="text-lg text-[#e8d5b0] mb-1">Q - Ezgi Notaları</h4>
              <p className="text-sm text-[#a89070]">Renk renk notalar düşmanlara kıvrılarak uçar, çarpınca patlar.</p>
              <ul className="mt-2 text-sm text-[#8a7060] list-disc list-inside">
                <li><span className="text-green-400">Yeni:</span> +2 Nota, +2 Hız eklendi.</li>
                <li><span className="text-green-400">Hasar:</span> %60 temel hasar + Ses patlaması.</li>
              </ul>
            </div>
          </div>

          {/* NERF & BUFF (ADJUSTMENT) */}
          <div className="flex gap-4 items-start p-4 bg-gradient-to-r from-[rgba(40,40,20,0.3)] to-transparent border-l-4 border-yellow-600">
            <RefreshCw className="text-yellow-500 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="text-lg text-[#e8d5b0] mb-1">E - Savaş Marşı</h4>
              <p className="text-sm text-[#a89070]">15 sn sürer ve yakındaki dostlara etki eder.</p>
              <ul className="mt-2 text-sm text-[#8a7060] list-disc list-inside">
                <li><span className="text-green-400">Güçlendirme:</span> +%15 verilen hasar artışı.</li>
                <li><span className="text-red-400">Zayıflatma:</span> -%15 alınan hasar (25 sn bekleme süresi eklendi).</li>
              </ul>
            </div>
          </div>

          {/* YENİ MEKANİK */}
          <div className="flex gap-4 items-start p-4 bg-gradient-to-r from-[rgba(40,10,10,0.3)] to-transparent border-l-4 border-[#c0392b]">
            <ArrowUp className="text-green-500 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="text-lg text-[#e8d5b0] mb-1">R - Metal Destan (Ulti)</h4>
              <p className="text-sm text-[#a89070]">Distorsiyonlu metal riffi çalar.</p>
              <ul className="mt-2 text-sm text-[#8a7060] list-disc list-inside">
                <li><span className="text-green-400">Etki:</span> Takımdaki herkes 5 sn boyunca hiçbir hasar almaz.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-12" />

        {/* NEKROMANT */}
        <h2 className="text-3xl uppercase tracking-widest mb-8 flex items-center gap-4" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
          <span className="p-3 rounded bg-black/50 border border-[#3a1a0a] text-[#c0392b]"><GiDaemonSkull size={24} /></span>
          Nekromant
        </h2>
        
        <div className="space-y-6 mb-16">
          <div className="flex gap-4 items-start p-4 bg-gradient-to-r from-[rgba(40,40,40,0.3)] to-transparent border-l-4 border-gray-600">
            <RefreshCw className="text-gray-400 mt-1 shrink-0" size={20} />
            <div>
              <h4 className="text-lg text-[#e8d5b0] mb-1">Çağrı Değişiklikleri</h4>
              <ul className="mt-2 text-sm text-[#8a7060] list-disc list-inside">
                <li>Çağrılan ölüler artık duvarın içinde değil, doğrudan önünde çıkıyor.</li>
                <li>Tırpan artık Azrail gibi dik tutuluyor; birinci şahısta iki elle geniş yayla savruluyor.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-12" />

        {/* HARİTA VE SİSTEM */}
        <h2 className="text-3xl uppercase tracking-widest mb-8 flex items-center gap-4" style={{ fontFamily: 'Cinzel, serif', color: '#e8d5b0' }}>
          <span className="p-3 rounded bg-black/50 border border-[#3a1a0a] text-[#c0392b]"><GiDungeonGate size={24} /></span>
          Sistem ve Harita
        </h2>
        
        <div className="space-y-6 mb-16">
          <div className="stone-border p-6" style={{ background: 'rgba(10,0,0,0.5)' }}>
            <h4 className="text-lg text-[#e8d5b0] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>Müzik Sistemi</h4>
            <ul className="text-sm text-[#8a7060] list-disc list-inside space-y-2">
              <li>Geçişler yumuşatıldı, parça en az 50 sn çalmadan başka müziğe geçilmez.</li>
              <li>Parçalar iki kat uzadı; ikinci tur uzaktan gelir gibi boğuk başlayıp açılıyor.</li>
              <li>Zorlu odanın bozulması (kapanması) yavaşlatıldı.</li>
            </ul>

            <h4 className="text-lg text-[#e8d5b0] mb-4 mt-8" style={{ fontFamily: 'Cinzel, serif' }}>Harita Düzeltmeleri</h4>
            <ul className="text-sm text-[#8a7060] list-disc list-inside space-y-2">
              <li>Teras korkulukları ve galeri köşeleri artık birbirine girmiyor.</li>
              <li>Sıra, tezgâh, parmaklık, lahit, kitaplık ve taht birbirine ya da duvara girmiyor (Clipping çözüldü).</li>
              <li>Tavan kirişleri, zincirler, sarkıtlar ve kökler yüksek salonlarda havada asılı kalmıyor.</li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  )
}
