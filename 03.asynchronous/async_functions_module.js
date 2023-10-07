import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./test.db");

function createTable(createTablesql) {
  return new Promise((resolve) => {
    db.run(createTablesql, () => {
      resolve();
    });
  });
}

function insertData(insertDatasql, data) {
  return new Promise((resolve, reject) => {
    db.run(insertDatasql, data, function (error) {
      if (error) {
        reject(error);
      } else {
        const lastID = this.lastID;
        resolve(lastID);
      }
    });
  });
}

function getData(getDatasql) {
  return new Promise((resolve, reject) => {
    db.get(getDatasql, (error, book) => {
      if (error) {
        reject(error);
      } else {
        resolve(book);
      }
    });
  });
}

function deleteTable(deleteTablesql) {
  return new Promise((resolve) => {
    db.run(deleteTablesql, () => {
      resolve();
    });
  });
}

function dbClose() {
  db.close();
}

export { createTable, insertData, getData, deleteTable, dbClose };
