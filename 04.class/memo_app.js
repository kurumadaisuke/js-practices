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
        console.log(row.title);
      });
    });
  }

  static reference() {
    (async () => {
      const choices = await new Promise((resolve) => {
        db.all("SELECT id, title FROM memos", (error, rows) => {
          resolve(
            rows.map((row) => ({
              name: row.title,
              value: row.id,
            }))
          );
        });
      });

      const question = {
        type: "select",
        message: "Choose a note you want to see:",
        name: "memoId",
        choices: choices,
        result() {
          return this.focused.value;
        },
      };

      const answer = await enquirer.prompt(question);
      db.all(
        "SELECT context FROM memos WHERE id = ?",
        answer.memoId,
        (error, rows) => {
          console.log(rows[0].context);
        }
      );
    })();
  }

  static delete() {
    (async () => {
      const choices = await new Promise((resolve) => {
        db.all("SELECT id, title FROM memos", (error, rows) => {
          resolve(
            rows.map((row) => ({
              name: row.title,
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
      db.run("DELETE FROM memos WHERE id = ?", answer.memoId, () => {
        console.log("削除が完了しました");
      });
    })();
  }

  static memoData() {
    return new Promise((resolve, reject) => {
      try {
        const lists = [];
        const rl = readline.createInterface({
          input: process.stdin,
        });

        rl.on("line", (data) => {
          lists.push(data);
        });

        rl.on("close", () => {
          const title = lists[0];
          const context = lists.join("\n");
          db.run(
            "INSERT INTO memos (title, context) VALUES (?, ?)",
            [title, context],
            function () {}
          );
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

const createMemo = async function () {
  try {
    await MemoApp.memoData();
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
