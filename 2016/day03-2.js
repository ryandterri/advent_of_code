import fs from "node:fs";

const data = fs.readFileSync("./data/input3.txt", "utf-8");

const lines = data.split("\n");
lines.pop();
const grid = lines.map((x) =>
  x
    .trim()
    .split(/\s+/)
    .map((x) => parseInt(x)),
);

let valid = 0;

const is_triangle = (sides) => {
  console.log(sides);
  sides.sort((a, b) => a - b);
  const [a, b, c] = sides;
  return a + b > c;
};

for (let i = 0; i < grid.length; i += 3) {
  for (let j = 0; j < 3; j++) {
    if (is_triangle([grid[i][j], grid[i + 1][j], grid[i + 2][j]])) {
      valid++;
    }
  }
}

console.log(valid);
