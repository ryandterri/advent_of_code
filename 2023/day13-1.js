import fs from 'fs'

const data = fs.readFileSync('./data/input13.txt', { encoding: 'utf-8' })

const patterns = data.split('\n\n')

const find_reflection = (array, multiplier) => {
  for (let i = 1; i < array.length; i++) {
    let right_index = i
    let left_index = i - 1
    let found = true
    while (right_index < array.length && left_index >= 0) {
      const left = array[left_index]
      const right = array[right_index]
      if (left !== right) {
        found = false
        break
      }
      left_index--
      right_index++
    }
    if (found) {
      const adder = multiplier * i
      return adder
    }
  }
  return 0
}

let total = 0
for (const pattern of patterns) {
  const grid = pattern.split('\n').filter(x => x != '').map(x => x.split(''))
  const rows = grid.map(x => x.join(''))
  const columns = grid[0].map((_, i) => grid.map(x => x[i]).join(''))


  total += find_reflection(rows, 100)
  total += find_reflection(columns, 1)

}

console.log(total)
