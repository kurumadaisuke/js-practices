import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

function createTable(callback) {
  const createTableSql =
    "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";

  db.run(createTableSql, () => {
    console.log("テーブルを作成");
    callback();
  });
}

function insertData(callback) {
  const insertDataSql = "INSERT INTO members (title) VALUES (?)";

  db.run(insertDataSql, "初めてのJavaScript", function () {
    const lastID = this.lastID;
    console.log(`データを挿入 => ID: ${lastID}`);
    callback();
  });
}

function getData(callback) {
  const getDataSql = "SELECT * FROM members";

  db.get(getDataSql, (err, row) => {
    console.log(`id:「${row.id}」 title:「${row.title}」`);
    callback();
  });
}

function deleteTable() {
  const deleteTable = "DROP TABLE members";

  db.run(deleteTable, () => {
    console.log("テーブルを削除");
  });
}

function dbClose() {
  db.close();
}

createTable((error) => {
  if (error) {
    console.log("エラーメッセージ:", error.message);
  }
  insertData((error) => {
    if (error) {
      console.log("エラーメッセージ:", error.message);
    }
    getData((error) => {
      if (error) {
        console.log("エラーメッセージ:", error.message);
      }
      deleteTable((error) => {
        if (error) {
          console.log("エラーメッセージ:", error.message);
        }
        dbClose();
      });
    });
  });
});
