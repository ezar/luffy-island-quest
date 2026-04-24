/* SVG icons for each Straw Hat character, inspired by their iconic look */

function LuffyIcon({ size }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Straw hat */}
      <ellipse cx="40" cy="52" rx="34" ry="10" fill="#C8920A" stroke="#1a1a1a" strokeWidth="2"/>
      <ellipse cx="40" cy="50" rx="30" ry="8.5" fill="#E8B514"/>
      <path d="M16 50 Q18 28 40 26 Q62 28 64 50 Z" fill="#E8B514" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M18 43 Q40 38 62 43" stroke="#D32F2F" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <ellipse cx="40" cy="27" rx="11" ry="3.5" fill="#D4A012" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Face */}
      <circle cx="40" cy="20" r="13" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Eyes */}
      <circle cx="35" cy="18" r="2.5" fill="#1a1a1a"/>
      <circle cx="45" cy="18" r="2.5" fill="#1a1a1a"/>
      {/* Big Luffy smile */}
      <path d="M33 23 Q40 30 47 23" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Scar under left eye */}
      <line x1="34" y1="21" x2="36" y2="24" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ZoroIcon({ size }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Three swords - Santoryu */}
      {/* Left sword */}
      <g transform="rotate(-30,40,55)">
        <rect x="38" y="8" width="4" height="44" rx="2" fill="#B0BEC5" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="34" y="50" width="12" height="5" rx="1" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="36" y="55" width="8" height="12" rx="3" fill="#1B5E20"/>
      </g>
      {/* Right sword */}
      <g transform="rotate(30,40,55)">
        <rect x="38" y="8" width="4" height="44" rx="2" fill="#B0BEC5" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="34" y="50" width="12" height="5" rx="1" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="36" y="55" width="8" height="12" rx="3" fill="#1B5E20"/>
      </g>
      {/* Center sword */}
      <rect x="38" y="5" width="4" height="46" rx="2" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="1.5"/>
      <rect x="33" y="49" width="14" height="5" rx="1" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1.5"/>
      <rect x="36" y="54" width="8" height="13" rx="3" fill="#1B5E20"/>
      {/* Green bandana on handle */}
      <rect x="35" y="49" width="10" height="3" rx="1" fill="#4CAF50"/>
    </svg>
  )
}

function NamiIcon({ size }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Face */}
      <circle cx="40" cy="28" r="16" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Orange hair */}
      <path d="M24 25 Q22 8 35 6 Q40 4 45 6 Q58 8 56 25 Q52 10 40 9 Q28 10 24 25Z" fill="#FF9800" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M54 22 Q62 16 60 30 Q58 20 54 22Z" fill="#FF9800"/>
      {/* Eyes */}
      <ellipse cx="35" cy="27" rx="3" ry="3.5" fill="#1a1a1a"/>
      <ellipse cx="45" cy="27" rx="3" ry="3.5" fill="#1a1a1a"/>
      <circle cx="36" cy="26" r="1" fill="white"/>
      <circle cx="46" cy="26" r="1" fill="white"/>
      {/* Smile */}
      <path d="M35 34 Q40 38 45 34" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Clima-tact staff */}
      <rect x="58" y="32" width="4" height="40" rx="2" fill="#FF9800" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Orb */}
      <circle cx="60" cy="30" r="7" fill="#FFF176" stroke="#FF9800" strokeWidth="2"/>
      <circle cx="58" cy="27" r="2" fill="white" opacity="0.6"/>
      {/* Tangerine pinwheel */}
      <circle cx="40" cy="65" r="9" fill="#FF9800" stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1="40" y1="56" x2="40" y2="74" stroke="#1a1a1a" strokeWidth="1"/>
      <line x1="31" y1="65" x2="49" y2="65" stroke="#1a1a1a" strokeWidth="1"/>
      <circle cx="40" cy="55" r="3" fill="#4CAF50" stroke="#1a1a1a" strokeWidth="1"/>
    </svg>
  )
}

function UsoppIcon({ size }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Green cap */}
      <ellipse cx="40" cy="22" rx="22" ry="8" fill="#388E3C" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M18 22 Q20 6 40 5 Q60 6 62 22Z" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Yellow band on cap */}
      <path d="M19 21 Q40 26 61 21" stroke="#FFD600" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Face */}
      <ellipse cx="40" cy="36" rx="14" ry="15" fill="#8D6E63" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Long nose */}
      <ellipse cx="40" cy="49" rx="5" ry="14" fill="#795548" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Eyes / goggles */}
      <circle cx="33" cy="32" r="7" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="47" cy="32" r="7" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="33" cy="32" r="4.5" fill="#795548"/>
      <circle cx="47" cy="32" r="4.5" fill="#795548"/>
      <circle cx="34" cy="31" r="1.5" fill="white"/>
      <circle cx="48" cy="31" r="1.5" fill="white"/>
      {/* Goggles strap */}
      <path d="M18 25 Q26 30 26 32" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M62 25 Q54 30 54 32" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      {/* Slingshot Kabuto */}
      <path d="M10 70 Q14 55 22 52" stroke="#795548" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M10 70 Q6 55 14 50" stroke="#795548" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M14 50 Q18 48 22 52" stroke="#795548" strokeWidth="3" fill="none"/>
      <path d="M14 50 Q18 46 22 52" stroke="#FF9800" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

function SanjiIcon({ size }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Black suit body hint */}
      <path d="M20 80 Q22 55 40 52 Q58 55 60 80Z" fill="#1a1a1a"/>
      {/* White shirt */}
      <path d="M33 52 L40 58 L47 52 L45 80 L35 80Z" fill="white"/>
      {/* Face */}
      <circle cx="40" cy="30" r="18" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Blonde hair - side swept */}
      <path d="M22 26 Q20 10 35 8 Q42 6 50 10 Q58 8 58 22 Q54 12 44 11 Q36 10 28 14 Q24 18 22 26Z"
        fill="#FFD600" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Hair covers one eye - swirly */}
      <path d="M22 26 Q26 15 36 18 Q30 20 28 28 Q24 30 22 26Z" fill="#F9A825"/>
      {/* Visible eye (right) */}
      <ellipse cx="46" cy="28" rx="3.5" ry="4" fill="#1a1a1a"/>
      <circle cx="47" cy="27" r="1" fill="white"/>
      {/* Swirly eyebrow - Sanji's trademark */}
      <path d="M42 22 Q48 18 54 22" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M54 22 Q56 20 54 18" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Cigarette */}
      <rect x="47" y="36" width="14" height="3" rx="1.5" fill="white" stroke="#1a1a1a" strokeWidth="1"/>
      <rect x="58" y="35" width="4" height="5" rx="1" fill="#FF7043"/>
      {/* Smoke */}
      <path d="M61 33 Q63 28 61 23 Q64 26 62 31" stroke="#B0BEC5" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      {/* Flame on leg */}
      <path d="M30 65 Q28 55 35 52 Q33 60 40 58 Q38 63 42 62 Q36 68 30 65Z" fill="#FF6F00" stroke="#E65100" strokeWidth="1"/>
      <path d="M35 64 Q34 57 38 55 Q36 61 41 59 Q38 65 35 64Z" fill="#FFF176"/>
    </svg>
  )
}

const ICONS = { luffy: LuffyIcon, zoro: ZoroIcon, nami: NamiIcon, usopp: UsoppIcon, sanji: SanjiIcon }

export default function CharacterIcon({ id, size = 64 }) {
  const Icon = ICONS[id]
  if (!Icon) return <span style={{ fontSize: size * 0.6 }}>❓</span>
  return <Icon size={size} />
}
