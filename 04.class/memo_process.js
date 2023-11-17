import sqlite3 from "sqlite3";
import enquirer from "enquirer";
import readline from "readline";

class Memo {
  constructor() {
    this.db = new sqlite3.Database("./memos.sqlite3");
    this.createDatabase;
  }

  createDatabase() {
    return new Promise((resolve, reject) => {
      this.db.run(
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

  add() {
    return new Promise((resolve, reject) => {
      try {
        const tmpMemoList = [];
        const rl = readline.createInterface({
          input: process.stdin,
        });

        rl.on("line", (memoData) => {
          tmpMemoList.push(memoData);
        });

        rl.on("close", () => {
          const title = tmpMemoList[0];
          const context = tmpMemoList.join("\n");
          this.db.run(
            "INSERT INTO memos (title, context) VALUES (?, ?)",
            [title, context],
            function () {},
          );
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async list() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos ORDER BY id ASC", (error, memos) => {
        if (error) {
          reject(error);
        } else {
          resolve(memos);
        }
      });
    });
  }

  async delete(deleteMessage) {
    const memoId = await this.getChoiceMemoId(deleteMessage);
    return await new Promise((resolve) => {
      this.db.run("DELETE FROM memos WHERE id = ?", memoId, () => {
        resolve(memoId);
      });
    });
  }

  async reference(referenceMessage) {
    const memoId = await this.getChoiceMemoId(referenceMessage);
    return await new Promise((resolve) => {
      this.db.get(
        "SELECT context FROM memos WHERE id = ?",
        memoId,
        (error, searchResultMemo) => {
          if (error) {
            console.error(error.message);
          } else {
            resolve(searchResultMemo);
          }
        },
      );
    });
  }

  async getChoiceMemoId(Message) {
    const choices = await new Promise((resolve) => {
      this.db.all("SELECT * FROM memos", (error, memos) => {
        if (error) {
          console.error(error.message);
        } else {
          resolve(
            memos.map((memo) => ({
              name: memo.title,
              value: memo.id,
            })),
          );
        }
      });
    });

    const question = {
      type: "select",
      message: `${Message}`,
      name: "memoId",
      choices: choices,
      result() {
        return this.focused.value;
      },
    };

    const answer = await enquirer.prompt(question);
    return answer.memoId;
  }
}

export default Memo;
