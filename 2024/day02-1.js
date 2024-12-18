import fs from "node:fs";

const data = fs.readFileSync("./data/input2.txt", "utf-8");
const reports = data.split("\n");
reports.pop();

let safe_count = 0;
for (const report of reports) {
  const levels = report.split(" ").map((x) => parseInt(x));
  let safe = true;
  let increasing;
  for (let i = 0; i < levels.length - 1; i++) {
    const diff = levels[i] - levels[i + 1];
    const abs_diff = Math.abs(diff);
    if (abs_diff >= 1 && abs_diff <= 3) {
      const curr_increasing = diff > 0;
      if (increasing === undefined) {
        increasing = curr_increasing;
      } else if (increasing !== curr_increasing) {
        safe = false;
        break;
      }
    } else {
      safe = false;
      break;
    }
  }

  console.log(levels, safe);
  if (safe) {
    safe_count++;
  }
}

console.log(safe_count);
