import fs from 'fs'

const data = fs.readFileSync('./data/input8.txt', { encoding: 'utf-8' })
const strings = data.split('\n')
strings.pop()


let total = 0
for (const string of strings) {
  const formatted = eval(string)
  const diff = string.length - formatted.length
  console.log(string, string.length, formatted, formatted.length, diff)
  total += diff
}

console.log(total)
