import fs from "fs";

const data = fs.readFileSync("./data/input.txt", { encoding: "utf-8" });
const lines = data.split("\n");

let sum = 0;
for (const line of lines) {
  const matches = line.match(/\d+/g);
  const joined = matches.join("");
  const first = joined[0];
  const last = joined[joined.length - 1];
  const number = parseInt(`${first}${last}`);
  sum += number;
}
console.log(sum);
