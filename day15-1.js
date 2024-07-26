import fs from 'fs'

const data = fs.readFileSync('./data/input15.txt', { encoding: 'utf-8' })

const steps = data.replaceAll('\n', '').split(',')

const hash = (string) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i)
    hash = ((hash + code) * 17) % 256
  }
  console.log(hash)
  return hash
}

let total = 0
for (const step of steps) {
  total += hash(step)
}

console.log(total)
