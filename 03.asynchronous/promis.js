import * as async_file from "./common_function.js";

const
  createTablesql = "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  insertDatasql = "INSERT INTO members (title) VALUES (?)",
  getDatasql = "SELECT * FROM members",
  deleteTablesql = "DROP TABLE members";

async_file
  .createTable(createTablesql)
  .then(() => async_file.insertData(insertDatasql, "初めてのJavaScript"))
  .then(() => async_file.getData(getDatasql))
  .then(() => async_file.deleteTable(deleteTablesql));
