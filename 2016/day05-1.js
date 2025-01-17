import crypto from "crypto";

const door_id = "ffykfhsq";
let suffix = 1;

let combo = `${door_id}${suffix}`;
let hash = crypto.createHash("md5").update(combo).digest("hex");
let password = [];
while (password.length < 8) {
  suffix++;
  combo = `${door_id}${suffix}`;
  hash = crypto.createHash("md5").update(combo).digest("hex");
  if (hash.startsWith("00000")) {
    password.push(hash[5]);
  }
}

console.log(combo, hash, password);
