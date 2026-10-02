'use client'

import { useRef, useState } from 'react'
import { 
  GiHarp, GiDaemonSkull, GiDungeonGate, GiShield, GiBroadsword, 
  GiBowArrow, GiMagicSwirl, GiPistolGun, GiFireBowl, GiHeartBeats, 
  GiSkeletalHand, GiSoundWaves, GiShatteredSword, GiWalkingBoot,
  GiCrescentStaff, GiHammerDrop, GiBookAura
} from 'react-icons/gi'
import html2canvas from 'html2canvas'
import { Plus } from 'lucide-react'

const ICONS = [
  GiHarp, GiDaemonSkull, GiDungeonGate, GiShield, GiBroadsword, 
  GiBowArrow, GiMagicSwirl, GiPistolGun, GiFireBowl, GiHeartBeats, 
  GiSkeletalHand, GiSoundWaves, GiShatteredSword, GiWalkingBoot,
  GiCrescentStaff, GiHammerDrop, GiBookAura
]

// Yüklenen resmi veya ikonu gösteren bileşen
function DynamicIconBox({ initialIndex = 0 }: { initialIndex?: number }) {
  const [index, setIndex] = useState(initialIndex)
  const [customImage, setCustomImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleNextIcon = (e: React.MouseEvent) => {
    // Eğer özel resim yüklüyse ve tıklanırsa, onu silip ikonlara dönebiliriz (veya bir şey yapmayız)
    if (customImage) return
    setIndex((prev) => (prev + 1) % ICONS.length)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setCustomImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setCustomImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation() // İkon değiştirme tıklamasını engelle
    fileInputRef.current?.click()
  }

  const IconComponent = ICONS[index]

  return (
    <div 
      className="relative w-full h-full rounded-full flex justify-center items-center group overflow-hidden bg-black"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleNextIcon}
      title="Sıradaki ikon için tıkla veya resim sürükle"
    >
      {/* Özel resim varsa onu göster */}
      {customImage ? (
        <img src={customImage} alt="Custom" className="w-full h-full object-cover" />
      ) : (
        <IconComponent size={30} className="transition-transform group-hover:scale-110" />
      )}

      {/* Hover olunca görünen + butonu (Resim Yükle) */}
      <div 
        onClick={triggerUpload}
        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex justify-center items-center cursor-pointer transition-opacity"
        title="Bilgisayardan resim seç"
      >
        <Plus size={24} className="text-white" />
      </div>

      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
      />
    </div>
  )
}

export default function PatchGenerator() {
  const patchRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const downloadImage = async () => {
    if (!patchRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(patchRef.current, {
        scale: 2,
        backgroundColor: '#050000',
        useCORS: true
      })
      
      const image = canvas.toDataURL("image/png", 1.0)
      const link = document.createElement('a')
      link.download = 'yama-ozeti.png'
      link.href = image
      link.click()
    } catch (err) {
      console.error("HATA:", err)
      alert("İndirme başarısız oldu: " + err)
    }
    setDownloading(false)
  }

  return (
    <div className="min-h-screen bg-[#050302] flex items-center justify-center p-8 relative">
      
      <div 
        ref={patchRef}
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
            <h1 
              contentEditable={true} title="Tıkla ve Düzenle" 
              suppressContentEditableWarning
              className="text-4xl text-[#e8d5b0] font-bold m-0 leading-none drop-shadow-[0_0_10px_rgba(200,0,0,0.3)] outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded" 
              style={{ fontFamily: 'Cinzel, serif' }}>
              YAMA 1.2.1
            </h1>
            <p 
              contentEditable={true} title="Tıkla ve Düzenle"
              suppressContentEditableWarning
              className="text-[#c0392b] tracking-widest text-xs mt-2 m-0 uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded" 
              style={{ fontFamily: 'Cinzel, serif' }}>
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
                    <DynamicIconBox initialIndex={0} />
                  </div>
                  <span contentEditable={true} title="Tıkla ve Düzenle" suppressContentEditableWarning className="text-[11px] tracking-widest text-[#a89070] uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded">Ozan</span>
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
                    <DynamicIconBox initialIndex={3} />
                  </div>
                  <span contentEditable={true} title="Tıkla ve Düzenle" suppressContentEditableWarning className="text-[11px] tracking-widest text-[#a89070] uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded">S. Marşı</span>
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
                    <DynamicIconBox initialIndex={1} />
                  </div>
                  <span contentEditable={true} title="Tıkla ve Düzenle" suppressContentEditableWarning className="text-[11px] tracking-widest text-[#a89070] uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded">Nekromant</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full border-2 border-yellow-600 bg-black flex justify-center items-center text-yellow-500 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                    <DynamicIconBox initialIndex={2} />
                  </div>
                  <span contentEditable={true} title="Tıkla ve Düzenle" suppressContentEditableWarning className="text-[11px] tracking-widest text-[#a89070] uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded">Harita</span>
                </div>
              </div>
            </div>
            
            {/* SYSTEM */}
            <div>
              <h3 className="text-[#e8d5b0] text-sm tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-blue-400 text-xl">✦</span> SİSTEM
              </h3>
              <div 
                contentEditable={true} title="Tıkla ve Düzenle" 
                suppressContentEditableWarning
                className="bg-black/40 border border-[#3a1a0a] p-4 text-xs text-[#a89070] leading-relaxed outline-none focus:bg-white/10 hover:bg-white/5 transition-all cursor-text rounded whitespace-pre-wrap">
Müzik geçişleri yumuşatıldı.
Teras korkulukları ve harita çarpışma hataları (clipping) düzeltildi.
Uçurumun derinlikleri artık çok daha acımasız...
              </div>
            </div>

          </div>

        </div>
        
        <div className="absolute bottom-4 right-6 text-[9px] text-[#5a3a2a] tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
          MYSTIC-ABYSS.COM
        </div>
      </div>
      
      {/* SIDEBAR - CONTROLS */}
      <div className="ml-12 text-[#a89070] text-sm flex flex-col gap-6 max-w-[250px]">
        
        <div className="stone-border p-5 bg-black/80">
          <h3 className="text-[#e8d5b0] font-bold mb-2 uppercase tracking-widest text-xs" style={{ fontFamily: 'Cinzel, serif' }}>
            Nasıl Düzenlenir?
          </h3>
          <ul className="text-xs text-[#8a7060] leading-relaxed mb-4 list-disc pl-4 space-y-2">
            <li><b>Yazılar:</b> Tıklayıp klavyeyle sil ve değiştir.</li>
            <li><b>İkon Değiştirme:</b> İkona tıklayarak diğer sembollere geçebilirsin.</li>
            <li><b>Kendi Resmini Yükle:</b> İkonun üzerine farenle gelince çıkan <b>"+"</b> butonuna basarak bilgisayarından resim seçebilir veya direkt sürükleyip ikonun üstüne bırakabilirsin!</li>
          </ul>
        </div>

        <button 
          onClick={downloadImage}
          disabled={downloading}
          className="diablo-btn diablo-btn-primary w-full py-4 text-center tracking-widest uppercase flex justify-center items-center"
        >
          {downloading ? 'HAZIRLANIYOR...' : 'RESMİ İNDİR'}
        </button>

      </div>
    </div>
  )
}
