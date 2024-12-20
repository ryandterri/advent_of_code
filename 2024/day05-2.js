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
    const valid_rules = [];
    for (const rule of rules) {
      if (line.includes(rule.nums[0]) && line.includes(rule.nums[1])) {
        valid_rules.push(rule);
        const valid = rule.regex.test(line);
        if (!valid) {
          line_valid = false;
        }
      }
    }
    if (!line_valid) {
      const array = line.split(",");
      array.sort((a, b) => {
        for (const rule of valid_rules) {
          if (a === rule.nums[0] && b === rule.nums[1]) {
            return -1;
          } else if (a === rule.nums[1] && b === rule.nums[0]) {
            return 1;
          }
        }
      });
      console.log(line, array);
      const middle = parseInt(array[(array.length - 1) / 2]);
      total += middle;
    }
  }
}

console.log(total);
