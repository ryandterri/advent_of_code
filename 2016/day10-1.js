import fs from 'node:fs'

const data = fs.readFileSync('./data/input10.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()

const map = {}
for (const line of lines) {
  const parts = line.split(' ')

  if (parts[0] === 'value') {
    const value = parseInt(parts[1])
    const bot = parseInt(parts[5])
    if (!map[bot]) {
      map[bot] = {
        key: bot,
        values: [value],
        output: []
      }
    }
    else {
      map[bot].values.push(value)
    }
  }
  else {
    const bot = parseInt(parts[1])
    const low = {
      value: parseInt(parts[6]),
      type: parts[5]
    }
    const high = {
      value: parseInt(parts[11]),
      type: parts[10]
    }
    if (map[bot]) {
      map[bot].low = low
      map[bot].high = high
    }
    else {
      map[bot] = {
        key: bot,
        values: [],
        output: [],
        low,
        high
      }
    }
  }
}

const values_to_find = [61, 17]
let found = Object.values(map).find((value) => value.values.length === 2)
while (!values_to_find.every(x => found.values.includes(x))) {
  found.values.sort((a, b) => a - b)
  if (found.low.type === 'bot') {
    map[found.low.value].values.push(found.values[0])
  }
  else {
    map[found.low.value].output.push(found.values[0])
  }
  if (found.high.type === 'bot') {
    map[found.high.value].values.push(found.values[1])
  }
  else {
    map[found.high.value].output.push(found.values[1])
  }
  found.values = []
  found = Object.values(map).find((value) => value.values.length === 2)
}

console.log(found)

