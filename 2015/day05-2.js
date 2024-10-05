import fs from 'fs'

const data = fs.readFileSync('./data/input5.txt', { encoding: 'utf-8' })
const strings = data.split('\n')
strings.pop()

let nice_count = 0
for (const string of strings) {
  const has_repeating_double = /(..).*\1/.test(string)
  if (has_repeating_double) {
    const has_repeat_with_separator = /(.).\1/.test(string)
    if (has_repeat_with_separator) {
      nice_count++
    }
  }
}


console.log(nice_count)
