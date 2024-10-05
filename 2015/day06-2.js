import fs from 'fs'

const data = fs.readFileSync('./data/input6.txt', { encoding: 'utf-8' })
const instructions = data.split('\n')
instructions.pop()

const map = {}
for (const instruction of instructions) {
  // console.log(instruction)
  const split = instruction.split(' ')
  const p1 = split[split.length - 3].split(',').map(x => parseInt(x))
  const p2 = split[split.length - 1].split(',').map(x => parseInt(x))
  if (split[0] === 'toggle') {
    toggle(p1, p2)
  }
  else if (split[1] === 'on') {
    turn_on(p1, p2)
  }
  else {
    turn_off(p1, p2)
  }
}

function toggle(p1, p2) {
  for (let x = p1[0]; x <= p2[0]; x++) {
    for (let y = p1[1]; y <= p2[1]; y++) {
      let key = `${x}-${y}`
      if (map[key]) {
        map[key] += 2
      }
      else {
        map[key] = 2
      }
    }
  }
}

function turn_on(p1, p2) {
  for (let x = p1[0]; x <= p2[0]; x++) {
    for (let y = p1[1]; y <= p2[1]; y++) {
      let key = `${x}-${y}`
      if (map[key]) {
        map[key] += 1
      }
      else {
        map[key] = 1
      }
    }
  }
}

function turn_off(p1, p2) {
  for (let x = p1[0]; x <= p2[0]; x++) {
    for (let y = p1[1]; y <= p2[1]; y++) {
      let key = `${x}-${y}`
      if (map[key]) {
        if (map[key] === 1) {
          delete map[key]
        }
        else {
          map[key] -= 1
        }
      }
    }
  }
}

console.log(Object.values(map).reduce((a, b) => a += b))
