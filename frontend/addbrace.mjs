import { readFileSync, writeFileSync } from 'fs'

const path = 'src/App.tsx'
const source = readFileSync(path, 'utf8')

// La ligne CLI-001 contient: contract: { ... 'application/pdf' },
// Il manque l'accolade fermante de l'objet contract ET celle de l'enregistrement.
const target =
  "contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },"
const replacement =
  "contract: { name: 'contrat-horizon6-a204.pdf', size: 184320, type: 'application/pdf' },"

console.log('found:', source.includes(target))
const next = source.replace(target, replacement)
writeFileSync(path, next)

const line = next.split('\n')[117]
console.log('open:', (line.match(/{/g) ?? []).length, 'close:', (line.match(/}/g) ?? []).length)
console.log(line.trim())
