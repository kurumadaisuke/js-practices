import * as common_function from "./common_function.js";

const
  createTablesql = "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  insertDatasql = "INSERT INTO members (title) VALUES (?)",
  getDatasql = "SELECT * FROM members",
  deleteTablesql = "DROP TABLE members";

const async_await_func = async function () {
  await common_function.createTable(createTablesql);
  await common_function.insertData(insertDatasql, "初めてのJavaScript");
  await common_function.getData(getDatasql);
  await common_function.deleteTable(deleteTablesql);
};

async_await_func();
