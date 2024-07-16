import fs from 'fs'

const data = fs.readFileSync('./data/input6.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
const times = lines[0].split(':')[1].trim().split(/ +/g).map(x => parseInt(x))
const distances = lines[1].split(':')[1].trim().split(/ +/g).map(x => parseInt(x))

const ways_to_win = []
for (let i = 0; i < times.length; i++) {
  const time = times[i]
  const distance_to_beat = distances[i]

  console.log(`time: ${time} ms`)
  console.log(`distance to beat: ${distance_to_beat} mm`)

  let start = Math.round(time / 2)

  let winning = true
  while (winning) {
    const distance = start * (time - start)
    if (distance > distance_to_beat) {
      start--
    }
    else {
      winning = false
    }
  }
  const last_winning_scenario = start + 1
  const inverse = time - last_winning_scenario
  const winning_scenarios = inverse - last_winning_scenario + 1
  ways_to_win.push({
    count: winning_scenarios,
    last_winning_scenario,
    inverse
  })
}

console.log(ways_to_win)
console.log(ways_to_win.reduce((a, b) => a *= b.count, 1))
