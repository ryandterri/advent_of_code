import fs from "node:fs";

const data = fs.readFileSync("./data/input3.txt", "utf-8");
const regex = /mul\((\d+,\d+)\)/g;
const matches = data.matchAll(regex);

let sum = 0;
for (const match of matches) {
  const product = match[1]
    .split(",")
    .map((x) => parseInt(x))
    .reduce((a, b) => a * b, 1);
  sum += product;
}

console.log(sum);
