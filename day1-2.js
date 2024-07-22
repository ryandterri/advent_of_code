import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', { encoding: 'utf-8' })
const lines = data.split('\n')

let sum = 0
for (const line of lines) {

  const matches = [...line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d+))/g)].map(x => x[1])
  const joined = matches.join('')
  const subbed = joined
    .replaceAll('one', '1')
    .replaceAll('two', '2')
    .replaceAll('three', '3')
    .replaceAll('four', '4')
    .replaceAll('five', '5')
    .replaceAll('six', '6')
    .replaceAll('seven', '7')
    .replaceAll('eight', '8')
    .replaceAll('nine', '9')
  const first = subbed[0]
  const last = subbed[subbed.length - 1]
  const number = parseInt(`${first}${last}`)
  console.log(line, JSON.stringify(matches), subbed, first, last)
  sum += number
}
console.log(sum)
