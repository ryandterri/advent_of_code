import fs from 'fs'
import * as readline from "readline"

// const data = fs.readFileSync('./data/input.txt', {encoding: 'utf-8'})
// console.log(data)

const line_reader = readline.createInterface({
  input: fs.createReadStream('./data/input2.txt')
})
const power_sets = []

line_reader.on('line', line => {
  console.log('line: ', line)
  const split = line.split(':')
  // console.log('split ', split)

  const game = split[0]
  // console.log('game ', game)
  const entries = split[1].trim()
  // console.log('entries ', entries)

  const game_number = game.split(' ')[1]
  // console.log(game_number)

  const sets = entries.split(';')

  const max_values = {
    red: 0,
    green: 0,
    blue: 0
  }

  for (const set of sets) {

    const items = set.split(',')
    for (const item of items) {
      // console.log('item ', item)
      const item_split = item.trim().split(' ')
      // console.log('item_split ', item_split)
      const quantity = parseInt(item_split[0])
      const type = item_split[1]
      // console.log(quantity, type)

      if (max_values[type] < quantity) {
        max_values[type] = quantity
      }
    }
  }

  power_sets.push(max_values.red * max_values.green * max_values.blue)
})

line_reader.on('close', () => {
  console.log(power_sets)
  console.log('answer is: ', power_sets.reduce((a, b) => a += parseInt(b), 0))
})
// split = ['Game 1',' 8 green; 5 green, 6 blue, 1 red; 2 green, 1 blue, 4 red; 10 green, 1 red, 2 blue; 2 blue, 3 red']
// game = 'Game 1'
// game_number = 1 

