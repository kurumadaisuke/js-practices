import * as async_functions from "./async_functions_module.js";

const createTablesql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO books (title) VALUES (?)";
const getDatasql = "SELECT * FROM books";
const deleteTablesql = "DROP TABLE books";

const async_await_func = async function () {
  await async_functions.createTable(createTablesql);
  await async_functions.insertData(insertDatasql, "初めてのJavaScript");
  await async_functions.getData(getDatasql);
  await async_functions.deleteTable(deleteTablesql);
  await async_functions.dbClose();
};

async_await_func();
