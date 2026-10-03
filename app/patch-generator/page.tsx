'use client'

import { useRef, useState } from 'react'
import { 
  GiHarp, GiDaemonSkull, GiDungeonGate, GiShield, GiBroadsword, 
  GiBowArrow, GiMagicSwirl, GiPistolGun, GiFireBowl, GiHeartBeats, 
  GiSkeletalHand, GiSoundWaves, GiShatteredSword, GiWalkingBoot,
  GiCrescentStaff, GiHammerDrop, GiBookAura, GiTrashCan
} from 'react-icons/gi'
import { Plus } from 'lucide-react'
import { toPng } from 'html-to-image'

const ICONS = [
  GiHarp, GiDaemonSkull, GiDungeonGate, GiShield, GiBroadsword, 
  GiBowArrow, GiMagicSwirl, GiPistolGun, GiFireBowl, GiHeartBeats, 
  GiSkeletalHand, GiSoundWaves, GiShatteredSword, GiWalkingBoot,
  GiCrescentStaff, GiHammerDrop, GiBookAura
]

function Category({ title, color, icon, items, onAddItem, onRemoveItem }: any) {
  const [showAddMenu, setShowAddMenu] = useState(false)

  return (
    <div className="mb-6 relative">
      <h3 className="text-[#e8d5b0] text-xl tracking-widest mb-6 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
        <span className={color + " text-3xl"}>{icon}</span> {title}
      </h3>
      <div className="flex flex-wrap gap-6 items-start relative">
        
        {/* EXISTING ITEMS */}
        {items.map((item: any) => {
          const IconComponent = ICONS[item.iconIndex]
          return (
            <div key={item.id} className={color.replace("text-", "border-") + " text-current relative group flex flex-col items-center gap-2"}>
              <div className="w-24 h-24 rounded-full border-[3px] border-inherit bg-black flex justify-center items-center text-inherit shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <IconComponent size={50} />
              </div>
              <span contentEditable={true} suppressContentEditableWarning className="text-[16px] tracking-widest text-[#a89070] uppercase outline-none focus:bg-white/10 hover:bg-white/5 border border-transparent hover:border-white/20 transition-all cursor-text rounded px-1 min-w-[80px] text-center">
                {item.text || "İSİM"}
              </span>
              
              {/* DELETE BUTTON ON HOVER */}
              <button 
                data-html2canvas-ignore="true"
                onClick={() => onRemoveItem(item.id)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs shadow-lg transition-opacity cursor-pointer z-50"
              >
                ×
              </button>
            </div>
          )
        })}
        
        {/* ADD BUTTON */}
        <div className="relative">
          <button 
            data-html2canvas-ignore="true"
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-24 h-24 rounded-full border-[3px] border-dashed border-[#5a3a2a] flex justify-center items-center text-[#5a3a2a] hover:text-[#e8d5b0] hover:border-[#e8d5b0] hover:bg-white/5 transition-colors shrink-0"
          >
            <Plus size={40} />
          </button>
          
          {/* THE ICONS MENU THAT OPENS WHEN YOU CLICK PLUS */}
          {showAddMenu && (
            <div data-html2canvas-ignore="true" className="absolute z-[99] top-full mt-2 left-0 w-[240px] p-2 bg-[#0a0202] border border-[#3a1a0a] rounded shadow-[0_0_20px_rgba(0,0,0,0.9)] flex flex-wrap gap-2">
              <div className="w-full text-xs text-[#a89070] mb-1 pl-1 tracking-widest">Simge Seçip Ekle:</div>
              {ICONS.map((Icon, i) => (
                <div 
                  key={i} 
                  onClick={() => { 
                    onAddItem(i); 
                    setShowAddMenu(false); 
                  }}
                  className="p-2 hover:bg-[#3a1a0a] rounded cursor-pointer text-[#e8d5b0] transition-colors"
                >
                  <Icon size={22} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default function PatchGenerator() {
  const patchRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const [buffs, setBuffs] = useState([{ id: 1, iconIndex: 0, text: "Ozan" }])
  const [nerfs, setNerfs] = useState([{ id: 2, iconIndex: 3, text: "S. Marşı" }])
  const [newItems, setNewItems] = useState([
    { id: 5, iconIndex: 16, text: "Yetenek" },
    { id: 6, iconIndex: 11, text: "Sistem" }
  ])
  const [adjusts, setAdjusts] = useState([{ id: 3, iconIndex: 1, text: "Nekromant" }, { id: 4, iconIndex: 2, text: "Harita" }])

  const downloadImage = async () => {
    if (!patchRef.current) return
    setDownloading(true)
    try {
      const filter = (node: HTMLElement) => {
        return !node.hasAttribute || !node.hasAttribute('data-html2canvas-ignore');
      };

      const dataUrl = await toPng(patchRef.current, {
        cacheBust: true,
        backgroundColor: '#050302',
        pixelRatio: 2,
        filter: filter
      });
      
      const link = document.createElement('a')
      link.download = 'yama-ozeti.png'
      link.href = dataUrl
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
        className="w-[1280px] h-[720px] relative flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #0a0202 0%, #150505 100%)',
          border: '2px solid #3a1a0a',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.5)',
          fontFamily: "'EB Garamond', serif"
        }}
      >
        <div className="absolute top-[-100px] left-[300px] w-[200px] h-[200px] bg-red-900/20 blur-[50px] pointer-events-none rounded-full overflow-hidden" />
        
        <div className="px-16 py-8 border-b border-[#3a1a0a] flex justify-between items-center bg-black/50 z-10 shrink-0">
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

        <div className="flex flex-1 p-8 gap-12 relative z-10 h-full">
          <div className="flex-1 flex flex-col border-r border-[#3a1a0a] pr-8">
            <Category 
              title="GÜÇLENDİ" color="text-green-500" icon="▲" 
              items={buffs} 
              onAddItem={(iconIndex: number) => setBuffs([...buffs, { id: Date.now(), iconIndex, text: "" }])}
              onRemoveItem={(id: number) => setBuffs(buffs.filter(b => b.id !== id))}
            />
            <Category 
              title="ZAYIFLADI" color="text-red-500" icon="▼" 
              items={nerfs} 
              onAddItem={(iconIndex: number) => setNerfs([...nerfs, { id: Date.now(), iconIndex, text: "" }])}
              onRemoveItem={(id: number) => setNerfs(nerfs.filter(n => n.id !== id))}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <Category 
              title="DÜZENLENDİ" color="text-yellow-500" icon="↻" 
              items={adjusts} 
              onAddItem={(iconIndex: number) => setAdjusts([...adjusts, { id: Date.now(), iconIndex, text: "" }])}
              onRemoveItem={(id: number) => setAdjusts(adjusts.filter(a => a.id !== id))}
            />
            
            <div className="mt-auto">
              <h3 className="text-[#e8d5b0] text-xl tracking-widest mb-6 flex items-center gap-2" style={{ fontFamily: 'Cinzel, serif' }}>
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
          <h3 className="text-[#e8d5b0] font-bold mb-2 uppercase tracking-widest text-xs" style={{ fontFamily: 'Cinzel, serif' }}>NASIL EKLENİR?</h3>
          <p className="text-xs text-[#8a7060] leading-relaxed mb-4">
            <b>(+) Ekle:</b> Artı butonuna basınca çıkan listeden istediğin simgeyi seç. Simge hemen yan tarafa eklenecektir. (Seçtiğinde menü otomatik kapanır).
          </p>
          <p className="text-xs text-[#8a7060] leading-relaxed">
            <b>(×) Sil:</b> Silmek istediğin ikonun <b>üzerine farenle geldiğinde</b> sağ üstünde kırmızı bir çarpı (×) çıkar, basıp silebilirsin.
          </p>
        </div>
        <button onClick={downloadImage} disabled={downloading} className="diablo-btn diablo-btn-primary w-full py-4 uppercase flex justify-center items-center">
          {downloading ? 'HAZIRLANIYOR...' : 'RESMİ İNDİR'}
        </button>
      </div>
    </div>
  )
}
