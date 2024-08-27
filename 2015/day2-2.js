import fs from 'fs'

const data = fs.readFileSync('./data/input2.txt', { encoding: 'utf-8' })
const presents = data.split('\n')

presents.pop()

let result = 0
for (const present of presents) {
  const dimensions = present.split('x').map(x => parseInt(x))
  dimensions.sort((a, b) => a < b ? -1 : 1)
  const wrap_ribbon = (2 * dimensions[0]) + (2 * dimensions[1])
  const bow_ribbon = dimensions.reduce((a, b) => a * b)

  result += (wrap_ribbon + bow_ribbon)
}

console.log(result)

