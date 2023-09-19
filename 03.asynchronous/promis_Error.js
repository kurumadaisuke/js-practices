import * as async_functions from "./async_functions.js";

const createTablesql =
    "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  insertDatasql = "INSERT INTO members (title) VALUES (?)",
  getDatasql = "SELECT * FROM members",
  deleteTablesql = "DROP TABLE members";

async_functions
  .createTable(createTablesql)
  .then(() => async_functions.insertData(insertDatasql, "初めてのJavaScript"))
  .catch((error) => console.log(error.message))
  .then(() => async_functions.getData(getDatasql))
  .catch((error) => console.log(error.message))
  .then(() => async_functions.deleteTable(deleteTablesql));
