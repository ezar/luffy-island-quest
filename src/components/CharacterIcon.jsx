/* Iconic One Piece symbols — no faces, just the most recognizable item of each character */

function LuffyIcon({ size }) {
  // Straw hat — his most iconic symbol
  return (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8} xmlns="http://www.w3.org/2000/svg">
      {/* Drop shadow */}
      <ellipse cx="50" cy="74" rx="42" ry="5" fill="rgba(0,0,0,0.12)" />
      {/* Brim — bottom */}
      <ellipse cx="50" cy="62" rx="46" ry="14" fill="#B8810A" stroke="#1a1a1a" strokeWidth="2.5"/>
      {/* Brim — top surface */}
      <ellipse cx="50" cy="59" rx="43" ry="12" fill="#E8B514"/>
      {/* Straw texture lines on brim */}
      {[-28,-18,-8,2,12,22,32].map((dx,i)=>(
        <line key={i} x1={50+dx-3} y1={52} x2={50+dx+4} y2={69}
          stroke="#C89010" strokeWidth="1.2" strokeOpacity="0.55"/>
      ))}
      {/* Crown */}
      <path d="M18 59 Q20 22 50 18 Q80 22 82 59Z"
        fill="#F0C020" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Crown texture */}
      {[-16,-6,4,14].map((dx,i)=>(
        <line key={i} x1={50+dx} y1={59} x2={50+dx*0.55} y2={21}
          stroke="#C89010" strokeWidth="1.2" strokeOpacity="0.4"/>
      ))}
      {/* Crown top */}
      <ellipse cx="50" cy="19" rx="15" ry="4.5" fill="#D4A010" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Red band */}
      <path d="M20 50 Q50 44 80 50"
        stroke="#D32F2F" strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M21 54 Q50 48 79 54"
        stroke="#B71C1C" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.5"/>
      <path d="M21 47 Q50 41 79 47"
        stroke="#EF5350" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.4"/>
      {/* Highlight */}
      <ellipse cx="34" cy="56" rx="12" ry="4" fill="rgba(255,255,255,0.18)"
        transform="rotate(-10,34,56)"/>
    </svg>
  )
}

function ZoroIcon({ size }) {
  // Three katanas — Santoryu (Three Sword Style)
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Left sword */}
      <g transform="rotate(-28,50,85)">
        <rect x="47" y="8" width="6" height="60" rx="3" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="1.8"/>
        <path d="M47 8 L53 8 L50 2Z" fill="#B0BEC5" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="43" y="65" width="14" height="6" rx="2" fill="#1B5E20" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="45" y="71" width="10" height="20" rx="4" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1.5"/>
        <path d="M43 66 Q50 69 57 66" stroke="#4CAF50" strokeWidth="2" fill="none"/>
      </g>
      {/* Right sword */}
      <g transform="rotate(28,50,85)">
        <rect x="47" y="8" width="6" height="60" rx="3" fill="#ECEFF1" stroke="#1a1a1a" strokeWidth="1.8"/>
        <path d="M47 8 L53 8 L50 2Z" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="43" y="65" width="14" height="6" rx="2" fill="#1B5E20" stroke="#1a1a1a" strokeWidth="1.5"/>
        <rect x="45" y="71" width="10" height="20" rx="4" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1.5"/>
        <path d="M43 66 Q50 69 57 66" stroke="#4CAF50" strokeWidth="2" fill="none"/>
      </g>
      {/* Center sword (foreground) */}
      <rect x="47" y="5" width="6" height="62" rx="3" fill="#FAFAFA" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M47 5 L53 5 L50 0Z" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="1.8"/>
      {/* Blade edge line */}
      <line x1="52" y1="5" x2="52" y2="65" stroke="#90A4AE" strokeWidth="1"/>
      {/* Guard */}
      <rect x="42" y="64" width="16" height="7" rx="3" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Handle */}
      <rect x="44.5" y="71" width="11" height="22" rx="4" fill="#388E3C" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Handle wrap */}
      {[74,79,84,89].map((y,i)=>(
        <line key={i} x1="44.5" y1={y} x2="55.5" y2={y} stroke="#1B5E20" strokeWidth="1.5"/>
      ))}
    </svg>
  )
}

