import * as async_functions from "./async_functions.js";

const createTablesql =
  "CREATE TABLE members (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO members (username) VALUES (?)";
const getDatasql = "SELECT * FROM users";
const deleteTablesql = "DROP TABLE members";

const async_await_func = async function () {
  try {
    await async_functions.createTable(createTablesql);
    await async_functions.insertData(insertDatasql, "くるまだいすけ");
    await async_functions.getData(getDatasql);
    await async_functions.deleteTable(deleteTablesql);
  } catch (error) {
    console.log(error.message);
  } finally {
    await async_functions.createTable(createTablesql);
    await async_functions.insertData(insertDatasql, "くるまだいすけ");
    await async_functions.getData(getDatasql);
    await async_functions.deleteTable(deleteTablesql);
  }
};

async_await_func();
