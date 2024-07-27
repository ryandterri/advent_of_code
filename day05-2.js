import fs from 'fs'
const start = performance.now()
const data = fs.readFileSync('./data/input5.txt', { encoding: 'utf-8' })
// console.log(data)

const lines = data.split('\n')
lines.pop()
// console.log(lines)

const seed_line = lines.find(x => x.includes('seeds:'))

const seed_array = seed_line.split(':')[1].trim().split(' ').map(x => parseInt(x))

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
      const diff = destination_start - source_start
      rules.push({
        source_start,
        source_end,
        diff
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

const find_next = (rule_index, min, max) => {
  let results = []

  const rule_set = rules[rule_index];
  if (!rule_set) {
    return min
  }
  for (const rule of rule_set) {

    if (min > rule.source_end || max < rule.source_start) {
      continue
    }
    if (min < rule.source_start) {
      results.push({ min: min, max: rule.source_start - 1, rule_index })
      min = rule.source_start
    }
    if (max > rule.source_end) {
      results.push({ min: rule.source_end + 1, max: max, rule_index })
      max = rule.source_end
    }
    results.push({ min: min + rule.diff, max: max + rule.diff, rule_index: rule_index + 1 })
  }
  if (!results.length) {
    results.push({ min, max, rule_index: rule_index + 1 })
  }
  let lowest;
  for (const result of results) {
    const final = find_next(result.rule_index, result.min, result.max)
    if (!lowest) {
      lowest = final
    }
    if (final < lowest) {
      lowest = final
    }
  }
  return lowest
}

let lowest_value
const seed_ranges = []
for (let i = 0; i < seed_array.length; i += 2) {
  let min = seed_array[i]
  const length = seed_array[i + 1]
  let max = min + length - 1
  seed_ranges.push({ min, max, rule_index: 0 })
}

while (seed_ranges.length) {
  let { min, max, rule_index } = seed_ranges.pop()

  const lowest = find_next(rule_index, min, max)

  if (!lowest_value) {
    console.log('setting lowest value initial', lowest)
    lowest_value = lowest
  }
  else if (lowest_value > lowest) {
    console.log('overwriting lowest value', lowest)
    lowest_value = lowest
  }
}
const end = performance.now()
console.log(`execution time ${end - start} ms`)


console.log(lowest_value)
