import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

const arr = data.split('')
arr.pop()

const numbers_to_sum = []
const shift = arr.length / 2
const max = arr.length
for (let i = 0; i < arr.length; i++) {
  const next_index = (i + shift) % max
  const a = parseInt(arr[i])
  const b = parseInt(arr[next_index])
  if (a === b) {
    numbers_to_sum.push(a)
  }
}

console.log(numbers_to_sum.reduce((a, b) => a += b))

process.exit()
