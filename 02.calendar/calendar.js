import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y ?? today.getFullYear();
const month = argv.m ?? today.getMonth() + 1;
const lastDay = new Date(year, month, 0);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

for (let dayCounter = 1; dayCounter <= lastDay.getDate(); dayCounter++) {
  const formattedDayString = String(dayCounter).padStart(2, " ");
  const day = new Date(year, month - 1, dayCounter);
  if (dayCounter === 1) {
    process.stdout.write("   ".repeat(day.getDay()));
  }

  process.stdout.write(formattedDayString);

  if (day.getDay() === 6 || dayCounter === lastDay.getDate()) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
