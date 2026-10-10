'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Chain tile: front-facing link + edge-on link, steel gradient (Warcraft III menu style).
const tile = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="120"><defs><linearGradient id="s" x1="0" x2="1"><stop offset="0" stop-color="#191614"/><stop offset=".35" stop-color="#8d867c"/><stop offset=".6" stop-color="#4a443e"/><stop offset="1" stop-color="#121010"/></linearGradient></defs><rect x="7" y="2" width="30" height="62" rx="15" fill="none" stroke="#0a0908" stroke-width="12"/><rect x="7" y="2" width="30" height="62" rx="15" fill="none" stroke="url(#s)" stroke-width="9"/><rect x="17" y="52" width="10" height="64" rx="5" fill="url(#s)" stroke="#0a0908" stroke-width="2"/></svg>`
)
const chain = { backgroundImage: `url("data:image/svg+xml,${tile}")`, backgroundSize: '44px 120px' }
const rivets = 'radial-gradient(circle at 50% 50%, #9a948a 0 1.5px, #1a1816 2.5px, transparent 3.5px)'

export default function ChainPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const kick = useMotionValue(0)
  // low damping = it keeps swinging like a pendulum after the push
  const swing = useSpring(kick, { stiffness: 40, damping: 3 })

  // Cursor enters on one side -> panel flees from the cursor, then settles.
  const push = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    const side = e.clientX < r.left + r.width / 2 ? -1 : 1
    kick.set(side * 2.2)
    setTimeout(() => kick.set(0), 150)
  }

  return (
    <motion.div style={{ rotate: swing, transformOrigin: '50% -50vh' }} onMouseEnter={push} ref={ref}>
    <motion.div
      className={`relative ${className}`}
      style={{ transformOrigin: '50% -50vh' }}
      initial={{ y: '-120vh' }}
      animate={{ y: ['-120vh', '0vh', '-2.5vh', '0vh'], rotate: [0, 0.9, -0.7, 0.4, -0.25, 0.1, 0] }}
      transition={{
        y: { duration: 1.5, delay: 0.2, times: [0, 0.55, 0.75, 1], ease: ['easeIn', 'easeOut', 'easeIn'] },
        rotate: { duration: 3.2, delay: 1, times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1], ease: 'easeOut' },
      }}
    >
      {/* two chains running up past the top of the screen, each ending in an iron bracket */}
      {['left-[12%]', 'right-[12%]'].map(pos => (
        <div key={pos} className={`absolute bottom-full ${pos} w-11 h-[120vh] -mb-1`} style={chain}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-6 bg-[#1c1917] border-2 border-[#4a443e] rounded-sm" />
        </div>
      ))}

      <div
        className="relative px-6 py-10 md:px-16 md:py-14 border-[6px] border-[#2a2623]"
        style={{
          background: 'linear-gradient(180deg, rgba(14,10,8,0.88), rgba(6,3,3,0.92))',
          boxShadow: 'inset 0 0 0 2px #4d4740, inset 0 0 50px #000, 0 0 0 1px #000, 0 20px 60px rgba(0,0,0,0.9)',
        }}
      >
        {/* rivet strips along the four edges */}
        {[
          'top-[-1px] left-2 right-2 h-3 bg-[length:22px_12px] bg-repeat-x',
          'bottom-[-1px] left-2 right-2 h-3 bg-[length:22px_12px] bg-repeat-x',
          'left-[-1px] top-2 bottom-2 w-3 bg-[length:12px_22px] bg-repeat-y',
          'right-[-1px] top-2 bottom-2 w-3 bg-[length:12px_22px] bg-repeat-y',
        ].map(c => (
          <span key={c} className={`absolute pointer-events-none ${c}`} style={{ backgroundImage: rivets }} />
        ))}
        {children}
      </div>
    </motion.div>
    </motion.div>
  )
}
