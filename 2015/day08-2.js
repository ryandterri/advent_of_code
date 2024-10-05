import fs from 'fs'

const data = fs.readFileSync('./data/input8.txt', { encoding: 'utf-8' })
const strings = data.split('\n')
strings.pop()

let total = 0
for (const string of strings) {
  const formatted = `"${string.replaceAll('\\', '\\\\').replaceAll(/"/g, '\\"')}"`
  const diff = formatted.length - string.length
  console.log(string, formatted, string.length, formatted.length, diff)
  total += diff
}

console.log(total)
