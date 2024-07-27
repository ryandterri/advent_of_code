import fs from 'fs'

const data = fs.readFileSync('./data/input16.txt', { encoding: 'utf-8' })
const grid = data.split('\n').map(x => x.split(''))
grid.pop()

const max_y_value = grid.length - 1
const max_x_value = grid[0].length - 1

const shift = (y, x, direction, energized, memo) => {
  const key = `${y}-${x}-${direction}`
  if (memo[key]) {
    return
  }
  memo[key] = true
  switch (direction) {
    case 'R':
      if (x < max_x_value) {
        traverse(y, x + 1, direction, energized, memo)
      }
      break
    case 'L':
      if (x > 0) {
        traverse(y, x - 1, direction, energized, memo)
      }
      break
    case 'U':
      if (y > 0) {
        traverse(y - 1, x, direction, energized, memo)
      }
      break
    case 'D':
      if (y < max_y_value) {
        traverse(y + 1, x, direction, energized, memo)
      }
      break
  }
}

const traverse = (y, x, direction, energized, memo) => {
  const modifier = grid[y][x]
  // console.log(y, x, modifier, direction)
  // console.clear()
  // console.log(energized.map(x => x.join('')).join('\n'))
  energized[y][x] = '#'
  // setTimeout(() => {
  switch (modifier) {
    case '.':
      shift(y, x, direction, energized, memo)
      break
    case '|':
      switch (direction) {
        case 'R':
        case 'L':
          shift(y, x, 'U', energized, memo)
          shift(y, x, 'D', energized, memo)
          break
        case 'U':
        case 'D':
          shift(y, x, direction, energized, memo)
          break
      }
      break
    case '-':
      switch (direction) {
        case 'L':
        case 'R':
          shift(y, x, direction, energized, memo)
          break
        case 'U':
        case 'D':
          shift(y, x, 'L', energized, memo)
          shift(y, x, 'R', energized, memo)
          break
      }
      break
    case '/':
      switch (direction) {
        case 'R':
          shift(y, x, 'U', energized, memo)
          break
        case 'L':
          shift(y, x, 'D', energized, memo)
          break
        case 'U':
          shift(y, x, 'R', energized, memo)
          break
        case 'D':
          shift(y, x, 'L', energized, memo)
          break
      }
      break
    case '\\':
      switch (direction) {
        case 'R':
          shift(y, x, 'D', energized, memo)
          break
        case 'L':
          shift(y, x, 'U', energized, memo)
          break
        case 'U':
          shift(y, x, 'L', energized, memo)
          break
        case 'D':
          shift(y, x, 'R', energized, memo)
          break
      }
  }
  // console.log(energized.map(x => x.join('')).join('\n'))
  let total = energized.map(x => x.filter(x => x === '#')).flat().length
  return total
  // }, 10)

}

let results = []
for (let i = 0; i < grid.length; i++) {
  let total = traverse(i, 0, 'R', Array.from({ length: max_y_value + 1 }, x => new Array(max_x_value + 1).fill(' ')), {})
  results.push(total)
  total = traverse(i, grid[0].length - 1, 'L', Array.from({ length: max_y_value + 1 }, x => new Array(max_x_value + 1).fill(' ')), {})
  results.push(total)
}
for (let i = 0; i < grid[0].length; i++) {
  let total = traverse(0, i, 'D', Array.from({ length: max_y_value + 1 }, x => new Array(max_x_value + 1).fill(' ')), {})
  results.push(total)
  total = traverse(grid.length - 1, i, 'U', Array.from({ length: max_y_value + 1 }, x => new Array(max_x_value + 1).fill(' ')), {})
  results.push(total)
}

console.log(results)
console.log(Math.max(...results))
