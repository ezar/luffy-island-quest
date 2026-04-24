/* Character SVG icons inspired by One Piece anime art style */

function LuffyIcon({ size }) {
  return (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.125} xmlns="http://www.w3.org/2000/svg">
      {/* Straw hat brim shadow */}
      <ellipse cx="40" cy="38" rx="36" ry="9" fill="rgba(0,0,0,0.15)" />
      {/* Straw hat brim */}
      <ellipse cx="40" cy="36" rx="36" ry="9" fill="#C8920A" stroke="#1a1a1a" strokeWidth="2"/>
      <ellipse cx="40" cy="34.5" rx="32" ry="7.5" fill="#E8B514"/>
      {/* Hat crown */}
      <path d="M16 35 Q17 12 40 10 Q63 12 64 35Z" fill="#F0C020" stroke="#1a1a1a" strokeWidth="2.2"/>
      {/* Straw texture lines on crown */}
      <path d="M22 33 Q31 12 40 10" stroke="#C8920A" strokeWidth="1" strokeOpacity="0.5" fill="none"/>
      <path d="M58 33 Q49 12 40 10" stroke="#C8920A" strokeWidth="1" strokeOpacity="0.5" fill="none"/>
      <path d="M28 34 Q34 11 40 10" stroke="#C8920A" strokeWidth="0.8" strokeOpacity="0.4" fill="none"/>
      <path d="M52 34 Q46 11 40 10" stroke="#C8920A" strokeWidth="0.8" strokeOpacity="0.4" fill="none"/>
      {/* Hat top */}
      <ellipse cx="40" cy="11" rx="12" ry="3.5" fill="#D4A010" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Red band */}
      <path d="M18 27 Q40 22 62 27" stroke="#D32F2F" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
      <path d="M19 29.5 Q40 25 61 29.5" stroke="#B71C1C" strokeWidth="1" fill="none" strokeLinecap="round" strokeOpacity="0.5"/>

      {/* Neck */}
      <rect x="35" y="50" width="10" height="8" rx="3" fill="#FFAD60"/>
      {/* Face */}
      <ellipse cx="40" cy="53" rx="16" ry="14" fill="#FFAD60" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="24.5" cy="53" rx="3.5" ry="4" fill="#FFAD60" stroke="#1a1a1a" strokeWidth="1.5"/>
      <ellipse cx="55.5" cy="53" rx="3.5" ry="4" fill="#FFAD60" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Eyes - wide open, Luffy style */}
      <ellipse cx="34" cy="50" rx="4.5" ry="5" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
      <ellipse cx="46" cy="50" rx="4.5" ry="5" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
      <circle cx="35" cy="51" r="3" fill="#1a1a1a"/>
      <circle cx="47" cy="51" r="3" fill="#1a1a1a"/>
      <circle cx="36" cy="50" r="1" fill="white"/>
      <circle cx="48" cy="50" r="1" fill="white"/>
      {/* Nose */}
      <ellipse cx="40" cy="56" rx="2" ry="1.5" fill="#E8975A"/>
      {/* Big grin */}
      <path d="M30 60 Q40 70 50 60" stroke="#1a1a1a" strokeWidth="2" fill="#D32F2F" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31 60 Q40 68 49 60" fill="#FF8A80"/>
      {/* Teeth */}
      <rect x="34" y="59" width="5" height="4" rx="1" fill="white"/>
      <rect x="41" y="59" width="5" height="4" rx="1" fill="white"/>
      {/* Scar under left eye */}
      <path d="M32 56 L34 60" stroke="#D32F2F" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function ZoroIcon({ size }) {
  return (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.125} xmlns="http://www.w3.org/2000/svg">
      {/* Body / torso */}
      <path d="M20 90 Q22 65 40 62 Q58 65 60 90Z" fill="#1a1a1a"/>
      {/* White shirt open chest */}
      <path d="M35 63 L40 68 L45 63 L44 90 L36 90Z" fill="white"/>
      {/* Neck */}
      <rect x="35" y="50" width="10" height="10" rx="3" fill="#D4A06A"/>
      {/* Face */}
      <ellipse cx="40" cy="44" rx="17" ry="16" fill="#D4A06A" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="23.5" cy="44" rx="3.5" ry="4" fill="#D4A06A" stroke="#1a1a1a" strokeWidth="1.5"/>
      <ellipse cx="56.5" cy="44" rx="3.5" ry="4" fill="#D4A06A" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Green hair - spiky */}
      <path d="M24 38 Q23 20 33 16 Q40 13 47 16 Q57 20 56 38 Q52 22 40 20 Q28 22 24 38Z" fill="#388E3C" stroke="#1a1a1a" strokeWidth="1.8"/>
      <path d="M23 32 Q18 22 26 16 Q24 24 26 30Z" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1"/>
      <path d="M57 32 Q62 22 54 16 Q56 24 54 30Z" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1"/>
      {/* Left eye closed (scar) */}
      <path d="M28 40 Q32 38 36 40" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M28 40 Q32 44 36 40" stroke="#1a1a1a" strokeWidth="1" fill="none"/>
      {/* Scar over left eye */}
      <path d="M30 34 L34 48" stroke="#B71C1C" strokeWidth="2" strokeLinecap="round"/>
      {/* Right eye open */}
      <ellipse cx="48" cy="42" rx="5" ry="5.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
      <circle cx="48.5" cy="43" r="3.5" fill="#1a1a1a"/>
      <circle cx="49.5" cy="42" r="1.2" fill="white"/>
      {/* Mouth - stern expression */}
      <path d="M34 53 Q40 55 46 53" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Green bandana tied to arm area */}
      <path d="M24 62 Q28 58 32 62 Q28 66 24 62Z" fill="#4CAF50" stroke="#1a1a1a" strokeWidth="1"/>
      {/* Three swords on back/side */}
      <g opacity="0.9">
        <rect x="8" y="18" width="3" height="48" rx="1.5" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="6" y="63" width="7" height="4" rx="1" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="13" y="16" width="3" height="48" rx="1.5" fill="#B0BEC5" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="11" y="61" width="7" height="4" rx="1" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="18" y="14" width="3" height="48" rx="1.5" fill="#ECEFF1" stroke="#1a1a1a" strokeWidth="1"/>
        <rect x="16" y="59" width="7" height="4" rx="1" fill="#388E3C" stroke="#1a1a1a" strokeWidth="1"/>
      </g>
    </svg>
  )
}

