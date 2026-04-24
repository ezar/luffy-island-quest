import { createDeflate } from 'zlib'
import { createWriteStream } from 'fs'
import { mkdir } from 'fs/promises'

// CRC32 table
const CRC_TABLE = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  CRC_TABLE[n] = c
}
function crc32(buf) {
  let crc = 0xffffffff
  for (const b of buf) crc = CRC_TABLE[(crc ^ b) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const len = Buffer.allocUnsafe(4)
  len.writeUInt32BE(data.length)
  const crcBuf = Buffer.concat([typeBytes, data])
  const crcVal = Buffer.allocUnsafe(4)
  crcVal.writeUInt32BE(crc32(crcBuf))
  return Buffer.concat([len, typeBytes, data, crcVal])
}

// Draw a pixel at (px, py) with color [r,g,b] into the raw buffer
function setPixel(raw, size, px, py, r, g, b) {
  if (px < 0 || px >= size || py < 0 || py >= size) return
  const rowSize = 1 + size * 3
  const i = py * rowSize + 1 + px * 3
  raw[i] = r; raw[i + 1] = g; raw[i + 2] = b
}

// Fill a filled ellipse
function fillEllipse(raw, size, cx, cy, rx, ry, r, g, b) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry
      if (dx * dx + dy * dy <= 1) setPixel(raw, size, x, y, r, g, b)
    }
  }
}

// Fill a rectangle
function fillRect(raw, size, x0, y0, w, h, r, g, b) {
  for (let y = y0; y < y0 + h; y++)
    for (let x = x0; x < x0 + w; x++)
      setPixel(raw, size, x, y, r, g, b)
}

// Draw a thick horizontal arc (brim of hat)
function fillArc(raw, size, cx, cy, rx, ry, thickness, r, g, b) {
  fillEllipse(raw, size, cx, cy, rx, ry, r, g, b)
  fillEllipse(raw, size, cx, cy, rx - thickness, ry - thickness, ...bg)
}

const bg = [10, 34, 64]       // #0A2240 navy
const gold = [232, 181, 20]   // #E8B514 straw
const goldDark = [184, 129, 10] // #B8810A dark straw
const red = [196, 30, 30]     // #C41E1E band red

async function makePNG(size, outPath) {
  const rowSize = 1 + size * 3
  const raw = Buffer.allocUnsafe(size * rowSize)

  // Background fill
  for (let y = 0; y < size; y++) {
    raw[y * rowSize] = 0
    for (let x = 0; x < size; x++) setPixel(raw, size, x, y, ...bg)
  }

  const s = size / 192  // scale factor

  // ── Straw hat ──────────────────────────────────────────
  const cx = size / 2
  const cy = size * 0.52

  // Brim shadow (dark ellipse, slightly offset down)
  fillEllipse(raw, size, cx, cy * 1.04, 78 * s, 18 * s, ...goldDark)

  // Brim top (gold ellipse)
  fillEllipse(raw, size, cx, cy, 80 * s, 17 * s, ...gold)

  // Crown (trapezoid approximation via stacked ellipses)
  for (let i = 0; i <= 52; i++) {
    const t = i / 52
    const ew = (44 + (80 - 44) * (1 - Math.pow(1 - t, 1.4))) * s
    fillEllipse(raw, size, cx, cy - i * s, ew, 12 * s, ...gold)
  }

  // Red band across the hat
  const bandY = cy - 10 * s
  for (let i = 0; i <= 14; i++) {
    const t = i / 14
    const ew = (52 + (76 - 52) * t) * s
    fillEllipse(raw, size, cx, bandY + i * s, ew, 9 * s, ...red)
  }

  // Brim top re-draw over crown base (clean edge)
  fillEllipse(raw, size, cx, cy, 80 * s, 16 * s, ...gold)

  // Skull (small, centered on crown top)
  const skullCX = cx, skullCY = cy - 58 * s
  fillEllipse(raw, size, skullCX, skullCY, 14 * s, 12 * s, [255, 255, 245])
  // Eyes
  fillEllipse(raw, size, skullCX - 5 * s, skullCY - 1 * s, 3 * s, 3 * s, ...bg)
  fillEllipse(raw, size, skullCX + 5 * s, skullCY - 1 * s, 3 * s, 3 * s, ...bg)
  // Teeth line
  for (let i = -3; i <= 3; i += 2) {
    fillRect(raw, size,
      Math.round(skullCX + i * s - 1 * s), Math.round(skullCY + 5 * s),
      Math.round(2 * s), Math.round(3 * s),
      ...bg)
  }

  // Compress & write
  const compressed = await new Promise((resolve, reject) => {
    const chunks = []
    const deflate = createDeflate({ level: 9 })
    deflate.on('data', c => chunks.push(c))
    deflate.on('end', () => resolve(Buffer.concat(chunks)))
    deflate.on('error', reject)
    deflate.end(raw)
  })

  const ihdr = Buffer.allocUnsafe(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])

  await mkdir('public/icons', { recursive: true })
  await new Promise((resolve, reject) => {
    const ws = createWriteStream(outPath)
    ws.on('finish', resolve)
    ws.on('error', reject)
    ws.end(png)
  })
  console.log(`Created ${outPath} (${png.length} bytes)`)
}

await makePNG(192, 'public/icons/icon-192.png')
await makePNG(512, 'public/icons/icon-512.png')
console.log('Done!')
