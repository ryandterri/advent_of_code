import fs from "node:fs";

const data = fs.readFileSync("./data/input2.txt", "utf-8");
const reports = data.split("\n");
reports.pop();

const is_safe = (levels) => {
  let increasing;
  for (let i = 0; i < levels.length - 1; i++) {
    const diff = levels[i] - levels[i + 1];
    const abs_diff = Math.abs(diff);
    if (abs_diff >= 1 && abs_diff <= 3) {
      const curr_increasing = diff > 0;
      if (increasing === undefined) {
        increasing = curr_increasing;
      } else if (increasing !== curr_increasing) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};

let safe_count = 0;
for (const report of reports) {
  const levels = report.split(" ").map((x) => parseInt(x));
  for (let i = 0; i < levels.length; i++) {
    const copy = [...levels];
    copy.splice(i, 1);
    if (is_safe(copy)) {
      safe_count++;
      break;
    }
  }
}

console.log(safe_count);
