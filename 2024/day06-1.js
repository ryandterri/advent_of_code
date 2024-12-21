import fs from "node:fs";

const data = fs.readFileSync("./data/input6.txt", "utf-8").trim();

// const rows = data.split('\n')
const grid = data.split("\n").map((x) => x.split(""));

const print_grid = () => {
  console.log(grid.map((x) => x.join("")).join("\n"));
};

let x, y;
let direction = "^";
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === direction) {
      x = j;
      y = i;
    }
  }
}

const is_x_valid = (val) => {
  return val >= 0 && val < grid[0].length;
};
const is_y_valid = (val) => {
  return val >= 0 && val < grid.length;
};

let complete = false;
while (!complete) {
  console.log(x, y, direction);
  grid[y][x] = "X";
  switch (direction) {
    case "^":
      if (is_y_valid(y - 1)) {
        const next = grid[y - 1][x];
        if (next === "#") direction = ">";
        else y -= 1;
      } else {
        complete = true;
      }
      break;
    case "v":
      if (is_y_valid(y + 1)) {
        const next = grid[y + 1][x];
        if (next === "#") direction = "<";
        else y += 1;
      } else {
        complete = true;
      }
      break;
    case ">":
      if (is_x_valid(x + 1)) {
        const next = grid[y][x + 1];
        if (next === "#") direction = "v";
        else x += 1;
      } else {
        complete = true;
      }
      break;
    case "<":
      if (is_x_valid(x - 1)) {
        const next = grid[y][x - 1];
        if (next === "#") direction = "^";
        else x -= 1;
      } else {
        complete = true;
      }
      break;
  }
}
print_grid();
console.log(
  grid.reduce((a, b) => a.concat(b), []).filter((x) => x === "X").length,
);
