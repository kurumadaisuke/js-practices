import * as async_functions from "./async_functions_module.js";

const createTablesql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertDatasql = "INSERT INTO books (title) VALUES (?)";
const getDatasql = "SELECT * FROM books";
const deleteTablesql = "DROP TABLE books";

const async_await_func = async function () {
  try {
    await async_functions.createTable(createTablesql);
    console.log("テーブルを作成");

    const lastID = await async_functions.insertData(
      insertDatasql,
      "初めてのJavaScript",
    );
    console.log(`データを挿入 => ID: ${lastID}`);

    const book = await async_functions.getData(getDatasql);
    console.log(`id:「${book.id}」 title:「${book.title}」`);

    await async_functions.deleteTable(deleteTablesql);
    console.log("テーブルを削除");

    await async_functions.dbClose();
  } catch (error) {
    if (error instanceof Error) {
      (error) => console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

async_await_func();
