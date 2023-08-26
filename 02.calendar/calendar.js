import minimist from "minimist";
var argv = minimist(process.argv.slice(2), {});

const year = Boolean(argv.y) == true ? argv.y : new Date().getFullYear();
const month = Boolean(argv.m) == true ? argv.m : new Date().getMonth() + 1;

let last_date = new Date(year, month, 0);
console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let i = 1; i <= last_date.getDate(); i++) {
  let padded_i = String(i).padStart(2, " ");
  let first_date = new Date(year, month - 1, i);
  if (i === 1) process.stdout.write("   ".repeat(first_date.getDay()));
  process.stdout.write(padded_i + " ");
  if (first_date.getDay() === 6) process.stdout.write("\n");
}
