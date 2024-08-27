import fs from 'fs'

const data = fs.readFileSync('./data/input19.txt', { encoding: 'utf-8' })
const split = data.split('\n\n')

const rule_lines = split[0].split('\n')
// const part_lines = split[1].split('\n')
// part_lines.pop()

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
  const is_final = workflow_name === 'R' || workflow_name === 'A'
  console.log(part, workflow_name, is_final)
  if (is_final) {
    part.outcome = workflow_name
    return [part]
  }
  const rules = workflows[workflow_name]
  const results = []

  for (const rule of rules) {
    if (rule.condition) {
      const { variable, operator, value } = rule.condition
      const compare = part[variable]
      console.log(part)
      if (operator === '>') {
        if (compare.min > value) {
          const parts = process_part(part, rule.outcome)
          results.push(...parts)
        }
        else {
          const new_part = structuredClone(part)
          part[variable].max = value
          new_part[variable].min = value + 1
          const parts = process_part(new_part, rule.outcome)
          results.push(...parts)
        }
      }
      else if (compare.max < value) {
        const parts = process_part(new_part, rule.outcome)
        results.push(...parts)
      }
      else {
        const new_part = structuredClone(part)
        part[variable].min = value
        new_part[variable].max = value - 1
        const parts = process_part(new_part, rule.outcome)
        results.push(...parts)
      }

    }
    else {
      const parts = process_part(part, rule.outcome)
      results.push(...parts)
    }
  }
  return results
}

const part = {
  x: { min: 1, max: 4000 },
  m: { min: 1, max: 4000 },
  a: { min: 1, max: 4000 },
  s: { min: 1, max: 4000 },
}


const results = process_part(part, 'in')

console.log(results.filter(x => x.outcome === 'A'))
const accepted = results.filter(x => x.outcome === 'A').map(r => {
  return (r.x.max - r.x.min + 1) *
    (r.m.max - r.m.min + 1) *
    (r.a.max - r.a.min + 1) *
    (r.s.max - r.s.min + 1)
})

console.log(accepted)
console.log(accepted.reduce((a, b) => a + b))
