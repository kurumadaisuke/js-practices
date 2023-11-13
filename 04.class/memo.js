import sqlite3 from "sqlite3";
import MemoApp from "./memo_app.js";

const db = new sqlite3.Database("./memos.sqlite3");

function createDatabase() {
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, context TEXT)",
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });
}

const memo = async function () {
  try {
    await createDatabase();
    const memoapp = await new MemoApp(process.argv[2]);
    await memoapp.optionControllers(memoapp);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

memo();
