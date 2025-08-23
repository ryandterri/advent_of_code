import fs from 'fs'

const data = fs.readFileSync('./data/input2.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()

let checksum = 0
for (const line of lines) {
  const nums = line.split('\t').map(x => parseInt(x))
  nums.sort((a, b) => a - b)
  let found = false
  let i = nums.length - 1
  while (!found) {
    const num = nums[i]
    for (let j = i - 1; j >= 0; j--) {
      const compare = nums[j]
      const remainder = num % compare
      if (remainder === 0) {
        checksum += (num / compare)
        found = true
      }
    }
    i--
  }
}

console.log(checksum)

