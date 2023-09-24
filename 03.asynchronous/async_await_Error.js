import * as async_functions from "./async_functions_module.js";

const createTablesql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO books (username) VALUES (?)";
const getDatasql = "SELECT * FROM usernames";
const deleteTablesql = "DROP TABLE usernames";

const async_await_func = async function () {
  try {
    await async_functions.createTable(createTablesql);
  } catch (error) {
    console.log(error.message);
  } finally {
    await async_functions.insertData(insertDatasql, "くるまだいすけ");
    await async_functions.getData(getDatasql);
    await async_functions.deleteTable(deleteTablesql);
    await async_functions.dbClose();
  }
};

async_await_func();
