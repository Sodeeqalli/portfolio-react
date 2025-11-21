import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const sourceSvg = join(publicDir, 'favicon.svg')

const targets = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
]

const svgContent = readFileSync(sourceSvg)

targets.forEach(({ size, name }) => {
  const renderer = new Resvg(svgContent, {
    fitTo: {
      mode: 'width',
      value: size,
    },
  })

  const png = renderer.render()
  writeFileSync(join(publicDir, name), png.asPng())
  console.log(`Generated ${name}`)
})
