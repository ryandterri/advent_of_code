import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', { encoding: 'utf-8' })
const chars = data.split('')

let floor = 0
let i = 1
for (const current of chars) {
  if (current === '(') {
    floor++
  }
  else {
    floor--
  }
  if (floor === -1) {
    break
  }
  else {
    i++
  }
}


console.log(i)
