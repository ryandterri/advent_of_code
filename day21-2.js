import fs from 'fs'

const data = fs.readFileSync('./data/input21.txt', { encoding: 'utf-8' })
const grid = data.split('\n').map(x => x.split(''))
grid.pop()

const start_y_index = grid.findIndex(x => x.find(y => y === 'S'))
const start_x_index = grid[start_y_index].findIndex(x => x === 'S')

const start = { x: start_x_index, y: start_y_index }

// 26501365 = 65 + (202300 * 131)
// grid is 131 x 131
// 65 steps to get to edge of map
const n = (26501365 - ((grid.length - 1) / 2)) / grid.length
console.log(n)



// Down, Up, Left and Right respectively
const directions = [[1, 0], [-1, 0], [0, -1], [0, 1]]

// queue is a list of points to take steps from for each step
const queue = []

// stepped serves as a hash of each square and the least number of steps it took to get that square
let stepped = {}

queue.push(start)
let i = 0
while (queue.length) {
  i++
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

// The squares that we can reach and how many steps it took to get to them
const squares = Object.entries(stepped)


const even = n * n
const odd = ((n + 1) * (n + 1))
const odd_count = squares.filter(([key, value]) => value % 2 === 1).length
const odd_corners = squares.filter(([key, value]) => value % 2 === 1 && value > 65).length
const even_count = squares.filter(([key, value]) => value % 2 === 0).length
const even_corners = squares.filter(([key, value]) => value % 2 === 0 && value > 65).length

const result = (odd * odd_count) + (even * even_count) - ((n + 1) * odd_corners) + (n * even_corners)
console.log(result)


