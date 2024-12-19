import fs from "node:fs";

const data = fs.readFileSync("./data/input3.txt", "utf-8");
const regex = /mul\((\d+,\d+)\)|(do\(\))|(don\'t\(\))/g;
const matches = data.matchAll(regex);

let sum = 0;
let enabled = true;
for (const match of matches) {
  if (match[1] && enabled) {
    const product = match[1]
      .split(",")
      .map((x) => parseInt(x))
      .reduce((a, b) => a * b, 1);
    sum += product;
  }
  if (match[2]) {
    enabled = true;
  }
  if (match[3]) {
    enabled = false;
  }
}

console.log(sum);
