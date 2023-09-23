import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

function createTable(callback) {
  const createTableSql =
    "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";

  db.run(createTableSql, (error) => {
    if (error) {
      console.log("テーブル作成エラー");
      callback(error);
    } else {
      console.log("テーブルを作成");
      callback();
    }
  });
}

function insertData(callback) {
  const insertDataSql = "INSERT INTO members (username) VALUES (?)";

  db.run(insertDataSql, "くるまだいすけ", function (error) {
    if (error) {
      console.log("データを挿入エラー");
      callback(error);
    } else {
      const lastID = this.lastID;
      console.log(`データを挿入 => ID: ${lastID}`);
      callback();
    }
  });
}

function getData(callback) {
  const getDataSql = "SELECT * FROM username";

  db.get(getDataSql, (error, row) => {
    if (error) {
      console.log("データ取得エラー");
      callback(error);
    } else {
      console.log(`id:「${row.id}」 title:「${row.title}」`);
      callback();
    }
  });
}

function deleteTable(callback) {
  const deleteTable = "DROP TABLE username";

  db.run(deleteTable, (error) => {
    if (error) {
      console.log("データベース削除エラー");
      callback(error);
    } else {
      console.log("テーブルを削除");
      callback();
    }
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
