import fs from 'fs'

const data = fs.readFileSync('./data/input2.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()

let checksum = 0
for (const line of lines) {
  const nums = line.split('\t').map(x => parseInt(x))
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  const diff = max - min
  console.log(min, max, diff)
  checksum += diff
}

console.log(checksum)

