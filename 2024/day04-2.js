import fs from "node:fs";

const data = fs.readFileSync("./data/input4.txt", "utf-8");

const rows = data.split("\n");
rows.pop();
const grid = rows.map((x) => x.split(""));

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

const valid_coordinates = [
  // DIAG UR -> DL
  [
    { x: 1, y: 1 },
    { x: -1, y: -1 },
  ],
  // DIAG UL -> DR
  [
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ],
];

const is_valid = (i, j, coord) => {
  const shift = { ...coord };
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

const has_x = (i, j) => {
  for (const valid_coord of valid_coordinates) {
    const index_1 = is_valid(i, j, valid_coord[0]);
    const index_2 = is_valid(i, j, valid_coord[1]);
    if (index_1 && index_2) {
      const val_1 = grid[index_1.x][index_1.y];
      const val_2 = grid[index_2.x][index_2.y];
      // console.log(i, j, index_1, index_2, val_1, val_2);
      if (
        (val_1 === "S" && val_2 === "M") ||
        (val_1 === "M" && val_2 === "S")
      ) {
        continue;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  return 1;
};

let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const key = grid[i][j];
    if (key === "A") {
      const found = has_x(i, j);
      // console.log(found);
      total += found;
      grid[i][j] = found;
    }
  }
}
console.log(total);
print_grid();
