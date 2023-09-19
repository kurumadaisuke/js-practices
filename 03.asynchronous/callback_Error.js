import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

function createTable(callback) {
  db.run(
    "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
    (error) => {
      if (error) {
        console.error("テーブル作成エラー", error);
        callback(error);
      } else {
        console.log("テーブルを作成");
        callback();
      }
    }
  );
}

function insertData(callback) {
  db.run(
    "INSERT INTO members (username) VALUES (?)",
    "くるまだいすけ",
    function (error) {
      if (error) {
        console.error("テーブル作成エラー", error);
        callback(error);
      } else {
        const lastID = this.lastID;
        console.log(`データを挿入 => ID: ${lastID}`);
        callback();
      }
    }
  );
}

function getData(callback) {
  db.get("SELECT * FROM members", (err, row) => {
    console.log(`id:「${row.id}」 title:「${row.title}」`);
    callback();
  });
}

function deleteTable() {
  db.run("DROP TABLE members", () => {
    console.log("テーブルを削除");
  });
}

createTable((err) => {
  if (err) {
    console.error("エラー:", err);
  }
  insertData(() => {
    getData(() => {
      deleteTable(() => {
        db.close();
      });
    });
  });
});
