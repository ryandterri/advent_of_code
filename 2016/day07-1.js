import fs from 'node:fs'

const data = fs.readFileSync('./data/input7.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()

let count = 0

const abba_regex = /([a-z])(?!\1)([a-z])\2\1/ig
const is_abba = (string) => {
  const result = abba_regex.test(string)
  return result
}
for (const line of lines) {
  const sections = line.split(/\[|\]/g)

  const hypernets = sections.filter((e, i, a) => i % 2 === 1)
  const supernets = sections.filter((e, i, a) => i % 2 === 0)

  let valid = hypernets.every(x => !is_abba(x))

  if (valid) {
    valid = supernets.some(x => is_abba(x))
  }

  if (valid) {
    count++
  }

}

console.log(count)

