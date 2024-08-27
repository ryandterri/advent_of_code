import fs from 'fs'

const data = fs.readFileSync('./data/input15.txt', { encoding: 'utf-8' })

const steps = data.replaceAll('\n', '').split(',')

const hash = (string) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i)
    hash = ((hash + code) * 17) % 256
  }
  // console.log(hash)
  return hash
}

const boxes = Array.from({ length: 256 }, e => new Array())
for (const step of steps) {
  const is_equal = step.includes('=')
  if (is_equal) {
    const split = step.split('=')
    const label = split[0]
    const value = split[1]
    const box_index = hash(label)
    const lenses = boxes[box_index]
    const lens_index = lenses.findIndex(x => x.label === label)
    if (lens_index >= 0) {
      lenses[lens_index].value = value
    }
    else {
      lenses.push({ label, value })
    }
  }
  else {
    const label = step.split('-')[0]
    const box_index = hash(label)
    const lenses = boxes[box_index]
    const lens_index = lenses.findIndex(x => x.label === label)
    if (lens_index >= 0) {
      lenses.splice(lens_index, 1)
    }
  }
}

let total = 0
for (let i = 0; i < boxes.length; i++) {
  const lenses = boxes[i]
  for (let j = 0; j < lenses.length; j++) {
    total += (i + 1) * (j + 1) * lenses[j].value
  }
}
console.log(total)
