import * as async_functions from "./async_functions.js";

const createTablesql =
  "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO members (username) VALUES (?)";
const getDatasql = "SELECT * FROM users";
const deleteTablesql = "DROP TABLE members";

async_functions
  .createTable(createTablesql)
  .then(() => async_functions.insertData(insertDatasql, "くるまだいすけ"))
  .catch((error) => console.log(error.message))
  .then(() => async_functions.getData(getDatasql))
  .catch((error) => console.log(error.message))
  .then(() => async_functions.deleteTable(deleteTablesql));
