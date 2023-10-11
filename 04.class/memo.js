import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./memos.sqlite3");
const checkTableExistsSql = db.get(
  "SELECT COUNT(*) FROM sqlite_master WHERE TYPE='table' AND name='memos'"
);

console.log(checkTableExistsSql);

db.run(
  "CREATE TABLE memos (id INTEGER PRIMARY KEY AUTOINCREMENT, context TEXT NOT NULL)"
);

process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function (data) {
  console.log(data);
});
