import fs from 'fs'

const data = fs.readFileSync('./data/input11.txt', { encoding: 'utf-8' })

const lines = data.split('\n').map(x => x.split(''))
lines.pop()

const rows = lines.map(x => x.join(''))
const columns = lines[0].map((_, i) => lines.map(y => y[i]).join(''))

const rows_to_duplicate = []
for (let i = 0; i < rows.length; i++) {
  if (!rows[i].includes('#')) {
    rows_to_duplicate.push(i)
  }
}
const columns_to_duplicate = []
for (let i = 0; i < columns.length; i++) {
  if (!columns[i].includes('#')) {
    columns_to_duplicate.push(i)
  }
}

console.log(rows_to_duplicate)
console.log(columns_to_duplicate)

const galaxy_coordinates = []
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (lines[y][x] === '#') {
      const y_offset = rows_to_duplicate.filter(i => i < y).length
      const x_offset = columns_to_duplicate.filter(i => i < x).length
      galaxy_coordinates.push({
        x: x + x_offset,
        y: y + y_offset
      })
    }
  }
}

let distances = []
for (let i = 0; i < galaxy_coordinates.length - 1; i++) {
  for (let j = i + 1; j < galaxy_coordinates.length; j++) {
    const galaxy_a = galaxy_coordinates[i]
    const galaxy_b = galaxy_coordinates[j]

    const distance = Math.abs(galaxy_a.x - galaxy_b.x) + Math.abs(galaxy_a.y - galaxy_b.y)
    distances.push(distance)
  }
}
console.log(galaxy_coordinates)
console.log(distances)
console.log(distances.reduce((a, b) => a += b, 0))

