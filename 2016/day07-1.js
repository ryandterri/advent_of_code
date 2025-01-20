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

  const hypernets = line.match(/\[([a-z]+)\]/ig)

  let valid = true
  let sections = line.match(/([a-z]+)/ig)
  for (const hypernet of hypernets) {
    if (is_abba(hypernet)) {
      valid = false
    }
    const stripped = hypernet.replace('[', '').replace(']', '')
    const index = sections.indexOf(stripped)
    if (index >= 0) {
      sections.splice(index, 1)
    }
  }

  if (valid) {
    for (const section of sections) {
      if (is_abba(section)) {
        count++
        break
      }
    }
  }

}

console.log(count)

