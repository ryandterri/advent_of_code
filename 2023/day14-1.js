import fs from 'fs'

const data = fs.readFileSync('./data/input14.txt', { encoding: 'utf-8' })

const grid = data.split('\n').map(x => x.split('')).filter(x => x.length)
const columns = grid[0].map((_, i) => grid.map(x => x[i]).join(''))

console.log(columns)

const tilted_columns = []

for (const column of columns) {
  const tilted = column
    .split('#')
    .map(x => x
      .split('')
      .sort((a, b) => a > b ? -1 : 1)
      .join(''))
    .join('#')

  tilted_columns.push(tilted)

}

console.log(tilted_columns)

const rows = tilted_columns[0].split('').map((_, i) => tilted_columns.map(x => x[i]).join(''))

console.log(rows)

let total_load = 0
for (let i = rows.length; i > 0; i--) {

  const count = rows[rows.length - i].split('').filter(x => x === 'O').length
  // console.log(count, i)
  total_load += count * i
}

console.log(total_load)
