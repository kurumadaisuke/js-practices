import sqlite3 from "sqlite3";
import readline from "readline";
import enquirer from "enquirer";

const db = new sqlite3.Database("./memos.sqlite3");

class MemoApp {
  constructor(memo) {
    this.memo = memo;
  }

  static list() {
    db.all("SELECT * FROM memos", (error, rows) => {
      rows.forEach((row) => {
        console.log(row.context);
      });
    });
  }

  static reference() {
    console.log("-r オプション");
  }

  static delete() {
    (async () => {
      const choices = await new Promise((resolve) => {
        db.all("SELECT id, context FROM memos", (error, rows) => {
          resolve(
            rows.map((row) => ({
              name: row.context,
              value: row.id,
            }))
          );
        });
      });

      const question = {
        type: "select",
        message: "Choose a note you want to delete:",
        name: "memoId",
        choices: choices,
        result() {
          return this.focused.value;
        },
      };

      const answer = await enquirer.prompt(question);
      console.log(answer.memoId);
      db.run("DELETE FROM memos WHERE id = ?", answer.memoId, () => {
        console.log(`削除が完了しました: ${answer.memoId}`);
      });
    })();
  }

  static memoData() {
    return new Promise((resolve, reject) => {
      try {
        const rl = readline.createInterface({
          input: process.stdin,
        });
        rl.once("line", (data) => {
          rl.close();
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

function insertData(data) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO memos (context) VALUES (?)", data, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

const createMemo = async function () {
  try {
    const memo = await MemoApp.memoData();
    await insertData(memo);
    console.log("データの入力が完了しました");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

export { MemoApp, createMemo };
