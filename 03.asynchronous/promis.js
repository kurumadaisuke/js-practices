import * as async_functions from "./async_functions.js";

const createTablesql =
    "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  insertDatasql = "INSERT INTO members (title) VALUES (?)",
  getDatasql = "SELECT * FROM members",
  deleteTablesql = "DROP TABLE members";

async_functions
  .createTable(createTablesql)
  .then(() => async_functions.insertData(insertDatasql, "初めてのJavaScript"))
  .then(() => async_functions.getData(getDatasql))
  .then(() => async_functions.deleteTable(deleteTablesql));
