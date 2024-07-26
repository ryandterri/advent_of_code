import fs from 'fs'

const data = fs.readFileSync('./data/input13.txt', { encoding: 'utf-8' })

const patterns = data.split('\n\n')

const find_reflection = (array, multiplier) => {
  for (let i = 1; i < array.length; i++) {
    let right_index = i
    let left_index = i - 1
    let item_diff_count = 0
    let valid = true
    while (right_index < array.length && left_index >= 0) {
      const left = array[left_index]
      const right = array[right_index]
      if (left !== right) {
        let char_diff = 0
        for (let j = 0; j < left.length; j++) {
          if (left[j] !== right[j]) {
            char_diff++
            // console.log(i, left[j], right[j], char_diff, left, right, item_diff_count)
            if (char_diff > 1) {
              break
            }
          }
        }
        if (char_diff === 1) {
          item_diff_count++
          console.log(left, right)
          if (item_diff_count > 1) {
            break
          }
        }
        else if (char_diff > 1) {
          valid = false
        }
      }
      left_index--
      right_index++
    }
    if (item_diff_count === 1 && valid) {
      // console.log(i, multiplier, array, item_diff_count)
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
