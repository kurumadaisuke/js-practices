import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today =
  argv.y === undefined || argv.m === undefined ? new Date() : undefined;
const year = argv.y === undefined ? today.getFullYear() : argv.y;
const month = argv.m === undefined ? today.getMonth() + 1 : argv.m;

const lastDate = new Date(year, month, 0);
console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let countDays = 1; countDays <= lastDate.getDate(); countDays++) {
  let padDays = String(countDays).padStart(2, " ");
  let days = new Date(year, month - 1, countDays);
  if (countDays === 1) {
    process.stdout.write("   ".repeat(days.getDay()));
  }
  process.stdout.write(padDays + " ");
  if (days.getDay() === 6 || countDays === lastDate.getDate()) {
    process.stdout.write("\n");
  }
}