function NamiIcon({ size }) {
  return (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.125} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M22 90 Q24 65 40 62 Q56 65 58 90Z" fill="#FF9800"/>
      {/* Orange top */}
      <path d="M28 63 Q40 68 52 63 L54 90 L26 90Z" fill="#FF7043"/>
      {/* Neck */}
      <rect x="35" y="50" width="10" height="10" rx="3" fill="#FFCC99"/>
      {/* Face */}
      <ellipse cx="40" cy="44" rx="16" ry="15" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="24.5" cy="44" rx="3" ry="3.5" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="1.5"/>
      <ellipse cx="55.5" cy="44" rx="3" ry="3.5" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Orange hair - long flowing */}
      <path d="M24 40 Q22 18 35 13 Q40 11 45 13 Q58 18 56 40 Q52 18 40 16 Q28 18 24 40Z"
        fill="#FF9800" stroke="#1a1a1a" strokeWidth="1.8"/>
      {/* Hair side strands */}
      <path d="M23 38 Q16 50 20 65 Q22 55 26 48Z" fill="#FF9800" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M57 38 Q64 50 60 65 Q58 55 54 48Z" fill="#FF9800" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Hair highlight */}
      <path d="M28 18 Q32 14 38 14" stroke="#FFC107" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Eyes - big, feminine */}
      <ellipse cx="33" cy="42" rx="5" ry="5.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
      <ellipse cx="47" cy="42" rx="5" ry="5.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
      <circle cx="33.5" cy="43" r="3.5" fill="#5D4037"/>
      <circle cx="47.5" cy="43" r="3.5" fill="#5D4037"/>
      <circle cx="34.5" cy="42" r="1.2" fill="white"/>
      <circle cx="48.5" cy="42" r="1.2" fill="white"/>
      {/* Eyelashes */}
      <path d="M28 39 Q30 37 33 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
      <path d="M42 39 Q44 37 47 38" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
      {/* Nose */}
      <path d="M39 48 Q40 50 41 48" stroke="#E8975A" strokeWidth="1.2" fill="none"/>
      {/* Smile */}
      <path d="M33 52 Q40 58 47 52" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Tangerine pinwheel tattoo on arm */}
      <circle cx="62" cy="55" r="7" fill="#FF9800" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M62 48 L62 62M55 55 L69 55M57 50 L67 60M67 50 L57 60" stroke="#1a1a1a" strokeWidth="0.8"/>
      <circle cx="62" cy="55" r="2" fill="#1a1a1a"/>
    </svg>
  )
}

