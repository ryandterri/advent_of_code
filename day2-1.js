import fs from 'fs'

const data = fs.readFileSync('./data/input2.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
lines.pop()

let valid_count = 0
for (const line of lines) {
  const game_id = parseInt(line.split(':')[0].split(' ')[1])
  const value = line.split(':')[1].trim()
  const pulls = value.split(';').map(x => x.trim().split(',').map(a => a.trim().split(' ')))

  let valid = true
  for (const pull of pulls) {
    for (const [count, type] of pull) {
      if (type === 'green' && count > 13) {
        valid = false
        break
      }

      if (type === 'red' && count > 12) {
        valid = false
        break
      }

      if (type === 'blue' && count > 14) {
        valid = false
        break
      }

    }
  }
  if (valid) {
    valid_count += game_id
  }
}

console.log(valid_count)
