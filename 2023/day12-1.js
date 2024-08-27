import fs from 'fs'

const data = fs.readFileSync('./data/input12.txt', { encoding: 'utf-8' })

const lines = data.split('\n')
lines.pop()

const memo = {}

const get_total_possibilites = (input, groups) => {

  if (input.startsWith('.')) {
    return get_total_possibilites(input.slice(1), groups)
  }

  // return stored value if we have it so that we do not need to do the work again
  const key = `${input}-${groups.join(',')}`
  if (memo[key] !== undefined) {
    return memo[key]
  }

  // if we have found all groups
  if (groups.length === 0) {
    // then if we still have springs then return 0 - invalid
    if (input.includes('#')) {
      return 0
    }
    // otherwise it is valid
    else {
      return 1
    }
  }

  // size needed to satisfy all groups without spaces
  const group_size = groups.reduce((a, b) => a + b)
  // size of the spaces (1 between each input)
  const group_separator_size = groups.length - 1
  // add to get total size
  const group_total_size = group_size + group_separator_size

  // if input is not long enough to satisfy the groups then return 0 - invalid
  if (input.length < group_total_size) {
    return 0
  }

  const current_group = groups[0]
  // slice the input to see if the group will fit
  const fit_string = input.slice(0, current_group)
  // if it does not have a . then it is valid
  const valid = !fit_string.includes('.')
  // if the fit string is the last string 
  if (input.length === current_group) {
    // then if it is valid then return 1
    return valid ? 1 : 0
  }

  let total = 0

  // if the current character is not #, then check next substring
  // if a spring is at the current location then it would be part of the next match
  if (input[0] != '#') {
    total += get_total_possibilites(input.slice(1), groups)
  }

  // otherwise if the group is valid and the next character is not #
  // if the next character is # then it would be part of this match
  const next_character = input[current_group]
  if (valid && next_character !== '#') {
    total += get_total_possibilites(input.slice(current_group + 1), groups.slice(1))
  }

  memo[key] = total
  return total
}


let total = 0

for (const line of lines) {
  let [input, groups] = line.split(' ')
  input = input.replaceAll(/\.+/g, '.')
  groups = groups.split(',').map(x => parseInt(x))
  const line_total = get_total_possibilites(input, groups)
  total += line_total
}

console.log(total)
