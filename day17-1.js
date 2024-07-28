import fs from 'fs'

const data = fs.readFileSync('./data/input17.txt', { encoding: 'utf-8' })
//
const grid = data
  .split('\n')
  .map(x => x
    .split('')
    .map(x => parseInt(x)))
grid.pop()

const end_x = grid[0].length - 1
const end_y = grid.length - 1

