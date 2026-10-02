'use client'

import { GiHarp, GiDaemonSkull, GiDungeonGate, GiShield } from 'react-icons/gi'

export default function PatchGenerator() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* SADECE BU KUTUNUN EKRAN GÖRÜNTÜSÜ ALINACAK */}
      <div 
        className="w-[800px] h-[450px] relative overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #0a0202 0%, #150505 100%)',
          border: '2px solid #3a1a0a',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.5)',
          fontFamily: "'EB Garamond', serif"
        }}
      >
        <div className="absolute top-[-100px] left-[300px] w-[200px] h-[200px] bg-red-900/20 blur-[50px] pointer-events-none rounded-full" />
        
        {/* HEADER */}
        <div className="px-10 py-5 border-b border-[#3a1a0a] flex justify-between items-center bg-black/50 z-10">
          <div>
            <h1 className="text-4xl text-[#e8d5b0] font-bold m-0 leading-none drop-shadow-[0_0_10px_rgba(200,0,0,0.3)]" style={{ fontFamily: 'Cinzel, serif' }}>
              YAMA 1.2.1
            </h1>
            <p className="text-[#c0392b] tracking-widest text-xs mt-2 m-0 uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
              Mystic Abyss II Online
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#a89070] text-sm tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
              ÖNE ÇIKANLAR
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 p-8 gap-12 relative z-10">
          
          {/* LEFT COL */}
          <div className="flex-1 flex flex-col gap-8 border-r border-[#3a1a0a] pr-8">
            
            {/* BUFFS */}
            <div>
              <h3 className="text-[#e8d5b0] text-sm tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-green-500 text-xl">▲</span> GÜÇLENDİ
              </h3>
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full border-2 border-green-600 bg-black flex justify-center items-center text-green-500 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <GiHarp size={30} />
                  </div>
                  <span className="text-[11px] tracking-widest text-[#a89070] uppercase">Ozan</span>
                </div>
              </div>
            </div>

            {/* NERFS */}
            <div>
              <h3 className="text-[#e8d5b0] text-sm tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-red-500 text-xl">▼</span> ZAYIFLADI
              </h3>
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full border-2 border-[#c0392b] bg-black flex justify-center items-center text-[#c0392b] shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <GiShield size={30} />
                  </div>
                  <span className="text-[11px] tracking-widest text-[#a89070] uppercase">S. Marşı</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COL */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* ADJUSTMENTS */}
            <div>
              <h3 className="text-[#e8d5b0] text-sm tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-yellow-500 text-xl">↻</span> DÜZENLENDİ
              </h3>
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full border-2 border-yellow-600 bg-black flex justify-center items-center text-yellow-500 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <GiDaemonSkull size={30} />
                  </div>
                  <span className="text-[11px] tracking-widest text-[#a89070] uppercase">Nekromant</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full border-2 border-yellow-600 bg-black flex justify-center items-center text-yellow-500 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <GiDungeonGate size={30} />
                  </div>
                  <span className="text-[11px] tracking-widest text-[#a89070] uppercase">Harita</span>
                </div>
              </div>
            </div>
            
            {/* SYSTEM */}
            <div>
              <h3 className="text-[#e8d5b0] text-sm tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-blue-400 text-xl">✦</span> SİSTEM
              </h3>
              <div className="bg-black/40 border border-[#3a1a0a] p-4 rounded text-xs text-[#a89070] leading-relaxed">
                Müzik geçişleri yumuşatıldı.<br/>
                Teras korkulukları ve harita çarpışma hataları (clipping) düzeltildi.<br/>
                Uçurumun derinlikleri artık çok daha acımasız...
              </div>
            </div>

          </div>

        </div>
        
        <div className="absolute bottom-4 right-6 text-[9px] text-[#5a3a2a] tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
          MYSTIC-ABYSS.COM
        </div>
      </div>
      
      <div className="ml-8 text-[#a89070] text-sm max-w-xs">
        <p className="mb-4 text-white font-bold">Nasıl Kullanılır?</p>
        <ol className="list-decimal pl-4 space-y-2">
          <li>Klavyeden <kbd className="bg-gray-800 px-2 py-1 rounded text-xs">Win + Shift + S</kbd> tuşlarına bas.</li>
          <li>Soldaki çerçevenin resmini çek.</li>
          <li>Resmi Discohook'a (veya Discord'a) yapıştır!</li>
        </ol>
      </div>
    </div>
  )
}
