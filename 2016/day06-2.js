import fs from 'node:fs'

const data = fs.readFileSync('./data/input6.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()
const grid = lines.map(x => x.split(''))

for (let i = 0; i < grid[0].length; i++) {
  let map = {}
  for (let j = 0; j < grid.length; j++) {
    let key = grid[j][i]
    if (map[key]) {
      map[key]++
    }
    else {
      map[key] = 1
    }
  }
  const entries = Object.entries(map)
  entries.sort((a, b) => a[1] - b[1])
  console.log(entries[0])
}
