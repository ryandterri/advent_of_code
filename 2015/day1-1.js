
import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', { encoding: 'utf-8' })
const chars = data.split('')

const ups = chars.filter(x => x === '(').length
const downs = chars.filter(x => x === ')').length
console.log(ups - downs)
