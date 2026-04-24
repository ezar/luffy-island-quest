export default function LuffyHatSvg({ size = 64, style }) {
  return (
    <svg
      viewBox="0 0 100 72"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 0.72}
      style={style}
      aria-hidden="true"
    >
      {/* Sombra debajo del ala */}
      <ellipse cx="50" cy="58" rx="46" ry="10" fill="rgba(0,0,0,0.18)" />

      {/* Ala del sombrero */}
      <ellipse cx="50" cy="54" rx="46" ry="13" fill="#C8920A" stroke="#1A1A1A" strokeWidth="2.5" />
      <ellipse cx="50" cy="52" rx="42" ry="11" fill="#E8B514" />

      {/* Líneas de paja en el ala */}
      {[-28,-18,-8,0,8,18,28].map((dx, i) => (
        <line key={i} x1={50+dx} y1="42" x2={50+dx+4} y2="63"
          stroke="#C8920A" strokeWidth="1" strokeOpacity="0.5" />
      ))}

      {/* Copa del sombrero */}
      <path
        d="M22 52 Q24 20 50 17 Q76 20 78 52 Z"
        fill="#E8B514"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Textura de paja en la copa */}
      {[-12,-4,4,12].map((dx, i) => (
        <line key={i} x1={50+dx} y1="52" x2={50+dx*0.6} y2="19"
          stroke="#C8920A" strokeWidth="1" strokeOpacity="0.4" />
      ))}

      {/* Borde superior copa (más oscuro) */}
      <ellipse cx="50" cy="18" rx="14" ry="4" fill="#D4A012" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Banda roja */}
      <path
        d="M24 44 Q50 39 76 44"
        stroke="#D32F2F"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Borde inferior banda */}
      <path
        d="M25 47 Q50 42.5 75 47"
        stroke="#B71C1C"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      {/* Borde superior banda */}
      <path
        d="M24 41 Q50 36 76 41"
        stroke="#EF5350"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      {/* Brillo en el ala */}
      <ellipse cx="36" cy="49" rx="10" ry="3" fill="rgba(255,255,255,0.15)" transform="rotate(-8,36,49)" />
    </svg>
  )
}
