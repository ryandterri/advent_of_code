
import fs from 'fs'

const file = fs.readFileSync('./data/input10.txt', { encoding: 'utf-8' })

const split = file.split('\n')
split.pop()

const start_y_index = split.findIndex(x => x.includes('S'))
const start_x_index = split[start_y_index].split('').indexOf('S')
// console.log(start_y_index, start_x_index)


const valid_top_values = ['|', 'F', '7']
const valid_right_values = ['7', '-', 'J']
const valid_bottom_values = ['|', 'L', 'J']
const valid_left_values = ['-', 'F', 'L']

const get_directions = ({ x, y }) => {
  return {
    top: { value: y - 1 < 0 ? undefined : split[y - 1][x], y: y - 1, x: x, type: 'top' },
    right: { value: split[y][x + 1], y: y, x: x + 1, type: 'right' },
    bottom: { value: y + 1 > split.length - 1 ? undefined : split[y + 1][x], y: y + 1, x: x, type: 'bottom' },
    left: { value: split[y][x - 1], y: y, x: x - 1, type: 'left' }
  }
}

const find_first = ({ value, x, y }) => {
  const result = []

  const { top, right, bottom, left } = get_directions({ x, y })

  if (valid_top_values.includes(top.value)) {
    result.push(top)
  }
  if (valid_right_values.includes(right.value)) {
    result.push(right)
  }
  if (valid_bottom_values.includes(bottom.value)) {
    result.push(bottom)
  }
  if (valid_left_values.includes(left.value)) {
    result.push(left)
  }
  return result
}

const find_next = ({ value, x, y, type }) => {
  const { top, right, bottom, left } = get_directions({ x, y })
  switch (value) {
    case '|':
      if (type === 'top') {
        return top
      }
      else {
        return bottom
      }
    case 'F':
      if (type === 'top') {
        return right
      }
      else {
        return bottom
      }
    case '7':
      if (type === 'right') {
        return bottom
      }
      else {
        return left
      }
    case '-':
      if (type === 'right') {
        return right
      }
      else {
        return left
      }
    case 'J':
      if (type === 'bottom') {
        return left
      }
      else {
        return top
      }
    case 'L':
      if (type === 'bottom') {
        return right
      }
      else {
        return top
      }
  }
}

const result = find_first({ value: 'S', x: start_x_index, y: start_y_index })

let path_1_next = result[0]
let path_2_next = result[1]

let step = 1
while (path_1_next.x !== path_2_next.x || path_1_next.y !== path_2_next.y) {
  path_1_next = find_next(path_1_next)
  path_2_next = find_next(path_2_next)
  step++
}


console.log(step)




