import fs from 'fs'

const data = fs.readFileSync('./data/test.txt', { encoding: 'utf-8' })

const lines = data.split('\n')
lines.pop()

const get_total_possibilites = ({ record, sequence, memo }) => {
  let total = 0

  if (sequence.length === 0) {
    if (!record.includes('#')) {
      return 1
    }
    else {
      return 0
    }
  }

  const key = `${record}-${sequence.join(',')}`
  if (memo[key]) {
    return memo[key]
  }

  const min_size = sequence.reduce((a, b) => a + b, 0)
  if (record.length < min_size) {
    return 0
  }

  if (record.startsWith('.')) {
    return get_total_possibilites({ record: record.slice(1), sequence, memo })
  }

  const current = sequence[0]

  const fit = record.substring(0, current);
  const is_fit_valid = !fit.includes('.')

  if (is_fit_valid) {
    const is_last = record.length === current || record
    if (is_last || record.substring(current + 1).includes('#')) {
      return
    }
  }

}

let total = 0
for (const line of lines) {
  const split = line.split(' ')
  const sequence = split[1].split(',').map(x => parseInt(x))
  const record = split[0]
  total += get_total_possibilites({ record, sequence, memo: {} })
}
