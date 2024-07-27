
import fs from 'fs'

const start_time = performance.now()
const data = fs.readFileSync('./data/input7.txt', { encoding: 'utf-8' })
const lines = data.split('\n')
lines.pop()

const card_values = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const hands = []
for (const line of lines) {
  const split = line.split(' ')
  const hand_array = split[0].split('')
  const hand = {
    value: split[0],
    value_array: hand_array,
    sub_rank: [],
    bid: parseInt(split[1]),
    card_value_array: []
  }

  for (const value of hand_array) {
    hand.sub_rank.push(String.fromCharCode(65 + card_values.indexOf(value)))
  }
  hand.sub_rank = hand.sub_rank.join('')
  for (const card of card_values) {
    const count = hand_array.filter(x => x === card).length
    if (count) {
      hand.card_value_array.push({
        card,
        count
      })
    }
  }

  const length = hand.card_value_array.length
  if (length === 1) {
    hand.rank = 7
  }
  else if (length === 2) {
    if (hand.card_value_array.some(x => x.count === 4)) {
      hand.rank = 6
    }
    else {
      hand.rank = 5
    }
  }
  else if (length === 3) {
    if (hand.card_value_array.some(x => x.count === 3)) {
      hand.rank = 4
    }
    else {
      hand.rank = 3
    }
  }
  else if (length === 4) {
    hand.rank = 2
  }
  else if (length === 5) {
    hand.rank = 1
  }


  hands.push(hand)
}


hands.sort((a, b) => {
  if (a.rank === b.rank) {
    return a.sub_rank > b.sub_rank ? -1 : 1
  }
  else {
    return a.rank < b.rank ? -1 : 1
  }
})

let result = 0
for (let i = 0; i < hands.length; i++) {
  result += (hands[i].bid * (i + 1))
}

console.log(result)
