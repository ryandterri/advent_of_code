
import fs from 'fs'

const data = fs.readFileSync('./data/input3.txt', { encoding: 'utf-8' })
const lines = data.split('\n')

let previous_numbers, previous_stars
const gear_ratios = []
for (let i = 0; i < lines.length; i++) {
  const current_line = lines[i]
  console.log('current line', i, current_line)

  const number_matches = [...current_line.matchAll(/[0-9]+/g)]
  const current_numbers = number_matches.map(x => ({
    value: x[0],
    start: x.index - 1,
    end: x.index + x[0].length
  }))
  console.log(current_numbers)

  const symbol_matches = [...current_line.matchAll(/\*/g)]
  const current_stars = symbol_matches.map(x => ({
    value: x[0],
    index: x.index
  }))
  console.log(current_stars)

  for (const current_star of current_stars) {
    current_star.found_numbers = current_numbers.filter(x => x.start <= current_star.index && x.end >= current_star.index)
    if (previous_numbers) {
      const found = previous_numbers.filter(x => x.start <= current_star.index && x.end >= current_star.index)
      current_star.found_numbers.push(...found)
    }
  }

  if (previous_stars) {
    for (const previous_star of previous_stars) {
      const found = current_numbers.filter(x => x.start <= previous_star.index && x.end >= previous_star.index)
      previous_star.found_numbers.push(...found)

      const found_number_count = previous_star.found_numbers.length
      console.log('found number count', found_number_count)
      if (found_number_count === 2) {
        const gear_ratio = previous_star.found_numbers.map(x => parseInt(x.value)).reduce((a, b) => a *= b, 1)
        gear_ratios.push(gear_ratio)
      }
    }
  }



  previous_stars = current_stars
  previous_numbers = current_numbers
}

console.log(gear_ratios)

console.log(gear_ratios.reduce((a, b) => a += b, 0))
