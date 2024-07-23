import fs from 'fs'

const data = fs.readFileSync('./data/input2.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
lines.pop()

let power_sum = 0
for (const line of lines) {
  const game_id = parseInt(line.split(':')[0].split(' ')[1])
  const value = line.split(':')[1].trim()
  const pulls = value
    .split(';')
    .map(x => x.trim().split(',').map(a => a.trim().split(' ')))

  const max_values = {
    red: 0,
    green: 0,
    blue: 0
  }
  for (const pull of pulls) {
    for (const [count, type] of pull) {
      const number = parseInt(count)
      if (max_values[type] < number) {
        max_values[type] = number
      }
    }
  }

  power_sum += (max_values.blue * max_values.red * max_values.green)

}

console.log(power_sum)
