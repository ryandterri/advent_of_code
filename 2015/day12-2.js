import fs from "fs";

const data = fs.readFileSync("./data/input12.txt");
const json = JSON.parse(data);

const get_numbers = (json) => {
  if (json === "red") {
    return false;
  }
  const numbers = [];
  if (Array.isArray(json)) {
    for (const item of json) {
      const number = get_numbers(item);
      if (number) {
        numbers.push(number);
      }
    }
  } else if (typeof json === "number") {
    return json;
  } else if (typeof json === "object") {
    const values = Object.values(json);
    for (const value of values) {
      const number = get_numbers(value);
      if (number === false) {
        return 0;
      }
      if (number) {
        numbers.push(number);
      }
    }
  }
  return numbers.reduce((a, b) => (a += b), 0);
};

console.log(get_numbers(json));
