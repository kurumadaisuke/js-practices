import sqlite3 from "sqlite3";
import createOption from "./option.js";

const db = new sqlite3.Database("./memos.sqlite3");
const createMemoDatabaseSql =
  "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, context TEXT NOT NULL)";

function createDatabase() {
  return new Promise((resolve, reject) => {
    db.run(createMemoDatabaseSql, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

const memo = async function () {
  try {
    await createDatabase();
    await createOption();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

memo();
