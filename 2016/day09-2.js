import fs from 'node:fs'

const data = fs.readFileSync('./data/input9.txt', 'utf-8')

const lines = data.split('\n')
lines.pop()

const decompress_line = (line) => {
  if (!line) {
    return 0
  }
  let match = line.match(/\(\d+x\d+\)/)
  if (!match) {
    return line.length
  }
  const [marker] = match
  const index = match.index
  const [quantity, repeat] = marker
    .replace(/\(|\)/, '')
    .split('x')
    .map(x => parseInt(x))
  let result = line.slice(0, index).length
  const start = index + marker.length
  const end = start + quantity
  let sequence = line.slice(start, end)
  let sequence_length = decompress_line(sequence)
  const repeated = sequence_length * repeat
  result += repeated
  return result + decompress_line(line.slice(end))
}

for (const line of lines) {

  const decompressed = decompress_line(line)
  console.log('decompressed length: ', decompressed)
}
