import fs from 'fs'

const start = new Date()
const data = fs.readFileSync('./data/input16.txt', { encoding: 'utf-8' })
const grid = data.split('\n').map(x => x.split(''))
grid.pop()

const max_y_value = grid.length - 1
const max_x_value = grid[0].length - 1

const energized = Array.from({ length: max_y_value + 1 }, x => new Array(max_x_value + 1).fill(' '))

const memo = {}

const shift = (y, x, direction) => {
  const key = `${y}-${x}-${direction}`
  if (memo[key])
    return
  memo[key] = true
  switch (direction) {
    case 'R':
      if (x < max_x_value) {
        traverse(y, x + 1, direction)
      }
      break
    case 'L':
      if (x > 0) {
        traverse(y, x - 1, direction)
      }
      break
    case 'U':
      if (y > 0) {
        traverse(y - 1, x, direction)
      }
      break
    case 'D':
      if (y < max_y_value) {
        traverse(y + 1, x, direction)
      }
      break
  }
}

const traverse = (y, x, direction) => {
  const modifier = grid[y][x]
  // console.log(y, x, modifier, direction)
  // console.clear()
  // console.log(energized.map(x => x.join('')).join('\n'))
  energized[y][x] = '#'
  // setTimeout(() => {
  switch (modifier) {
    case '.':
      shift(y, x, direction)
      break
    case '|':
      switch (direction) {
        case 'R':
        case 'L':
          shift(y, x, 'U')
          shift(y, x, 'D')
          break
        case 'U':
        case 'D':
          shift(y, x, direction)
          break
      }
      break
    case '-':
      switch (direction) {
        case 'L':
        case 'R':
          shift(y, x, direction)
          break
        case 'U':
        case 'D':
          shift(y, x, 'L')
          shift(y, x, 'R')
          break
      }
      break
    case '/':
      switch (direction) {
        case 'R':
          shift(y, x, 'U')
          break
        case 'L':
          shift(y, x, 'D')
          break
        case 'U':
          shift(y, x, 'R')
          break
        case 'D':
          shift(y, x, 'L')
          break
      }
      break
    case '\\':
      switch (direction) {
        case 'R':
          shift(y, x, 'D')
          break
        case 'L':
          shift(y, x, 'U')
          break
        case 'U':
          shift(y, x, 'L')
          break
        case 'D':
          shift(y, x, 'R')
          break
      }
  }
  // }, 1)

}

traverse(0, 0, "R")

console.log(energized.map(x => x.join('')).join('\n'))

console.log(energized.map(x => x.filter(x => x === '#')).flat().length)

console.log(new Date() - start)
