import { readFileSync } from 'fs'

const source = readFileSync('frontend/src/App.tsx', 'utf8')
const line = source.split('\n')[117]
const opens = (line.match(/{/g) ?? []).length
const closes = (line.match(/}/g) ?? []).length
console.log('line 118 brace balance:', opens, 'open vs', closes, 'close')
console.log(JSON.stringify(line))
