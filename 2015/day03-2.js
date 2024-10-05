import fs from 'fs'

const data = fs.readFileSync('./data/input3.txt', { encoding: 'utf-8' })
const directions = data.split('')

const map = {
  '0-0': 2
}

const santas = [[0, 0], [0, 0]]
for (let i = 0; i < directions.length; i++) {
  const direction = directions[i]
  const santa = santas[i % 2]
  switch (direction) {
    case '^':
      santa[1]++
      break
    case 'v':
      santa[1]--
      break
    case '<':
      santa[0]--
      break
    case '>':
      santa[0]++
      break
  }
  if (map[santa.join('-')]) {
    map[santa.join('-')]++
  }
  else {
    map[santa.join('-')] = 1
  }
}

console.log(Object.keys(map).length)
