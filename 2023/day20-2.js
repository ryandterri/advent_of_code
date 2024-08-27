import fs from 'fs'

const data = fs.readFileSync('./data/input20.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
lines.pop()

const graph = {}
const conjunctions = []
// Construct graph
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

let next_to_last
for (const key of Object.keys(graph)) {
  const node = graph[key]
  for (const destination of node.destinations) {
    // Find 2nd to last input
    if (destination === 'rx') {
      next_to_last = key
    }
    if (conjunctions.includes(destination)) {
      graph[destination].inputs[key] = false
    }
  }
}

// find adjacent items for 2nd to last input
// each of these need to be high pulse to make a low go to rx
let adjacent_counts = {}
for (const key of Object.keys(graph)) {
  const node = graph[key]
  for (const destination of node.destinations) {
    if (destination === next_to_last) {
      adjacent_counts[key] = {
        found: false,
        count: 0
      }
    }
  }
}


let low_count = 0
let high_count = 0
let queue = []
let i = 1
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
    if (destination === next_to_last) {
      // if adjacent item gets a high pulse store the number of button presses needed to get there
      if (high_signal) {
        adjacent_counts[index].count = i
        adjacent_counts[index].found = true
      }
    }
    queue.unshift({
      index: destination,
      high_signal,
      input: index
    })
  }
}


// while adjacent counts have not all been found yet
while (Object.values(adjacent_counts).some(x => !x.found)) {
  low_count = 0
  high_count = 0
  queue.push({ index: 'broadcaster', high_signal: false, input: 'button' })
  while (queue.length) {
    const { index, high_signal, input } = queue.pop()
    traverse(index, high_signal, input)
  }
  i++
}
console.log('button presses need to find adjacent counts', i)
console.log('adjacent counts: ', adjacent_counts)

const gcd = (a, b) => {
  return !b ? a : gcd(b, a % b)
}
const lcm = (a, b) => {
  return (a * b) / gcd(a, b)
}

// Find the lowest common multiple of the adjacent counts
const counts = Object.values(adjacent_counts).map(x => x.count)
let multiple = counts[0]
for (const count of counts) {
  multiple = lcm(multiple, count)
}

console.log(multiple)

