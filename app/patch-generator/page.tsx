'use client'

import { useRef, useState, useEffect } from 'react'
import { 
  GiHarp, GiDaemonSkull, GiDungeonGate, GiShield, GiBroadsword, 
  GiBowArrow, GiMagicSwirl, GiPistolGun, GiFireBowl, GiHeartBeats, 
  GiSkeletalHand, GiSoundWaves, GiShatteredSword, GiWalkingBoot,
  GiCrescentStaff, GiHammerDrop, GiBookAura, GiTrashCan
} from 'react-icons/gi'
import { Plus, X } from 'lucide-react'
import html2canvas from 'html2canvas'

const ICONS = [
  GiHarp, GiDaemonSkull, GiDungeonGate, GiShield, GiBroadsword, 
  GiBowArrow, GiMagicSwirl, GiPistolGun, GiFireBowl, GiHeartBeats, 
  GiSkeletalHand, GiSoundWaves, GiShatteredSword, GiWalkingBoot,
  GiCrescentStaff, GiHammerDrop, GiBookAura
]

function IconPicker({ initialIndex = 0, onRemove }: { initialIndex?: number, onRemove: () => void }) {
  const [index, setIndex] = useState(initialIndex)
  const [isOpen, setIsOpen] = useState(false)
  
  const IconComponent = ICONS[index]

  return (
    <div className="relative flex flex-col items-center gap-2">
      {isOpen && (
        <div data-html2canvas-ignore="true" className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-[220px] p-2 bg-[#0a0202] border border-[#3a1a0a] rounded shadow-[0_0_20px_rgba(0,0,0,0.9)] flex flex-wrap gap-2">
          {ICONS.map((Icon, i) => (
            <div 
              key={i} 
              onClick={() => { setIndex(i); setIsOpen(false) }}
              className="p-2 hover:bg-white/10 rounded cursor-pointer text-[#e8d5b0]"
            >
              <Icon size={22} />
            </div>
          ))}
          <div className="w-full border-t border-[#3a1a0a] my-1"></div>
          <button onClick={onRemove} className="w-full text-left p-2 text-xs text-red-500 hover:bg-white/10 rounded flex items-center gap-2 tracking-widest font-bold">
            <GiTrashCan size={16} /> BU ÖĞEYİ SİL
          </button>
        </div>
      )}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        title="İkonu Seç / Sil"
        className="w-14 h-14 rounded-full border-2 border-inherit bg-black flex justify-center items-center text-inherit shadow-[0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-105 transition-all"
      >
        <IconComponent size={30} />
      </div>
      <span contentEditable={true} title="Düzenle" suppressContentEditableWarning className="text-[11px] tracking-widest text-[#a89070] uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded px-1 min-w-[50px] text-center">İSİM</span>
    </div>
  )
}

function Category({ title, color, icon, items, onAdd, onRemoveItem }: any) {
  return (
    <div className="mb-6">
      <h3 className="text-[#e8d5b0] text-sm tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
        <span className={color + " text-xl"}>{icon}</span> {title}
      </h3>
      <div className="flex flex-wrap gap-6 items-start">
        {items.map((item: any) => (
          <div key={item.id} className={color.replace("text-", "border-") + " text-current"}>
            <IconPicker initialIndex={item.iconIndex} onRemove={() => onRemoveItem(item.id)} />
          </div>
        ))}
        
        {/* ADD BUTTON (IGNORED IN SCREENSHOT) */}
        <button 
          data-html2canvas-ignore="true"
          onClick={onAdd}
          className="w-14 h-14 rounded-full border-2 border-dashed border-[#5a3a2a] flex justify-center items-center text-[#5a3a2a] hover:text-[#e8d5b0] hover:border-[#e8d5b0] hover:bg-white/5 transition-colors shrink-0"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  )
}

export default function PatchGenerator() {
  const patchRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const [buffs, setBuffs] = useState([{ id: 1, iconIndex: 0 }])
  const [nerfs, setNerfs] = useState([{ id: 2, iconIndex: 3 }])
  const [adjusts, setAdjusts] = useState([{ id: 3, iconIndex: 1 }, { id: 4, iconIndex: 2 }])

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
        
        <div className="px-10 py-5 border-b border-[#3a1a0a] flex justify-between items-center bg-black/50 z-10 shrink-0">
          <div>
            <h1 contentEditable={true} suppressContentEditableWarning className="text-4xl text-[#e8d5b0] font-bold m-0 leading-none drop-shadow-[0_0_10px_rgba(200,0,0,0.3)] outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 rounded px-1" style={{ fontFamily: 'Cinzel, serif' }}>
              YAMA 1.2.1
            </h1>
            <p contentEditable={true} suppressContentEditableWarning className="text-[#c0392b] tracking-widest text-xs mt-2 m-0 uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 rounded px-1" style={{ fontFamily: 'Cinzel, serif' }}>
              Mystic Abyss II Online
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#a89070] text-sm tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>ÖNE ÇIKANLAR</p>
          </div>
        </div>

        <div className="flex flex-1 p-8 gap-12 relative z-10 h-full overflow-hidden">
          <div className="flex-1 flex flex-col border-r border-[#3a1a0a] pr-8 overflow-y-visible">
            <Category 
              title="GÜÇLENDİ" color="text-green-500" icon="▲" 
              items={buffs} 
              onAdd={() => setBuffs([...buffs, { id: Date.now(), iconIndex: 0 }])}
              onRemoveItem={(id: number) => setBuffs(buffs.filter(b => b.id !== id))}
            />
            <Category 
              title="ZAYIFLADI" color="text-red-500" icon="▼" 
              items={nerfs} 
              onAdd={() => setNerfs([...nerfs, { id: Date.now(), iconIndex: 0 }])}
              onRemoveItem={(id: number) => setNerfs(nerfs.filter(n => n.id !== id))}
            />
          </div>

          <div className="flex-1 flex flex-col overflow-y-visible">
            <Category 
              title="DÜZENLENDİ" color="text-yellow-500" icon="↻" 
              items={adjusts} 
              onAdd={() => setAdjusts([...adjusts, { id: Date.now(), iconIndex: 0 }])}
              onRemoveItem={(id: number) => setAdjusts(adjusts.filter(a => a.id !== id))}
            />
            
            <div className="mt-auto">
              <h3 className="text-[#e8d5b0] text-sm tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
                <span className="text-blue-400 text-xl">✦</span> SİSTEM
              </h3>
              <div contentEditable={true} suppressContentEditableWarning className="bg-black/40 border border-[#3a1a0a] p-4 text-xs text-[#a89070] leading-relaxed outline-none focus:bg-white/10 hover:bg-white/5 rounded whitespace-pre-wrap">
Müzik geçişleri yumuşatıldı.
Uçurumun derinlikleri artık çok daha acımasız...
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-6 text-[9px] text-[#5a3a2a] tracking-widest pointer-events-none" style={{ fontFamily: 'Cinzel, serif' }}>
          MYSTIC-ABYSS.COM
        </div>
      </div>
      
      <div className="ml-12 text-[#a89070] text-sm flex flex-col gap-6 max-w-[250px]">
        <div className="stone-border p-5 bg-black/80">
          <h3 className="text-[#e8d5b0] font-bold mb-2 uppercase tracking-widest text-xs" style={{ fontFamily: 'Cinzel, serif' }}>DİNAMİK DÜZENLEME</h3>
          <p className="text-xs text-[#8a7060] leading-relaxed mb-4">
            <b>(+) Butonu:</b> Artık istediğin kategoriye sınırsız sayıda yeni sınıf/ikon ekleyebilirsin. (Artı butonları resimde <b>gözükmez!</b>)
          </p>
          <p className="text-xs text-[#8a7060] leading-relaxed">
            <b>Seçim Menüsü:</b> İkona tıkladığında tüm oyun ikonlarını listeleyen bir pencere açılır. İkonu seçebilir veya silebilirsin.
          </p>
        </div>
        <button onClick={downloadImage} disabled={downloading} className="diablo-btn diablo-btn-primary w-full py-4 uppercase flex justify-center items-center">
          {downloading ? 'HAZIRLANIYOR...' : 'RESMİ İNDİR'}
        </button>
      </div>
    </div>
  )
}
