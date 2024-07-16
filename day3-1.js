import fs from 'fs'

const data = fs.readFileSync('./data/input3.txt', { encoding: 'utf-8' })
const lines = data.split('\n')

let previous_numbers, previous_symbols
const valid_numbers = []
for (let i = 0; i < lines.length; i++) {
  const current_line = lines[i]
  console.log(current_line)

  const number_matches = [...current_line.matchAll(/[0-9]+/g)]
  const current_numbers = number_matches.map(x => ({
    value: x[0],
    start: x.index - 1,
    end: x.index + x[0].length
  }))
  console.log(current_numbers)

  const symbol_matches = [...current_line.matchAll(/(?!([0-9]|\.)+)./g)]
  const current_symbols = symbol_matches.map(x => ({
    value: x[0],
    index: x.index
  }))
  console.log(current_symbols)

  for (const current_number of current_numbers) {
    current_number.found = current_symbols.find(x => x.index >= current_number.start && x.index <= current_number.end)
    if (!current_number.found && previous_symbols) {
      current_number.found = previous_symbols.find(x => x.index >= current_number.start && x.index <= current_number.end)
    }
  }

  if (previous_numbers) {
    for (const previous_number of previous_numbers.filter(x => !x.found)) {
      previous_number.found = current_symbols.find(x => x.index >= previous_number.start && x.index <= previous_number.end)
    }
  }

  console.log(current_numbers)
  console.log(previous_numbers)

  valid_numbers.push(...current_numbers.filter(x => x.found).map(x => parseInt(x.value)))
  if (previous_numbers)
    valid_numbers.push(...previous_numbers.filter(x => x.found).map(x => parseInt(x.value)))

  previous_numbers = current_numbers.filter(x => !x.found)
  previous_symbols = current_symbols
}

console.log(valid_numbers)
console.log(valid_numbers.reduce((a, b) => a += b, 0))
