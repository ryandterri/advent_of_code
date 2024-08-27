import fs from 'fs'

const data = fs.readFileSync('./data/test.txt', { encoding: 'utf-8' }).trim()


const pairs = data.split('\n').map(x => x.split('~').map(y => ({
  x: parseInt(y.split(',')[0]),
  y: parseInt(y.split(',')[1]),
  z: parseInt(y.split(',')[2])
})))

const bounds = pairs.map(x => {
  return {
    max_x: Math.max(x[0].x, x[1].x),
    max_y: Math.max(x[0].y, x[1].y),
    max_z: Math.max(x[0].z, x[1].z),
  }
})

const x_bound = Math.max(...bounds.map(x => x.max_x)) + 1
const y_bound = Math.max(...bounds.map(x => x.max_y)) + 1
const z_bound = Math.max(...bounds.map(x => x.max_z)) + 1

console.log(x_bound, y_bound, z_bound)
const space = new Array(z_bound).fill(new Array(x_bound).fill(new Array(y_bound).fill('.'))).map(z => z.map(x => x.map(y => '.')))


let block_id = 1
const blocks = []
for (const pair of pairs) {
  const p1 = pair[0]
  const p2 = pair[1]

  const x_start = p1.x < p2.x ? p1.x : p2.x
  const x_end = p1.x > p2.x ? p1.x : p2.x
  const y_start = p1.y < p2.y ? p1.y : p2.y
  const y_end = p1.y > p2.y ? p1.y : p2.y
  const z_start = p1.z < p2.z ? p1.z : p2.z
  const z_end = p1.z > p2.z ? p1.z : p2.z

  const block = {
    block_id,
    p1,
    p2,
    x_start,
    x_end,
    y_start,
    y_end,
    z_start,
    z_end,
    points: []
  }

  blocks.push(block)
  block_id++
}

blocks.sort((a, b) => a.z_start < b.z_start ? -1 : 1)

// console.log(JSON.stringify(blocks, null, 4))

const can_block_drop = (block, floor) => {
  for (let x = block.x_start; x <= block.x_end; x++) {
    for (let y = block.y_start; y <= block.y_end; y++) {
      const under = floor[x][y]
      if (under !== '.') {
        return false
      }
    }
  }
  return true
}

const adjust_block = (block) => {
  let can_drop = true
  for (let z = block.z_start - 1; z > 0; z--) {
    let floor = space[z]
    can_drop = can_block_drop(block, floor)
    if (!can_drop) {
      break
    }

    block.z_start--
    block.z_end--
  }
  console.log(`block id: ${block.block_id} can drop to z: ${block.z_start}`)
}

const map_block = (block) => {
  const { block_id, x_start, x_end, y_start, y_end, z_start, z_end } = block
  for (let z = z_start; z <= z_end; z++) {
    for (let x = x_start; x <= x_end; x++) {
      for (let y = y_start; y <= y_end; y++) {
        space[z][x][y] = block_id
        block.points.push({ x, y, z })
      }
    }
  }
}

const can_delete_block = (block) => {

  const top = space[block.z_end + 1]
  const current = space[block.z_end]
  const is_top_empty = top.flat().every(x => x === '.')
  if (!is_top_empty) {

    for (let x = 0; x < x_bound; x++) {
      for (let y = 0; y < y_bound; y++) {
        if (top[x][y] !== '.') {
          if (!['.', block.block_id].includes(current[x][y])) {
            console.log(top.map(x => x.join(',')).join('\n'))
            console.log('\n\n')
            console.log(current.map(x => x.join(',')).join('\n'))
            return true
          }
        }
      }
    }
    return false
  }
  return true
}

for (const block of blocks) {
  adjust_block(block)
  map_block(block)
}

let count = 0
for (const block of blocks) {

  let can_delete = can_delete_block(block)
  console.log(`block: ${block.block_id}, can_delete: ${can_delete}`)
  if (can_delete) {
    count++
  }
}

console.log(count)

// console.log(space)
