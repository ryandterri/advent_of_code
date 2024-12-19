import fs from "node:fs";

const data = fs.readFileSync("./data/input4.txt", "utf-8");

const rows = data.split("\n");
rows.pop();
const grid = rows.map((x) => x.split(""));

const map = {
  X: "M",
  M: "A",
  A: "S",
};

const dir_map = {
  U: { x: 1, y: 0 },
  D: { x: -1, y: 0 },
  L: { x: 0, y: -1 },
  R: { x: 0, y: 1 },
  UL: { x: 1, y: -1 },
  UR: { x: 1, y: 1 },
  DR: { x: -1, y: 1 },
  DL: { x: -1, y: -1 },
};

const directions = ["U", "D", "L", "R", "UL", "UR", "DL", "DR"];

const is_valid = (i, j, direction) => {
  const shift = { ...dir_map[direction] };
  shift.x += i;
  shift.y += j;
  if (
    shift.x >= 0 &&
    shift.y >= 0 &&
    shift.x < grid[0].length &&
    shift.y < grid.length
  ) {
    return shift;
  } else {
    return null;
  }
};

const print_grid = () => {
  console.log();
  console.log(grid.map((x) => x.join("")).join("\n"));
  console.log();
};

const traverse = (i, j, direction) => {
  const key = grid[i][j];
  const next = map[key];
  // console.log(key, next);
  if (next) {
    const shift = is_valid(i, j, direction);
    if (shift) {
      const neighbor = grid[shift.x][shift.y];
      // console.log(shift, neighbor);
      if (neighbor === next) {
        return traverse(shift.x, shift.y, direction);
      }
    }
    return 0;
  }
  return 1;
};

let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const key = grid[i][j];
    if (key === "X") {
      let found = 0;
      for (const direction of directions) {
        const shift = is_valid(i, j, direction);
        if (shift) {
          const neighbor = grid[shift.x][shift.y];
          if (neighbor === "M") {
            const count = traverse(shift.x, shift.y, direction);
            found += count;
          }
        }
      }
      total += found;
      grid[i][j] = found;
    }
  }
}
console.log(total);
print_grid();
