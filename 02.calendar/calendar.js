import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const year = Boolean(argv.y) === true ? argv.y : new Date().getFullYear();
const month = Boolean(argv.m) === true ? argv.m : new Date().getMonth() + 1;

const lastDate = new Date(year, month, 0);
console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let countDays = 1; countDays <= lastDate.getDate(); countDays++) {
  let paddDays = String(countDays).padStart(2, " ");
  let today = new Date(year, month - 1, countDays);
  if (countDays === 1) {
    process.stdout.write("   ".repeat(today.getDay()));
  }
  process.stdout.write(paddDays + " ");
  if (today.getDay() === 6 || countDays === lastDate.getDate()) {
    process.stdout.write("\n");
  }
}
