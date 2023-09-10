import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

function createTable() {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
      () => {
        console.log("テーブルを作成");
        resolve();
      }
    );
  });
}

function insertData() {
  return new Promise((resolve) => {
    db.run(
      "INSERT INTO members (title) VALUES (?)",
      "初めてのJavaScript",
      function () {
        const lastID = this.lastID;
        console.log(`データを挿入 => ID: ${lastID}`);
        resolve();
      }
    );
  });
}

function getData() {
  return new Promise((resolve) => {
    db.get("SELECT * FROM members", (err, row) => {
      console.log(`id:「${row.id}」 title:「${row.title}」`);
      resolve();
    });
  });
}

function deleteTable() {
  return new Promise((resolve) => {
    db.run("DROP TABLE members", () => {
      console.log("テーブルを削除");
      resolve();
    });
  });
}

createTable()
  .then(() => insertData())
  .then(() => getData())
  .then(() => deleteTable())
  .then(() => {
    db.close;
  });
