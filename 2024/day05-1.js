import fs from "node:fs";

const data = fs.readFileSync("./data/input5.txt", "utf-8");

const lines = data.split("\n");

const rules = [];
let total = 0;
for (const line of lines) {
  if (line.includes("|")) {
    const nums = line.split("|");
    const regex = new RegExp(`${nums[0]}[,\\d]+${nums[1]}`);
    rules.push({ nums, regex });
  }
  if (line.includes(",")) {
    let line_valid = true;
    for (const rule of rules) {
      if (line.includes(rule.nums[0]) && line.includes(rule.nums[1])) {
        const valid = rule.regex.test(line);
        // console.log(rule, line, valid);
        if (!valid) {
          line_valid = false;
          break;
        }
      }
    }
    if (line_valid) {
      const array = line.split(",");
      const middle = parseInt(array[(array.length - 1) / 2]);
      total += middle;
    }
  }
}

console.log(total);
