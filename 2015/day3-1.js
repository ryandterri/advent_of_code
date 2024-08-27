import fs from 'fs'

const data = fs.readFileSync('./data/input3.txt', { encoding: 'utf-8' })
const directions = data.split('')

const map = {
  '0-0': 1
}

const current = [0, 0]
for (const direction of directions) {
  switch (direction) {
    case '^':
      current[1]++
      break
    case 'v':
      current[1]--
      break
    case '<':
      current[0]--
      break
    case '>':
      current[0]++
      break
  }
  if (map[current.join('-')]) {
    map[current.join('-')]++
  }
  else {
    map[current.join('-')] = 1
  }
}

console.log(Object.keys(map).length)
