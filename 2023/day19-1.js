import fs from 'fs'

const data = fs.readFileSync('./data/input19.txt', { encoding: 'utf-8' })
const split = data.split('\n\n')

const rule_lines = split[0].split('\n')
const part_lines = split[1].split('\n')
part_lines.pop()

const workflows = {}
for (const rule_line of rule_lines) {

  const split = rule_line.replace('}', '').split('{')
  const workflow_name = split[0]

  const parsed = split[1].split(',')

  const rules = []
  for (const item of parsed) {
    const rule_split = item.split(':')
    if (rule_split.length > 1) {
      const condition_string = rule_split[0]
      const outcome = rule_split[1]
      let operator
      if (condition_string.includes('>')) {
        operator = '>'
      }
      else {
        operator = '<'
      }
      const condition_split = condition_string.split(operator)
      const condition = {
        variable: condition_split[0],
        operator,
        value: parseInt(condition_split[1])
      }
      rules.push({
        condition,
        outcome
      })
    }
    else {
      rules.push({
        outcome: rule_split[0]
      })
    }
  }

  workflows[workflow_name] = rules
}

const process_part = (part, workflow_name) => {
  const rules = workflows[workflow_name]

  console.log(part, workflow_name, rules)

  for (const rule of rules) {
    if (rule.condition) {
      const { variable, operator, value } = rule.condition
      const compare = part[variable]
      let matches = false
      if (operator === '>') {
        if (compare > value) {
          matches = true
        }
      }
      else if (compare < value) {
        matches = true
      }
      console.log(matches, compare, value, rule.condition)
      if (matches) {
        if (rule.outcome === 'R' || rule.outcome === 'A') {
          return rule.outcome
        }
        else {
          return process_part(part, rule.outcome)
        }
      }
    }
    else {
      if (rule.outcome === 'R' || rule.outcome === 'A') {
        return rule.outcome
      }
      else {
        return process_part(part, rule.outcome)
      }
    }
  }
}

const parts = []
for (const part_line of part_lines) {
  const part_array = part_line.match(/\d+/g).map(x => parseInt(x))
  const part = {
    x: part_array[0],
    m: part_array[1],
    a: part_array[2],
    s: part_array[3],
    rating: part_array.reduce((a, b) => a + b)
  }
  part.outcome = process_part(part, 'in')
  parts.push(part)
}

console.log(parts)
console.log(parts.filter(x => x.outcome === 'A').reduce((a, b) => a + b.rating, 0))
