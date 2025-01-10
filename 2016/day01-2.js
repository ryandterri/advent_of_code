import fs from "node:fs";

const data = fs.readFileSync("./data/input.txt", "utf-8");
const instructions = data.split(", ");

let position = {
  x: 0,
  y: 0,
  direction: "N",
};

let visited = {};
let found = false;

for (const instruction of instructions) {
  const direction = instruction.substring(0, 1);
  const distance = parseInt(instruction.substring(1));
  const shift = { x: 0, y: 0 };
  switch (position.direction) {
    case "N":
      if (direction === "L") {
        position.direction = "W";
        shift.x = -1;
      } else {
        position.direction = "E";
        shift.x = 1;
      }
      break;
    case "S":
      if (direction === "L") {
        position.direction = "E";
        shift.x = 1;
      } else {
        position.direction = "W";
        shift.x = -1;
      }
      break;
    case "E":
      if (direction === "L") {
        position.direction = "N";
        shift.y = 1;
      } else {
        position.direction = "S";
        shift.y = -1;
      }
      break;
    case "W":
      if (direction === "L") {
        position.direction = "S";
        shift.y = -1;
      } else {
        position.direction = "N";
        shift.y = 1;
      }
      break;
  }

  for (let i = 0; i < distance; i++) {
    position.x += shift.x;
    position.y += shift.y;
    const coord = `${position.x},${position.y}`;
    if (visited[coord]) {
      found = true;
      break;
    } else {
      visited[coord] = true;
    }
  }

  if (found) {
    break;
  }
}

console.log(position, Math.abs(position.x) + Math.abs(position.y));
