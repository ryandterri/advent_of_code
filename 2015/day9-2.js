import fs from 'fs'

const data = fs.readFileSync('./data/input9.txt', { encoding: 'utf-8' })

const inputs = data.split('\n')
inputs.pop()

const map = {}
const cities = new Set()
for (const input of inputs) {
  const map_split = input.split(' = ')
  const locations = map_split[0]
  const distance = parseInt(map_split[1]);
  const location_split = locations.split(' to ')
  const start = location_split[0]
  const end = location_split[1]
  cities.add(start)
  cities.add(end)

  if (!map[start]) {
    map[start] = {}
  }
  if (!map[end]) {
    map[end] = {}
  }

  map[start][end] = distance
  map[end][start] = distance

}

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]])
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]))
      }
    }
  }
  return ret;
}

const perms = perm(Array.from(cities))

let total = 0
for (const perm of perms) {
  let perm_total = 0
  for (let i = 0; i < perm.length - 1; i++) {
    const start = perm[i]
    const end = perm[i + 1]
    perm_total += map[start][end]
  }

  if (perm_total > total) {
    total = perm_total
  }
}

console.log(total)
