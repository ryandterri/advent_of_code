let sequence = "1321131112";
const times = 50;

for (let x = 0; x < times; x++) {
  const matches = sequence.matchAll(/(\d)\1*/g);
  let next = "";
  for (const match of matches) {
    const found = match[0];
    next += `${found.length}${found[0]}`;
  }
  sequence = next;
}
console.log(sequence.length);
