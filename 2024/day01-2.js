import fs from "node:fs";

const data = fs.readFileSync("./data/input.txt", "utf-8");

const lines = data.split("\n");
lines.pop();

const lefts = [];
const rights = [];
for (const line of lines) {
  const nums = line.split("   ");
  lefts.push(parseInt(nums[0]));
  rights.push(parseInt(nums[1]));
}

lefts.sort();
rights.sort();

let total = 0;
for (let i = 0; i < lefts.length; i++) {
  const query = lefts[i];

  const found = rights.filter((x) => x === query).length;
  total += query * found;
}

console.log(total);
