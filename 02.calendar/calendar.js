import minimist from "minimist";

const argv = minimist(process.argv.slice(2)),
  today = new Date(),
  year = argv.y ?? today.getFullYear(),
  month = argv.m ?? today.getMonth() + 1,
  lastDate = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let countDay = 1; countDay <= lastDate.getDate(); countDay++) {
  const padDay = String(countDay).padStart(2, " ");
  const day = new Date(year, month - 1, countDay);
  if (countDay === 1) {
    process.stdout.write("   ".repeat(day.getDay()));
  }

  if (day.getDay() === 6) {
    process.stdout.write(padDay);
  } else {
    process.stdout.write(padDay + " ");
  }

  if (day.getDay() === 6 || countDay === lastDate.getDate()) {
    process.stdout.write("\n");
  }
}
