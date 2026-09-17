import { readFileSync, writeFileSync } from 'fs'

const path = 'src/App.tsx'
let source = readFileSync(path, 'utf8')

const broken = "dueDate: '2026-10-05', contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },"
const fixed = "dueDate: '2026-10-05', contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },"

if (!source.includes(broken)) {
  console.log('pattern not found')
} else {
  source = source.replace(broken, fixed)
  writeFileSync(path, source)
  const line = source.split('\n')[117]
  console.log('open:', (line.match(/{/g) ?? []).length, 'close:', (line.match(/}/g) ?? []).length)
  console.log(line)
}
