

import fs from 'fs'

const data = fs.readFileSync('./data/input5.txt', { encoding: 'utf-8' })
// console.log(data)

const lines = data.split('\n')
lines.pop()
console.log(lines)

const seed_line = lines.find(x => x.includes('seeds:'))

const seeds = seed_line.split(':')[1].trim().split(' ').map(x => parseInt(x))
console.log(seeds)

const get_rules = (type) => {

  let rule_type_line = lines.findIndex(x => x.includes(type))
  let blank_line = false
  const rules = []
  do {
    rule_type_line++
    const current_line = lines[rule_type_line]
    if (!current_line || current_line.trim() === '') {
      blank_line = true
    }
    else {
      const split = current_line.split(' ')
      const destination_start = parseInt(split[0])
      const source_start = parseInt(split[1])
      const length = parseInt(split[2])
      const source_end = source_start + length - 1
      const destination_end = destination_start + length - 1
      rules.push({
        source_start,
        source_end,
        destination_start,
        destination_end
      })
    }
  } while (blank_line === false)
  return rules
}

const seed_to_soil_rules = get_rules('seed-to-soil')
const soil_to_fertilizer_rules = get_rules('soil-to-fertilizer')
const fertilizer_to_water_rules = get_rules('fertilizer-to-water')
const water_to_light_rules = get_rules('water-to-light')
const light_to_temperature_rules = get_rules('light-to-temperature')
const temperature_to_humidity_rules = get_rules('temperature-to-humidity')
const humidity_to_location_rules = get_rules('humidity-to-location')
const rules = [
  seed_to_soil_rules,
  soil_to_fertilizer_rules,
  fertilizer_to_water_rules,
  water_to_light_rules,
  light_to_temperature_rules,
  temperature_to_humidity_rules,
  humidity_to_location_rules
]

const find_next = (rules, value) => {
  let result
  const found_rule = rules.find(x => value >= x.source_start && value <= x.source_end)
  if (found_rule) {
    const diff = value - found_rule.source_start
    result = found_rule.destination_start + diff
  }
  else {
    result = value
  }
  return result
}

const results = []
for (const seed of seeds) {
  const result = {
    seed,
    chain: []
  }
  let value = seed
  for (const rule_set of rules) {
    value = find_next(rule_set, value)
    result.chain.push(value)
  }
  results.push(result)
}


console.log(results)
console.log(Math.min(...results.map(x => x.chain[x.chain.length - 1])))
