import fs from 'node:fs'

const data = fs.readFileSync('./data/input9.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()

for (const line of lines) {
  let is_marker
  let marker = ''
  let i = 0
  let decoded = ''
  while (i < line.length) {
    const char = line[i]
    if (char === '(') {
      is_marker = true
      i++
    }
    else if (char === ')') {
      const [next, repeat] = marker.split('x').map(x => parseInt(x))
      let sequence = ''
      i++
      let end = i + next
      while (i < end) {
        sequence += line[i]
        i++
      }
      for (let r = 0; r < repeat; r++) {
        decoded += sequence
      }
      is_marker = false
      marker = ''
    }
    else if (is_marker) {
      marker += char
      i++
    }
    else {
      decoded += char
      i++
    }
  }
  console.log(decoded.length)
}
