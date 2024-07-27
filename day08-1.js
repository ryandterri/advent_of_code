import fs from 'fs'

const file = fs.readFileSync('./data/input8.txt', { encoding: 'utf-8' })

const split = file.split('\n\n')

const sequence = split[0].split('')
const number_sequence = sequence.map(x => x === 'L' ? 0 : 1)

const instruction_lines = split[1].split('\n')
instruction_lines.pop()

const instructions = instruction_lines.map(x => {
  const split = x.split('=')
  const origin = split[0].trim()
  const map = split[1].split(',').map(x => x.trim().replace('(', '').replace(')', ''))
  return {
    origin, map
  }
})

const start = 'AAA'
const end = 'ZZZ'

const instruction_map = instructions.reduce((a, b) => {
  a[b.origin] = b.map
  return a
}, {})


let current = start
let steps = 0
while (current !== end) {
  for (const index of number_sequence) {
    const current_map = instruction_map[current]
    current = current_map[index]
    console.log(index, current_map, current)
    steps++
    // if (current === end) {
    //   break
    // }
  }
}

console.log(steps)
