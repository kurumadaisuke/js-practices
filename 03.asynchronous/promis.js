import * as async_functions from "./async_functions.js";

const createTablesql =
  "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO members (title) VALUES (?)";
const getDatasql = "SELECT * FROM members";
const deleteTablesql = "DROP TABLE members";

async_functions
  .createTable(createTablesql)
  .then(() => async_functions.insertData(insertDatasql, "初めてのJavaScript"))
  .then(() => async_functions.getData(getDatasql))
  .then(() => async_functions.deleteTable(deleteTablesql));
