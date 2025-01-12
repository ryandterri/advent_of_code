import fs from "node:fs";

const data = fs.readFileSync("./data/input2.txt", "utf-8");

const sequences = data.split("\n");
sequences.pop();

let code = [];
let position = {
  x: 1,
  y: 1,
};
for (const sequence of sequences) {
  const directions = sequence.split("");
  for (const direction of directions) {
    switch (direction) {
      case "U":
        position.y > 0 && position.y--;
        break;
      case "D":
        position.y < 2 && position.y++;
        break;
      case "L":
        position.x > 0 && position.x--;
        break;
      case "R":
        position.x < 2 && position.x++;
        break;
    }
  }
  const number = position.y * 3 + position.x + 1;
  code.push(number);
}

console.log(code);
