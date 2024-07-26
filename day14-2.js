import fs from 'fs'

const data = fs.readFileSync('./data/input14.txt', { encoding: 'utf-8' })

const grid = data.split('\n').map(x => x.split('')).filter(x => x.length)
let rows = grid.map(x => x.join(''))

console.log(data)

const transpose = (rows) => {
  return rows[0].split('').map((_, i) => rows.map(x => x[i]).join(''))
}

const tilt = (rows, reverse) => {
  let result = []
  for (const row of rows) {
    const tilted = row
      .split('#')
      .map(x => x
        .split('')
        .sort((a, b) => {
          if (reverse) {
            return a < b ? -1 : 1
          }
          else {
            return a > b ? -1 : 1
          }
        })
        .join(''))
      .join('#')
    result.push(tilted)
  }
  return result
}

const cycle = (rows) => {
  // tilt north
  rows = transpose(rows)
  rows = tilt(rows)
  // tilt west
  rows = transpose(rows)
  // console.log(rows.join('\n'), '\n\n\n')
  rows = tilt(rows)
  // console.log(rows.join('\n'), '\n\n\n')
  // tilt south
  rows = transpose(rows)
  rows = tilt(rows, true)
  // tilt east
  rows = transpose(rows)
  // console.log(rows.join('\n'), '\n\n\n')
  rows = tilt(rows, true)
  // console.log(rows.join('\n'), '\n\n\n')
  return rows
}

const cycles = 1000000000

const map = {}
const cycle_solutions = []
let first_index
let found_index
for (let i = 0; i < cycles; i++) {
  rows = cycle(rows)
  cycle_solutions.push(rows)
  const hash = rows.join('')
  if (map[hash]) {
    first_index = map[hash]
    found_index = i
    break
  }
  map[hash] = i
}

const diff = found_index - first_index

const rest = cycles - (first_index + 1)
const remainder = rest % diff
console.log(first_index, found_index, diff, rest, remainder)

const final_solution = cycle_solutions[first_index + remainder]

let total_load = 0
for (let i = final_solution.length; i > 0; i--) {

  const count = final_solution[final_solution.length - i].split('').filter(x => x === 'O').length
  // console.log(count, i)
  total_load += count * i
}

console.log(total_load)

// console.log(rows.join('\n'))
