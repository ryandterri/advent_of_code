import fs from 'fs'

const data = fs.readFileSync('./data/input7.txt', { encoding: 'utf-8' })
const instructions = data.split('\n')
instructions.pop()

const map = {}

for (const instruction of instructions) {
  const parts = instruction.split('->')
  const input = parts[0].trim()
  const output = parts[1].trim()
  const input_parts = input.split(' ')
  if (input_parts.length === 1) {
    if (isNaN(parseInt(input_parts[0]))) {
      map[output] = { single_input: [input_parts[0]] }
    }
    else {
      map[output] = { final: parseInt(input_parts[0]) }
    }
  }
  else if (input_parts.length === 2) {
    map[output] = { operator: 'NOT' }
    if (isNaN(parseInt(input_parts[1]))) {
      map[output].right_input = input_parts[1]
    }
    else {
      map[output].right_value = parseInt(input_parts[1])
    }
  }
  else {
    map[output] = {
      operator: input_parts[1]
    }

    if (isNaN(parseInt(input_parts[0]))) {
      map[output].left_input = input_parts[0]
    }
    else {
      map[output].left_value = parseInt(input_parts[0])
    }
    if (isNaN(parseInt(input_parts[2]))) {
      map[output].right_input = input_parts[2]
    }
    else {
      map[output].right_value = parseInt(input_parts[2])
    }
  }
}

function find_value(key) {
  let value = map[key]
  if (value.final !== undefined) {
    return value.final
  }

  if (value.single_input) {
    value.final = find_value(value.single_input)
    return value.final
  }

  if (value.left_input && value.left_value === undefined) {
    value.left_value = find_value(value.left_input)
  }
  if (value.right_input && value.right_value === undefined) {
    value.right_value = find_value(value.right_input)
  }

  if (value.operator) {
    switch (value.operator) {
      case 'AND':
        value.final = value.left_value & value.right_value
        break
      case 'OR':
        value.final = value.left_value | value.right_value
        break
      case 'LSHIFT':
        value.final = value.left_value << value.right_value
        break
      case 'RSHIFT':
        value.final = value.left_value >> value.right_value
        break
      case 'NOT':
        value.final = ~value.right_value
        break
    }
    return value.final
  }

}

console.log(find_value('a'))
// console.log(map)

