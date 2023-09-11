import * as common_function from "./common_function.js";

const
  createTablesql = "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  insertDatasql = "INSERT INTO members (title) VALUES (?)",
  getDatasql = "SELECT * FROM members",
  deleteTablesql = "DROP TABLE members";

common_function
  .createTable(createTablesql)
  .then(() => common_function.insertData(insertDatasql, "初めてのJavaScript"))
  .then(() => common_function.getData(getDatasql))
  .then(() => common_function.deleteTable(deleteTablesql));
