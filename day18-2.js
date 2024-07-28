import fs from 'fs'

const data = fs.readFileSync('./data/input18.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
lines.pop()

const coordinates = []
let x = 0
let y = 0
let outside_points = 0
const directions = ['R', 'D', 'L', 'U']

for (const line of lines) {
  const parts = line.split(' ')

  const actual_instructions = parts[2].replace('(', '').replace(')', '').replace('#', '')
  const value = parseInt(actual_instructions.slice(0, 5), 16)
  const direction = directions[actual_instructions.slice(5)]

  console.log(direction, value, actual_instructions)

  outside_points += value
  switch (direction) {
    case 'R':
      x += value
      break
    case 'L':
      x -= value
      break
    case 'U':
      y += value
      break
    case 'D':
      y -= value
      break
  }
  coordinates.push([x, y])
}

console.log(coordinates)

let sum1 = 0
let sum2 = 0

for (let i = 0; i < coordinates.length - 1; i++) {
  sum1 += coordinates[i][0] * coordinates[i + 1][1]
  sum2 += coordinates[i][1] * coordinates[i + 1][0]
}

sum1 += coordinates[coordinates.length - 1][0] * coordinates[0][1]
sum2 += coordinates[coordinates.length - 1][1] * coordinates[0][0]

console.log(sum1, sum2)

const area = 1 / 2 * (Math.abs(sum1 - sum2))
// picks theorum to get the number of inside points
const inside_points = area + 1 - (outside_points / 2)
console.log(inside_points + outside_points)
