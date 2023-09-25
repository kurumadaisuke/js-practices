import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

function createTable(callback) {
  const createTableSql =
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";

  db.run(createTableSql, () => {
    console.log("テーブルを作成");
    callback();
  });
}

function insertData(callback) {
  const insertDataSql = "INSERT INTO books (title) VALUES (?)";

  db.run(insertDataSql, "初めてのJavaScript", function () {
    const lastID = this.lastID;
    console.log(`データを挿入 => ID: ${lastID}`);
    callback();
  });
}

function getData(callback) {
  const getDataSql = "SELECT * FROM books";

  db.get(getDataSql, (error, book) => {
    console.log(`id:「${book.id}」 title:「${book.title}」`);
    callback();
  });
}

function deleteTable() {
  const deleteTable = "DROP TABLE books";

  db.run(deleteTable, () => {
    console.log("テーブルを削除");
  });
}

function dbClose() {
  db.close();
}

createTable(() => {
  insertData(() => {
    getData(() => {
      deleteTable(() => {
        dbClose();
      });
    });
  });
});
