import fs from "node:fs";

const data = fs.readFileSync("./data/input4.txt", "utf-8");

const rooms = data.split("\n");
rooms.pop();

const valid_rooms = [];
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
    valid_rooms.push({
      name,
      letters,
      checksum,
      sector_id: parseInt(sector_id),
    });
  }
}

for (const valid_room of valid_rooms) {
  const decrypted = [];
  for (let i = 0; i < valid_room.name.length; i++) {
    const adjusted =
      (valid_room.name.charCodeAt(i) - 96 + valid_room.sector_id) % 26;
    decrypted.push(String.fromCharCode(adjusted + 96));
  }
  console.log(decrypted.join(""), valid_room.sector_id);
}
