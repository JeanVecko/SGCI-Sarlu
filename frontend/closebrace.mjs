import { readFileSync, writeFileSync } from 'fs'

const path = 'src/App.tsx'
let source = readFileSync(path, 'utf8')

const broken = "type: 'application/pdf' },"
const fixed = "type: 'application/pdf' },"

if (!source.includes(broken)) {
  console.log('pattern NOT found')
} else {
  source = source.replace(broken, fixed)
  writeFileSync(path, source)
  const line = source.split('\n')[117]
  console.log('open:', (line.match(/{/g) ?? []).length, 'close:', (line.match(/}/g) ?? []).length)
  console.log(line)
}
