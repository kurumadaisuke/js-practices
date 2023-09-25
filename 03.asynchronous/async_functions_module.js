import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./test.db");

function createTable(createTablesql) {
  return new Promise((resolve, reject) => {
    db.run(createTablesql, (error) => {
      if (error) {
        console.log("テーブル作成エラー");
        reject(error);
      } else {
        console.log("テーブルを作成");
        resolve();
      }
    });
  });
}

function insertData(insertDatasql, data) {
  return new Promise((resolve, reject) => {
    db.run(insertDatasql, data, function (error) {
      if (error) {
        console.log("データ挿入エラー");
        reject(error);
      } else {
        const lastID = this.lastID;
        console.log(`データを挿入 => ID: ${lastID}`);
        resolve();
      }
    });
  });
}

function getData(getDatasql) {
  return new Promise((resolve, reject) => {
    db.get(getDatasql, (error, book) => {
      if (error) {
        console.log("データ取得失敗");
        reject(error);
      } else {
        console.log(`id:「${book.id}」 title:「${book.title}」`);
        resolve();
      }
    });
  });
}

function deleteTable(deleteTablesql) {
  return new Promise((resolve, reject) => {
    db.run(deleteTablesql, (error) => {
      if (error) {
        console.log("テーブル削除失敗");
        reject(error);
      } else {
        console.log("テーブルを削除");
        resolve();
      }
    });
  });
}

function dbClose() {
  db.close();
}

export { createTable, insertData, getData, deleteTable, dbClose };
