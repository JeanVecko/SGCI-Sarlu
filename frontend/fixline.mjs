import { readFileSync, writeFileSync } from 'fs'

const path = 'src/App.tsx'
const source = readFileSync(path, 'utf8')

const oldLine =
  "  { id: 'CLI-001', buildingId: 'IMM-001', name: 'Nadia Bernard', apartmentNumber: 'A-204', monthlyAmount: 1200, guaranteePaid: 2400, dueDate: '2026-10-05', contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },"
const newLine =
  "  { id: 'CLI-001', buildingId: 'IMM-001', name: 'Nadia Bernard', apartmentNumber: 'A-204', monthlyAmount: 1200, guaranteePaid: 2400, dueDate: '2026-10-05', contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },"

const index = source.indexOf(oldLine)
console.log('exact line found at:', index)

if (index !== -1) {
  writeFileSync(path, source.slice(0, index) + newLine + source.slice(index + oldLine.length))
  const check = readFileSync(path, 'utf8')
  const line = check.split('\n')[117]
  console.log('open:', (line.match(/{/g) ?? []).length, 'close:', (line.match(/}/g) ?? []).length)
  console.log(line.trim())
}
