import fs from 'fs'

const data = fs.readFileSync('./data/input21.txt', { encoding: 'utf-8' })
const grid = data.split('\n').map(x => x.split(''))
grid.pop()

const start_y_index = grid.findIndex(x => x.find(y => y === 'S'))
const start_x_index = grid[start_y_index].findIndex(x => x === 'S')

const start = { x: start_x_index, y: start_y_index }

const steps_left = 64


console.log(start, steps_left)

// Down, Up, Left and Right respectively
const directions = [[1, 0], [-1, 0], [0, -1], [0, 1]]

// queue is a list of points to take steps from for each step
const queue = []

// stepped serves as a hash of each square and the least number of steps it took to get that square
let stepped = {}

queue.push(start)
for (let i = 1; i <= steps_left; i++) {
  console.log('step: ', i)
  const new_points = []
  while (queue.length) {
    const { x, y } = queue.pop()
    for (const [x_shift, y_shift] of directions) {
      const new_point = { x: x + x_shift, y: y + y_shift }
      if (grid[new_point.y] && grid[new_point.y][new_point.x]) {
        const value = grid[new_point.y][new_point.x]
        // console.log(x, y, new_point, value)
        if (value !== '#') {
          const key = `${new_point.x}-${new_point.y}`
          // if we already found this in fewer steps then ignore
          if (!stepped[key]) {
            new_points.push(new_point)
            stepped[key] = i
          }
        }
      }
    }
  }
  queue.push(...new_points)
}

// The squares that we can reach in even number of steps are all reachable in 64 steps
const squares = Object.entries(stepped).filter(([key, value]) => value % 2 === 0)

for (const [key, value] of squares) {
  const x = key.split('-')[0]
  const y = key.split('-')[1]
  grid[y][x] = '0'
}
console.log(grid.map(x => x.join('')).join('\n'))
console.log(squares.length)
