import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y ?? today.getFullYear();
const month = argv.m ?? today.getMonth() + 1;

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");

const lastDay = new Date(year, month, 0);
for (let dayCounter = 1; dayCounter <= lastDay.getDate(); dayCounter++) {
  const day = new Date(year, month - 1, dayCounter);
  if (day.getDate() === 1) {
    process.stdout.write("   ".repeat(day.getDay()));
  }

  const formattedDayString = String(day.getDate()).padStart(2, " ");
  process.stdout.write(formattedDayString);

  if (day.getDay() === 6 || day.getDate() === lastDay.getDate()) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}
