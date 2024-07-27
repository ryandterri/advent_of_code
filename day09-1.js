
import fs from 'fs'

const file = fs.readFileSync('./data/input9.txt', { encoding: 'utf-8' })

const split = file.split('\n')
split.pop()

let total = 0
for (const line of split) {
  const matrix = []
  const sequence = line.split(' ').map(x => parseInt(x))
  matrix.push(sequence)

  let current = matrix[matrix.length - 1]
  while (current.some(x => x !== 0)) {
    let next = []
    for (let i = 1; i < current.length; i++) {
      next.push(current[i] - current[i - 1])
    }
    matrix.push(next)
    current = next
  }

  let next = 0
  for (const array of matrix) {
    next += array[array.length - 1]
  }

  // console.log(next)
  total += next

}

console.log(total)
