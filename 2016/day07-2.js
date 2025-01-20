import fs from 'node:fs'

const data = fs.readFileSync('./data/input7.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()

let count = 0

const aba_regex = /(?=(([a-z])(?!\2)([a-z])\2))/g
const is_aba = (string) => {
  return string.matchAll(aba_regex)
}
for (const line of lines) {

  const sections = line.match(/([a-z]+)/ig)
  const hypernets = line
    .match(/\[([a-z]+)\]/ig)
    .map(x => {
      return x.replace('[', '').replace(']', '')
    })

  for (const hypernet of hypernets) {
    const index = sections.indexOf(hypernet)
    if (index >= 0) {
      sections.splice(index, 1)
    }
  }

  const babs = []
  for (const section of sections) {
    const aba_matches = is_aba(section)
    for (const aba of aba_matches) {
      const [x, y, first, second] = aba
      babs.push(`${second}${first}${second}`)
    }
  }

  let valid = false
  for (const hypernet of hypernets) {
    for (const bab of babs) {
      if (hypernet.includes(bab)) {
        valid = true
        count++
        break
      }
    }
    if (valid) break
  }

}

console.log(count)

