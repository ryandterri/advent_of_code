import fs from 'fs'

const data = fs.readFileSync('./data/input5.txt', { encoding: 'utf-8' })
const strings = data.split('\n')
strings.pop()

let nice_count = 0
for (const string of strings) {
  const has_forbidden_strings = /ab|cd|pq|xy/.test(string)
  if (!has_forbidden_strings) {
    const has_double_character = /(.)\1/.test(string)
    if (has_double_character) {
      const matches = string.match(/[aeiou]/g)
      if (matches?.length >= 3) {
        nice_count++
      }
    }
  }
}


console.log(nice_count)
