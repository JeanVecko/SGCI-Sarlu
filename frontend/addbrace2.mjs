import { readFileSync, writeFileSync } from 'fs'

const path = 'src/App.tsx'
const source = readFileSync(path, 'utf8')

const marker = 'contrat-horizon6-a204.pdf'
const at = source.indexOf(marker)
console.log('after marker:', JSON.stringify(source.slice(at + marker.length, at + marker.length + 60)))

const lineStart = source.lastIndexOf('\n', at) + 1
const lineEnd = source.indexOf('\n', at)

const rebuilt =
  "  { id: 'CLI-001', buildingId: 'IMM-001', name: 'Nadia Bernard', apartmentNumber: 'A-204', " +
  "monthlyAmount: 1200, guaranteePaid: 2400, dueDate: '2026-10-05', " +
  "contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },"

const next = source.slice(0, lineStart) + rebuilt + source.slice(lineEnd)
writeFileSync(path, next)
console.log('NEW:', next.split('\n')[117])