function NamiIcon({ size }) {
  // Tangerine — her hometown symbol (Mikan village), and the pinwheel tattoo
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="50" cy="92" rx="28" ry="5" fill="rgba(0,0,0,0.12)"/>
      {/* Tangerine body */}
      <circle cx="50" cy="58" r="34" fill="#FF8C00" stroke="#1a1a1a" strokeWidth="2.5"/>
      <circle cx="50" cy="58" r="30" fill="#FFA726"/>
      {/* Segment lines */}
      {[0,45,90,135,180,225,270,315].map((deg,i)=>{
        const rad = deg * Math.PI/180
        return <line key={i}
          x1="50" y1="58"
          x2={50+30*Math.cos(rad)} y2={58+30*Math.sin(rad)}
          stroke="#FF8C00" strokeWidth="1" strokeOpacity="0.5"/>
      })}
      {/* Highlight */}
      <ellipse cx="38" cy="46" rx="10" ry="7" fill="rgba(255,255,255,0.25)" transform="rotate(-30,38,46)"/>
      {/* Stem */}
      <rect x="47" y="22" width="6" height="10" rx="3" fill="#5D4037" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Leaf left */}
      <path d="M46 26 Q32 14 28 5 Q40 12 46 26Z"
        fill="#388E3C" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M37 15 Q34 11 32 8" stroke="#2E7D32" strokeWidth="1" fill="none"/>
      {/* Leaf right */}
      <path d="M54 26 Q68 14 72 5 Q60 12 54 26Z"
        fill="#43A047" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M63 15 Q66 11 68 8" stroke="#2E7D32" strokeWidth="1" fill="none"/>
      {/* Pinwheel tattoo on tangerine */}
      <circle cx="50" cy="60" r="9" fill="#FF7043" stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1="50" y1="51" x2="50" y2="69" stroke="#1a1a1a" strokeWidth="1.2"/>
      <line x1="41" y1="60" x2="59" y2="60" stroke="#1a1a1a" strokeWidth="1.2"/>
      <line x1="44" y1="54" x2="56" y2="66" stroke="#1a1a1a" strokeWidth="1.2"/>
      <line x1="56" y1="54" x2="44" y2="66" stroke="#1a1a1a" strokeWidth="1.2"/>
      <circle cx="50" cy="60" r="3" fill="#1a1a1a"/>
    </svg>
  )
}

function UsoppIcon({ size }) {
  // Kabuto slingshot — his signature weapon
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Handle */}
      <rect x="44" y="55" width="12" height="36" rx="6" fill="#8D6E63" stroke="#1a1a1a" strokeWidth="2.5"/>
      {/* Handle texture rings */}
      {[62,70,78].map((y,i)=>(
        <rect key={i} x="44" y={y} width="12" height="3" rx="1.5"
          fill="#6D4C41" stroke="#1a1a1a" strokeWidth="1"/>
      ))}
      {/* Fork left arm */}
      <path d="M50 55 Q26 50 16 20"
        stroke="#795548" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <path d="M50 55 Q26 50 16 20"
        stroke="#8D6E63" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Fork right arm */}
      <path d="M50 55 Q74 50 84 20"
        stroke="#795548" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <path d="M50 55 Q74 50 84 20"
        stroke="#8D6E63" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Fork tips */}
      <circle cx="16" cy="20" r="7" fill="#5D4037" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="84" cy="20" r="7" fill="#5D4037" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Elastic band */}
      <path d="M16 20 Q50 42 84 20"
        stroke="#FF7043" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Band center (stretched) */}
      <circle cx="50" cy="38" r="5" fill="#F4511E" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Star decoration (Usopp's star from his goggles) */}
      <path d="M50 4 L52 10 L58 10 L53 14 L55 20 L50 16 L45 20 L47 14 L42 10 L48 10Z"
        fill="#FFD600" stroke="#1a1a1a" strokeWidth="1.5"/>
    </svg>
  )
}

function SanjiIcon({ size }) {
  // Flaming leg — his Diable Jambe signature move
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Flames — outer */}
      <path d="M32 72 Q18 55 25 35 Q28 48 35 45 Q22 30 30 10 Q36 28 44 25 Q38 15 42 5 Q50 22 48 32 Q56 22 54 10 Q64 28 58 38 Q66 32 64 20 Q75 40 65 55 Q72 48 74 36 Q80 55 68 72Z"
        fill="#FF6F00" stroke="#E65100" strokeWidth="1.5"/>
      {/* Flames — inner orange */}
      <path d="M36 72 Q24 58 30 42 Q33 52 39 49 Q28 36 36 20 Q40 34 46 31 Q43 23 46 14 Q52 28 50 38 Q57 28 56 18 Q64 34 59 46 Q65 40 63 30 Q70 48 62 62 Q66 53 67 44 Q74 60 64 72Z"
        fill="#FFA726"/>
      {/* Flames — inner yellow core */}
      <path d="M42 72 Q34 60 38 48 Q41 56 45 53 Q38 44 44 32 Q48 42 51 39 Q50 32 52 25 Q57 38 54 48 Q59 40 58 32 Q64 48 57 60 Q60 52 61 45 Q66 58 60 72Z"
        fill="#FFF176"/>
      {/* Leg — black suit trouser */}
      <rect x="38" y="55" width="24" height="40" rx="6" fill="#212121" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Trouser crease */}
      <line x1="50" y1="56" x2="50" y2="95" stroke="#37474F" strokeWidth="1.5"/>
      {/* Shoe */}
      <path d="M36 88 Q38 98 55 98 Q68 98 66 88Z"
        fill="#1a1a1a" stroke="#000" strokeWidth="1.5"/>
      <path d="M36 88 Q38 94 50 94 Q62 94 66 88" stroke="#37474F" strokeWidth="1" fill="none"/>
    </svg>
  )
}

const ICONS = { luffy: LuffyIcon, zoro: ZoroIcon, nami: NamiIcon, usopp: UsoppIcon, sanji: SanjiIcon }

export default function CharacterIcon({ id, size = 64 }) {
  const Icon = ICONS[id]
  if (!Icon) return <span style={{ fontSize: size * 0.6, lineHeight: 1 }}>❓</span>
  return <Icon size={size} />
}
