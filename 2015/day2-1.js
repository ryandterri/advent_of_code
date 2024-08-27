import fs from 'fs'

const data = fs.readFileSync('./data/input2.txt', { encoding: 'utf-8' })
const presents = data.split('\n')
presents.pop()

let result = 0
for (const present of presents) {
  const dimensions = present.split('x').map(x => parseInt(x))
  const sides = []
  sides.push(dimensions[0] * dimensions[1])
  sides.push(dimensions[1] * dimensions[2])
  sides.push(dimensions[0] * dimensions[2])

  const smallest = Math.min(...sides)
  const paper_needed = sides.map(x => 2 * x).reduce((a, b) => a + b)
  result += (smallest + paper_needed)
}

console.log(result)

