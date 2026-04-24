import { createDeflate } from 'zlib'
import { createWriteStream } from 'fs'
import { mkdir } from 'fs/promises'
import { pipeline } from 'stream/promises'
import { Readable, PassThrough } from 'stream'

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

async function makePNG(size, r, g, b, outPath) {
  // IHDR
  const ihdr = Buffer.allocUnsafe(13)
  ihdr.writeUInt32BE(size, 0)   // width
  ihdr.writeUInt32BE(size, 4)   // height
  ihdr[8] = 8   // bit depth
  ihdr[9] = 2   // color type: RGB
  ihdr[10] = 0  // compression
  ihdr[11] = 0  // filter
  ihdr[12] = 0  // interlace

  // Raw image data: each row = filter byte (0) + R G B per pixel
  const rowSize = 1 + size * 3
  const raw = Buffer.allocUnsafe(size * rowSize)
  for (let y = 0; y < size; y++) {
    const rowStart = y * rowSize
    raw[rowStart] = 0 // filter: None
    for (let x = 0; x < size; x++) {
      raw[rowStart + 1 + x * 3] = r
      raw[rowStart + 2 + x * 3] = g
      raw[rowStart + 3 + x * 3] = b
    }
  }

  // Compress raw data
  const compressed = await new Promise((resolve, reject) => {
    const chunks = []
    const deflate = createDeflate({ level: 9 })
    deflate.on('data', c => chunks.push(c))
    deflate.on('end', () => resolve(Buffer.concat(chunks)))
    deflate.on('error', reject)
    deflate.end(raw)
  })

  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), // PNG signature
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

// Navy blue background with gold accent — matches theme_color #0A2240
// RGB for #0A2240
const [R, G, B] = [10, 34, 64]

await makePNG(192, R, G, B, 'public/icons/icon-192.png')
await makePNG(512, R, G, B, 'public/icons/icon-512.png')
console.log('Done!')
