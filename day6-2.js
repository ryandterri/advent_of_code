
import fs from 'fs'

const start_time = performance.now()
const data = fs.readFileSync('./data/input6.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
const time = parseInt(lines[0].split(':')[1].trim().split(/ +/g).join(''))
const distance_to_beat = parseInt(lines[1].split(':')[1].trim().split(/ +/g).join(''))


console.log(`time: ${time} ms`)
console.log(`distance to beat: ${distance_to_beat} mm`)

// let start = Math.round(time / 2)
//
// let winning = true
// while (winning) {
//   const distance = start * (time - start)
//   if (distance > distance_to_beat) {
//     start--
//   }
//   else {
//     winning = false
//   }
// }
// const last_winning_scenario = start + 1
// const inverse = time - last_winning_scenario
// const winning_scenarios = inverse - last_winning_scenario + 1
//
// console.log(last_winning_scenario, inverse, winning_scenarios)
//
// const end_time_long = performance.now()

// y = -x^2 + tx - d
// x = -t + sqrt(t^2 - 4(-1)(-d))

let first_win = (time - Math.sqrt(Math.pow(time, 2) - (4 * distance_to_beat))) / 2
let actual_first_win = parseInt(first_win + 1)
console.log(time + 1 - (actual_first_win * 2))

const end_time_short = performance.now()


// console.log(end_time_long - start_time)
console.log(end_time_short - start_time)
