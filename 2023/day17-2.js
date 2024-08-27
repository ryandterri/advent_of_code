import fs from 'fs'
import { MinPriorityQueue } from '@datastructures-js/priority-queue'
const start = new Date()
const node_queue = new MinPriorityQueue((node) => node.min_heat)

const data = fs.readFileSync('./data/input17.txt', { encoding: 'utf-8' })
//
const grid = data
  .split('\n')
  .map(x => x.split('').map(x => parseInt(x)))
grid.pop()

// console.log(grid)

const graph = {}
const get_key = (x, y, direction) => {
  return `${x},${y}-${direction}`
}
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    const vertical_key = get_key(x, y, 'v')
    const horizontal_key = get_key(x, y, 'h')
    graph[vertical_key] = { min_heat: Infinity, neighbors: {} }
    graph[horizontal_key] = { min_heat: Infinity, neighbors: {} }
    for (let i = 4; i <= 10; i++) {
      if (grid[y + i]) {
        let total = 0
        for (let j = 1; j <= i; j++) {
          total += grid[y + j][x]
        }
        graph[vertical_key].neighbors[get_key(x, y + i, 'h')] = total
      }
      if (grid[y - i]) {
        let total = 0
        for (let j = 1; j <= i; j++) {
          total += grid[y - j][x]
        }
        graph[vertical_key].neighbors[get_key(x, y - i, 'h')] = total
      }
      if (grid[y][x + i]) {
        let total = 0
        for (let j = 1; j <= i; j++) {
          total += grid[y][x + j]
        }
        graph[horizontal_key].neighbors[get_key(x + i, y, 'v')] = total
      }
      if (grid[y][x - i]) {
        let total = 0
        for (let j = 1; j <= i; j++) {
          total += grid[y][x - j]
        }
        graph[horizontal_key].neighbors[get_key(x - i, y, 'v')] = total
      }
    }
  }
}

const end_y = grid.length - 1
const end_x = grid[0].length - 1
const last_vertical_key = get_key(end_x, end_y, 'v')
const last_horizontal_key = get_key(end_x, end_y, 'h')


graph['0,0-v'].min_heat = 0
graph['0,0-h'].min_heat = 0
const visited = {}
const unvisited = Object.keys(graph)

node_queue.push({ key: '0,0-v', min_heat: graph['0,0-v'].min_heat })
node_queue.push({ key: '0,0-h', min_heat: graph['0,0-h'].min_heat })



while (!node_queue.isEmpty()) {
  const { key } = node_queue.pop()
  const node = graph[key]
  const heat = node.min_heat
  visited[key] = true
  const neighbors = node.neighbors

  for (const [neighbor_key, neighbor_heat] of Object.entries(neighbors)) {
    const neighbor_node = graph[neighbor_key]
    if (!visited[neighbor_key]) {
      const total_heat = heat + neighbor_heat
      if (neighbor_node.min_heat > total_heat) {
        neighbor_node.min_heat = total_heat
        neighbor_node.previous = key
        node_queue.push({ key: neighbor_key, min_heat: total_heat })
      }
    }
  }

  if (node_queue.isEmpty() && unvisited.length) {
    const key = unvisited.pop()
    node_queue.push({ key, min_heat: graph[key].min_heat })
  }
}
// console.log(graph)


// console.log(graph[last_horizontal_key], graph[last_vertical_key])

const path = []
let key = last_horizontal_key
while (graph[key]) {
  const x = key.split(',')[0]
  const y = key.split(',')[1][0]
  path.push([key, graph[key].min_heat, x, y])
  key = graph[key].previous

}

console.log(path)
// console.log(grid.map(x => x.join('')).join('\n'))
console.log(Math.min(graph[last_vertical_key].min_heat, graph[last_horizontal_key].min_heat))

console.log(new Date() - start)
