import { readFileSync, writeFileSync } from 'fs'

const path = 'src/App.tsx'
const source = readFileSync(path, 'utf8')

const startMarker = 'const initialRealEstateClients: RealEstateClient[] = ['
const start = source.indexOf(startMarker)
const endMarker = '\n]'
const end = source.indexOf(endMarker, start) + endMarker.length

const block = [
  startMarker,
  "  { id: 'CLI-001', buildingId: 'IMM-001', name: 'Nadia Bernard', apartmentNumber: 'A-204', monthlyAmount: 1200, guaranteePaid: 2400, dueDate: '2026-10-05', contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },",
  "  { id: 'CLI-002', buildingId: 'IMM-002', name: 'Thomas Leroy', apartmentNumber: 'B-107', monthlyAmount: 950, guaranteePaid: 1800, dueDate: '2026-10-08' },",
  "  { id: 'CLI-003', buildingId: 'IMM-001', name: 'Marie Kabeya', apartmentNumber: 'C-312', monthlyAmount: 1500, guaranteePaid: 3000, dueDate: '2026-09-30' },",
  "  { id: 'CLI-004', buildingId: 'IMM-003', name: 'Joseph Ilunga', apartmentNumber: 'A-101', monthlyAmount: 800, guaranteePaid: 1600, dueDate: '2026-10-12' },",
  "  { id: 'CLI-005', buildingId: 'IMM-004', name: 'Sarah Nkulu', apartmentNumber: 'D-204', monthlyAmount: 700, guaranteePaid: 1400, dueDate: '2026-09-28' },",
  ']',
].join('\n')

const next = source.slice(0, start) + block + source.slice(end)
writeFileSync(path, next)
console.log('replaced chars:', end - start, '->', block.length)
console.log(next.slice(start, start + block.length).split('\n')[1])
