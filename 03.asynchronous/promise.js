import * as async_functions from "./async_functions_module.js";

const createTablesql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO books (title) VALUES (?)";
const getDatasql = "SELECT * FROM books";
const deleteTablesql = "DROP TABLE books";

async_functions
  .createTable(createTablesql)
  .then(() => {
    console.log("テーブルを作成");
  })

  .then(() => async_functions.insertData(insertDatasql, "初めてのJavaScript"))
  .then((lastID) => {
    console.log(`データを挿入 => ID: ${lastID}`);
  })

  .then(() => async_functions.getData(getDatasql))
  .then((book) => {
    console.log(`id:「${book.id}」 title:「${book.title}」`);
  })

  .then(() => async_functions.deleteTable(deleteTablesql))
  .then(() => {
    console.log("テーブルを削除");
  })

  .then(() => async_functions.dbClose());
