import fs from 'fs'

const data = fs.readFileSync('./data/input20.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
lines.pop()

const graph = {}
const conjunctions = []
for (const line of lines) {
  const line_split = line.split(' -> ')
  const type_string = line_split[0]
  const destinations = line_split[1].split(',').map(x => x.trim())

  let type, value
  if (type_string === 'broadcaster') {
    type = 'broadcaster'
    value = 'broadcaster'
    graph[value] = {
      type,
      destinations
    }
  }
  else if (type_string.startsWith('%')) {
    type = 'flip_flop'
    value = type_string.replace('%', '');
    graph[value] = {
      type,
      destinations,
      on: false
    }
  }
  else if (type_string.startsWith('&')) {
    type = 'conjunction'
    value = type_string.replace('&', '');
    conjunctions.push(value)
    graph[value] = {
      type,
      destinations,
      inputs: []
    }
  }
}

for (const key of Object.keys(graph)) {
  const node = graph[key]
  for (const destination of node.destinations) {
    if (conjunctions.includes(destination)) {
      graph[destination].inputs[key] = false
    }
  }
}

// console.log(graph)

let low_count = 0
let high_count = 0
let queue = []
const traverse = (index, high_signal, input) => {
  // console.log(input, high_signal ? '-high->' : '-low->', index)
  if (high_signal) {
    high_count++
  }
  else {
    low_count++
  }
  const node = graph[index]
  if (!node) {
    return
  }
  if (node.type !== 'broadcaster') {
    if (node.type === 'flip_flop') {
      if (high_signal) {
        return
      }
      else {
        node.on = !node.on
        if (node.on) {
          high_signal = true
        }
        else {
          high_signal = false
        }
      }
    }
    if (node.type === 'conjunction') {
      node.inputs[input] = high_signal
      const input_values = Object.values(node.inputs)
      if (input_values.some(x => x === false)) {
        high_signal = true
      }
      else {
        high_signal = false
      }
    }
  }

  for (const destination of node.destinations) {
    queue.unshift({
      index: destination,
      high_signal,
      input: index
    })
  }
}

let pairs = []
const found_repeating_pairs = () => {
  if (pairs.length && pairs.length % 2 === 0) {
    const first = pairs.slice(0, pairs.length / 2)
    const second = pairs.slice(pairs.length / 2)
    console.log(first, second)
    const first_string = first.map(([l, h]) => `${l}-${h}`).join(',')
    const second_string = second.map(([l, h]) => `${l}-${h}`).join(',')
    if (first_string === second_string) {
      return first
    }
  }
  return false
}
let found = false
let i = 1
while (found === false && i <= 1000) {
  // for (let i = 0; i < 4; i++) {
  //
  console.log('button push', i + 1)
  low_count = 0
  high_count = 0
  queue.push({ index: 'broadcaster', high_signal: false, input: 'button' })
  while (queue.length) {

    const { index, high_signal, input } = queue.pop()
    traverse(index, high_signal, input)
    // console.log(found_repeating_pairs())
  }
  pairs.push([low_count, high_count])
  console.log('========================\n\n')
  found = found_repeating_pairs()
  // }
  i++
}
if (!found) {
  found = pairs
}
const multiplier = 1000 / found.length
const remainder = 1000 % found.length
const lows = found.reduce((a, b) => a += b[0], 0)
const highs = found.reduce((a, b) => a += b[1], 0)
console.log(lows, highs, multiplier, remainder)


const total = (lows * multiplier) * (highs * multiplier)
console.log(total)


