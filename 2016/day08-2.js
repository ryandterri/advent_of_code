import fs from 'node:fs'

const data = fs.readFileSync('./data/input8.txt', 'utf-8')

const instructions = data.split('\n')
instructions.pop()

const length = 50
const height = 6
const grid = Array.from({ length: 6 }, () => new Array(50).fill('.'))

const print_grid = () => {
  console.log()
  console.log(grid.map(x => x.join('')).join('\n'))
  console.log()
}

for (const instruction of instructions) {
  const split = instruction.split(' ')
  const first = split[0]

  if (first === 'rect') {
    const [x, y] = split[1].split('x')
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        grid[j][i] = 'x'
      }
    }
    print_grid()
  }
  else {
    const [dir, index] = split[2].split('=')
    const quantity = parseInt(split[4])
    const start = parseInt(index)
    if (dir === 'x') {
      const current = []
      for (let j = 0; j < grid.length; j++) {
        current.push(grid[j][start])
      }
      for (let i = 0; i < current.length; i++) {
        const new_position = (i + quantity) % height
        grid[new_position][start] = current[i]
      }
      console.log(instruction)
      print_grid()
    }
    else {
      const current = []
      for (let j = 0; j < grid[0].length; j++) {
        current.push(grid[start][j])
      }
      for (let i = 0; i < current.length; i++) {
        const new_position = (i + quantity) % length
        grid[start][new_position] = current[i]
      }
      console.log(instruction)
      print_grid()
    }
  }
}

console.log(grid.map(x => x.join('')).join('').replaceAll('.', '').length)
