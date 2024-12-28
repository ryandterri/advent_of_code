import fs from "fs";

const data = fs.readFileSync("./data/input7.txt", "utf-8");

const equations = data.split("\n");
equations.pop();

let result = 0;
for (const equation of equations) {
  const parts = equation.split(":");
  const test_value = parseInt(parts[0]);
  const remaining = parts[1]
    .trim()
    .split(" ")
    .map((x) => parseInt(x));
  if (
    is_valid(test_value, remaining, 0, "+") ||
    is_valid(test_value, remaining, 1, "*") ||
    is_valid(test_value, remaining, 0, "||")
  ) {
    result += test_value;
  }
}

function is_valid(test_value, remaining, total, operator) {
  const first = remaining[0];
  if (operator === "+") {
    total += first;
  } else if (operator === "*") {
    total *= first;
  } else {
    total = parseInt(`${total}${first}`);
  }
  if (total > test_value) {
    return false;
  }
  if (remaining.length === 1) {
    return total === test_value;
  } else {
    if (is_valid(test_value, remaining.slice(1), total, "+")) {
      return true;
    }
    if (is_valid(test_value, remaining.slice(1), total, "*")) {
      return true;
    }
    if (is_valid(test_value, remaining.slice(1), total, "||")) {
      return true;
    }
  }
  return false;
}

console.log(result);
