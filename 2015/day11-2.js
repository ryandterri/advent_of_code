import { increment } from "bb26";

const password = "hepxxyzz";

const invalid_chars = [9, 11, 15];

const is_valid_password = (password) => {
  const password_arr = password.split("").map((x) => x.charCodeAt(0) - 96);

  let first_invalid_index = -1;
  for (const invalid_char of invalid_chars) {
    const invalid_index = password_arr.indexOf(invalid_char);
    if (
      invalid_index >= 0 &&
      (first_invalid_index === -1 || invalid_index < first_invalid_index)
    ) {
      first_invalid_index = invalid_index;
    }
  }

  if (first_invalid_index >= 0) {
    password_arr[first_invalid_index] = password_arr[first_invalid_index] + 1;
    password_arr.splice(
      first_invalid_index + 1,
      Infinity,
      ...new Array(password.length - 1 - first_invalid_index).fill(1),
    );
    return {
      valid: false,
      new_password: password_arr
        .map((x) => String.fromCharCode(x + 96))
        .join(""),
    };
  }

  const has_double = /([a-z])\1.*([a-z])\2/g.test(password);
  if (!has_double) {
    return {
      valid: false,
      new_password: increment(
        password_arr
          .map((x) => String.fromCharCode(x + 96))
          .join("")
          .toUpperCase(),
      ).toLowerCase(),
    };
  }

  for (let i = 0; i < password_arr.length - 2; i++) {
    if (password_arr[i + 1] === password_arr[i] + 1) {
      if (password_arr[i + 2] === password_arr[i] + 2) {
        return { valid: true, password };
      }
    }
  }

  return {
    valid: false,
    new_password: increment(
      password_arr
        .map((x) => String.fromCharCode(x + 96))
        .join("")
        .toUpperCase(),
    ).toLowerCase(),
  };
};

let result = is_valid_password(increment(password.toUpperCase()).toLowerCase());
while (!result.valid) {
  result = is_valid_password(result.new_password);
}
console.log(result);
