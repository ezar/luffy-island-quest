import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

// Read the existing favicon SVG (the hat shown in the app)
const svgSource = readFileSync('public/favicon.svg', 'utf8')

function renderSVG(svgString, size) {
  // Wrap with background + padding so hat is centered on navy square
  const padded = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#0A2240" rx="14"/>
    ${svgString.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
  </svg>`

  const resvg = new Resvg(padded, {
    fitTo: { mode: 'width', value: size },
  })
  return resvg.render().asPng()
}

mkdirSync('public/icons', { recursive: true })

writeFileSync('public/icons/icon-192.png', renderSVG(svgSource, 192))
console.log('Created public/icons/icon-192.png')

writeFileSync('public/icons/icon-512.png', renderSVG(svgSource, 512))
console.log('Created public/icons/icon-512.png')
