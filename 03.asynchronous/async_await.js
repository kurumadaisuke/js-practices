import * as async_functions from "./async_functions.js";

const createTablesql =
    "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  insertDatasql = "INSERT INTO members (title) VALUES (?)",
  getDatasql = "SELECT * FROM members",
  deleteTablesql = "DROP TABLE members";

const async_await_func = async function () {
  await async_functions.createTable(createTablesql);
  await async_functions.insertData(insertDatasql, "初めてのJavaScript");
  await async_functions.getData(getDatasql);
  await async_functions.deleteTable(deleteTablesql);
};

async_await_func();
