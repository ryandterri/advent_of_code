import fs from "node:fs";

const data = fs.readFileSync("./data/input3.txt", "utf-8");

const triangles = data.split("\n");
triangles.pop();

let valid = 0;
for (const triangle of triangles) {
  const sides = triangle
    .trim()
    .split(/\s+/)
    .map((x) => parseInt(x));
  sides.sort((a, b) => a - b);
  const [a, b, c] = sides;
  if (a + b > c) {
    valid++;
  }
}

console.log(valid);
