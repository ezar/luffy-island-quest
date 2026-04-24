export default function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 5,
      textAlign: 'center',
      padding: '2px 8px',
      fontSize: '0.62rem',
      color: 'rgba(255,255,255,0.28)',
      letterSpacing: '0.04em',
      pointerEvents: 'none',
      userSelect: 'none',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
    }}>
      © {new Date().getFullYear()} Luffy Island Quest · v{__BUILD_VERSION__}
    </footer>
  )
}
