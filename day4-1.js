
import fs from 'fs'
import * as readline from "readline"

// const data = fs.readFileSync('./data/input.txt', {encoding: 'utf-8'})
// console.log(data)

const line_reader = readline.createInterface({
  input: fs.createReadStream('./data/input4.txt')
})
const card_values = []

line_reader.on('line', line => {
  console.log('line: ', line)

  const pipe_split = line.split('|')

  const first_part = pipe_split[0]
  const second_part = pipe_split[1]

  const first_part_split = first_part.split(':')

  const card_string = first_part_split[0]
  const winning_number_string = first_part_split[1]

  const card_number = card_string.split(/ +/)[1]
  console.log('card number', card_number)
  const winning_numbers = winning_number_string.trim().split(/ +/)
  console.log('winning numbers', winning_numbers)
  const our_numbers = second_part.trim().split(/ +/)
  console.log('our numbers', our_numbers)

  let matches = 0
  for (const winning_number of winning_numbers) {
    const match = our_numbers.find(x => x === winning_number)
    if (match) {
      matches++
    }
  }
  console.log('matches', matches)

  if (matches > 0) {
    const score = Math.pow(2, (matches - 1))
    console.log('score', score)
    card_values.push(score)
  }
  else {
    card_values.push(0)
  }

})

line_reader.on('close', () => {
  console.log(card_values)
  console.log(card_values.reduce((a, b) => a += b, 0))
})

