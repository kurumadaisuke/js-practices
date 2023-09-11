import * as async_file from "./common_function.js";

const
  createTablesql = "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  insertDatasql = "INSERT INTO members (title) VALUES (?)",
  getDatasql = "SELECT * FROM members",
  deleteTablesql = "DROP TABLE members";

const async_await_func = async function () {
  await async_file.createTable(createTablesql);
  await async_file.insertData(insertDatasql, "初めてのJavaScript");
  await async_file.getData(getDatasql);
  await async_file.deleteTable(deleteTablesql);
};

async_await_func();
