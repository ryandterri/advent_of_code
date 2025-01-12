import fs from "node:fs";

const data = fs.readFileSync("./data/input2.txt", "utf-8");

const sequences = data.split("\n");
sequences.pop();

let code = [];
let position = {
  x: 0,
  y: 2,
};
const pad = [
  [null, null, 1, null, null],
  [null, 2, 3, 4, null],
  [5, 6, 7, 8, 9],
  [null, "A", "B", "C", null],
  [null, null, "D", null, null],
];
for (const sequence of sequences) {
  const directions = sequence.split("");
  for (const direction of directions) {
    switch (direction) {
      case "U":
        position.y > 0 && pad[position.y - 1][position.x] && position.y--;
        break;
      case "D":
        position.y < 4 && pad[position.y + 1][position.x] && position.y++;
        break;
      case "L":
        pad[position.y][position.x - 1] && position.x--;
        break;
      case "R":
        pad[position.y][position.x + 1] && position.x++;
        break;
    }
  }
  code.push(pad[position.y][position.x]);
}

console.log(code);
