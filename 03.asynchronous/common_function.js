import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

function createTable(createTablesql) {
  return new Promise((resolve) => {
    db.run(createTablesql, () => {
      console.log("テーブルを作成");
      resolve();
    });
  });
}

function insertData(insertDatasql, data) {
  return new Promise((resolve) => {
    db.run(insertDatasql, data, function () {
      const lastID = this.lastID;
      console.log(`データを挿入 => ID: ${lastID}`);
      resolve();
    });
  });
}

function getData(getDatasql) {
  return new Promise((resolve) => {
    db.get(getDatasql, (err, row) => {
      console.log(`id:「${row.id}」 title:「${row.title}」`);
      resolve();
    });
  });
}

function deleteTable(deleteTablesql) {
  return new Promise((resolve) => {
    db.run(deleteTablesql, () => {
      console.log("テーブルを削除");
      resolve();
    });
  });
}

export { createTable, insertData, getData, deleteTable };
