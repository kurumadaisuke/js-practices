import * as async_functions from "./async_functions_module.js";

const createTablesql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO books (username) VALUES (?)";
const getDatasql = "SELECT * FROM usernames";
const deleteTablesql = "DROP TABLE usernames";

async_functions
  .createTable(createTablesql)
  .then(() => {
    console.log("テーブルを作成");
  })
  .then(() => async_functions.insertData(insertDatasql, "くるまだいすけ"))
  .catch((error) => {
    console.error(error.message);
    return async_functions.getData(getDatasql);
  })
  .catch((error) => {
    console.error(error.message);
    return async_functions.deleteTable(deleteTablesql);
  })
  .then(() => {
    console.log("テーブルを削除");
    return async_functions.dbClose();
  });