function UsoppIcon({ size }) {
  return (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.125} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <path d="M20 90 Q22 65 40 62 Q58 65 60 90Z" fill="#795548"/>
      {/* Overalls strap */}
      <path d="M32 63 L36 90 L44 90 L48 63 Q44 67 40 66 Q36 67 32 63Z" fill="#8D6E63"/>
      {/* Neck */}
      <rect x="35" y="50" width="10" height="10" rx="3" fill="#8D6E63"/>
      {/* Face - elongated due to long nose */}
      <ellipse cx="40" cy="43" rx="15" ry="14" fill="#8D6E63" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Long nose */}
      <path d="M36 52 Q35 60 37 68 Q40 75 43 68 Q45 60 44 52 Q42 56 40 55 Q38 56 36 52Z"
        fill="#795548" stroke="#1a1a1a" strokeWidth="1.8"/>
      {/* Ears */}
      <ellipse cx="25.5" cy="43" rx="3.5" ry="4" fill="#8D6E63" stroke="#1a1a1a" strokeWidth="1.5"/>
      <ellipse cx="54.5" cy="43" rx="3.5" ry="4" fill="#8D6E63" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Green cap */}
      <ellipse cx="40" cy="30" rx="20" ry="7" fill="#2E7D32" stroke="#1a1a1a" strokeWidth="2"/>
      <path d="M20 30 Q22 12 40 10 Q58 12 60 30Z" fill="#388E3C" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Yellow stripe on cap */}
      <path d="M21 29 Q40 34 59 29" stroke="#FFD600" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Goggles */}
      <rect x="25" y="35" width="14" height="12" rx="6" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="2"/>
      <rect x="41" y="35" width="14" height="12" rx="6" fill="#CFD8DC" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="32" cy="41" r="5" fill="#4FC3F7"/>
      <circle cx="48" cy="41" r="5" fill="#4FC3F7"/>
      <circle cx="33" cy="39.5" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="49" cy="39.5" r="1.5" fill="white" opacity="0.8"/>
      {/* Bridge between goggles */}
      <rect x="39" y="38" width="2" height="4" rx="1" fill="#90A4AE" stroke="#1a1a1a" strokeWidth="0.5"/>
      {/* Goggle strap */}
      <path d="M20 28 Q23 38 25 41" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M60 28 Q57 38 55 41" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      {/* Mouth under nose */}
      <path d="M34 72 Q40 76 46 72" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

function SanjiIcon({ size }) {
  return (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.125} xmlns="http://www.w3.org/2000/svg">
      {/* Black suit body */}
      <path d="M18 90 Q20 62 40 59 Q60 62 62 90Z" fill="#212121"/>
      {/* White shirt */}
      <path d="M34 60 L40 66 L46 60 L45 90 L35 90Z" fill="white"/>
      {/* Tie */}
      <path d="M38 61 L40 66 L42 61 L41 80 L39 80Z" fill="#B71C1C"/>
      {/* Suit lapels */}
      <path d="M34 60 Q28 64 26 72 L32 68Z" fill="#37474F"/>
      <path d="M46 60 Q52 64 54 72 L48 68Z" fill="#37474F"/>
      {/* Neck */}
      <rect x="35" y="50" width="10" height="10" rx="3" fill="#FFCC99"/>
      {/* Face */}
      <ellipse cx="40" cy="44" rx="16" ry="15" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="24.5" cy="44" rx="3" ry="3.5" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="1.5"/>
      <ellipse cx="55.5" cy="44" rx="3" ry="3.5" fill="#FFCC99" stroke="#1a1a1a" strokeWidth="1.5"/>
      {/* Blonde hair - side swept covering left eye */}
      <path d="M24 38 Q23 18 36 14 Q40 12 48 14 Q58 18 56 38 Q54 20 42 18 Q30 20 26 34Z"
        fill="#FFD600" stroke="#1a1a1a" strokeWidth="1.8"/>
      {/* Hair covering left eye */}
      <path d="M24 36 Q26 24 32 20 Q26 28 26 38Z" fill="#F9A825" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M24 36 Q22 40 24 46 Q26 42 28 38Z" fill="#F9A825"/>
      {/* Left eye hidden behind hair */}
      {/* Right eye visible */}
      <ellipse cx="48" cy="41" rx="5" ry="5.5" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
      <circle cx="48.5" cy="42" r="3.5" fill="#5D4037"/>
      <circle cx="49.5" cy="41" r="1.2" fill="white"/>
      {/* Sanji's trademark swirly eyebrow over right eye */}
      <path d="M42 34 Q48 30 55 35" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M55 35 Q58 32 55 28" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Nose */}
      <path d="M44 47 Q46 50 48 47" stroke="#E8975A" strokeWidth="1.2" fill="none"/>
      {/* Mouth - slight smirk */}
      <path d="M36 53 Q42 57 48 53" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Cigarette */}
      <rect x="48" y="52" width="16" height="3" rx="1.5" fill="white" stroke="#9E9E9E" strokeWidth="1"/>
      <rect x="61" y="51" width="5" height="5" rx="1" fill="#FF5722"/>
      {/* Smoke wisps */}
      <path d="M64 49 Q66 44 63 39" stroke="#CFD8DC" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M66 47 Q69 42 67 37" stroke="#CFD8DC" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

const ICONS = { luffy: LuffyIcon, zoro: ZoroIcon, nami: NamiIcon, usopp: UsoppIcon, sanji: SanjiIcon }

export default function CharacterIcon({ id, size = 64 }) {
  const Icon = ICONS[id]
  if (!Icon) return <span style={{ fontSize: size * 0.6, lineHeight: 1 }}>❓</span>
  return <Icon size={size} />
}
