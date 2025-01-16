import fs from "node:fs";

const data = fs.readFileSync("./data/input4.txt", "utf-8");

const rooms = data.split("\n");
rooms.pop();

let total = 0;
for (const room of rooms) {
  const stripped = room.replaceAll("-", "");
  const matches = stripped.match(/([a-z]+)(\d+)\[([a-z]+)\]/);
  const [original, name, sector_id, checksum] = matches;
  const letters = {};
  for (const letter of name) {
    if (!letters[letter]) {
      letters[letter] = 1;
    } else {
      letters[letter]++;
    }
  }
  const counts = Object.entries(letters);
  counts.sort((a, b) => {
    if (a[1] === b[1]) {
      if (a[0] < b[0]) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return b[1] - a[1];
    }
  });
  const correct_checksum = counts
    .map((x) => x[0])
    .join("")
    .substring(0, 5);

  if (checksum === correct_checksum) {
    total += parseInt(sector_id);
  }
}
console.log(total);
