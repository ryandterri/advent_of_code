import crypto from "crypto";

const door_id = "ffykfhsq";
let suffix = 1;

let combo = `${door_id}${suffix}`;
let hash = crypto.createHash("md5").update(combo).digest("hex");
let password = new Array(8)
while (password.filter(x => x).length < 8) {
  suffix++;
  combo = `${door_id}${suffix}`;
  hash = crypto.createHash("md5").update(combo).digest("hex");
  if (hash.startsWith("00000")) {
    if (/[0-7]/.test(hash[5])) {
      if (!password[parseInt(hash[5])]) {
        console.log(hash, hash[5], hash[6])
        password[parseInt(hash[5])] = hash[6]
      }
    }
  }
}

console.log(combo, hash, password);
