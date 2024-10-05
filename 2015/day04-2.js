import crypto from 'crypto'

const key = 'iwrupvqb'

let i = 1
while (!crypto.createHash('md5').update(`${key}${i}`).digest('hex').startsWith('000000')) {
  i++
}

console.log(i)
