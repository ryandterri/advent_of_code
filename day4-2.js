
import fs from 'fs'

const data = fs.readFileSync('./data/input4.txt', { encoding: 'utf-8' })
// console.log(data)

const lines = data.split('\n').map(x => ({ value: x, copies: 1 }))
lines.pop()
// console.log(lines)

for (let i = 0; i < lines.length; i++) {

  const line_object = lines[i]
  const line = lines[i].value
  const pipe_split = line.split('|')

  const first_part = pipe_split[0]
  const second_part = pipe_split[1]

  const first_part_split = first_part.split(':')

  const card_string = first_part_split[0]
  const winning_number_string = first_part_split[1]

  const card_number = card_string.split(/ +/)[1]
  // console.log('card number', card_number)
  const winning_numbers = winning_number_string.trim().split(/ +/)
  // console.log('winning numbers', winning_numbers)
  const our_numbers = second_part.trim().split(/ +/)
  // console.log('our numbers', our_numbers)

  line_object.matches = 0
  for (const winning_number of winning_numbers) {
    const match = our_numbers.find(x => x === winning_number)
    if (match) {
      line_object.matches++
    }
  }
  console.log(`line ${i} has ${line_object.matches} matches`)

  for (let j = 1; j <= line_object.matches; j++) {
    const next_card = lines[i + j]
    next_card.copies += lines[i].copies
  }

}

console.log(lines)
console.log(lines.reduce((a, b) => a += b.copies, 0))
