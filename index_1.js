import fs from 'fs'
import * as readline from "readline"

// const data = fs.readFileSync('./data/input.txt', {encoding: 'utf-8'})
// console.log(data)

const line_reader = readline.createInterface({
    input: fs.createReadStream('./data/input.txt')
})
const values = []
const numbers = [
    { string: 'one', value: 1 },
    { string: 'two', value: 2 },
    { string: 'three', value: 3 },
    { string: 'four', value: 4 },
    { string: 'five', value: 5 },
    { string: 'six', value: 6 },
    { string: 'seven', value: 7 },
    { string: 'eight', value: 8 },
    { string: 'nine', value: 9 },
]
line_reader.on('line', line => {
    let first, last
    const results = []
    for (const number of numbers) {
        let value_index = -1
        while ((value_index = line.indexOf(number.value, value_index + 1)) !== -1) {
            results.push({ value: number.value, index: value_index })
        }
        let index = -1
        while ((index = line.indexOf(number.string, index + 1)) !== -1) {
            results.push({ value: number.value, index })
        }
    }
    const sorted = results.sort((a, b) => a.index < b.index ? -1 : 1)
    first = sorted[0].value
    last = sorted.reverse()[0].value
    // for (const char of line) {
    //     const number = parseInt(char)
    //     if (!isNaN(number)) {
    //         if (!first) {
    //             first = number
    //         } else {
    //             last = number
    //         }
    //     }
    // }
    // if (!last) {
    //     last = first
    // }
    const secret_number = parseInt(`${ first }${ last }`)
    console.log(line, secret_number)
    values.push(secret_number)
})

line_reader.on('close', () => {
    const total = values.reduce((a, b) => a += b, 0)
    console.log(total)

})