import sqlite3 from "sqlite3";
import readline from "readline";
import enquirer from "enquirer";

const db = new sqlite3.Database("./memos.sqlite3");

class MemoApp {
  static list() {
    db.all("SELECT * FROM memos", (error, memos) => {
      if (error) {
        console.error(error.message);
      } else {
        memos.forEach((memo) => {
          console.log(memo.title);
        });
      }
    });
  }

  static async reference(referenceMessage) {
    const memoId = await this.getChoiceMemoId(referenceMessage);
    const memo = await new Promise((resolve) => {
      db.get(
        "SELECT context FROM memos WHERE id = ?",
        memoId,
        (error, searchResultMemo) => {
          if (error) {
            console.error(error.message);
          } else {
            resolve(searchResultMemo);
          }
        }
      );
    });
    console.log(memo.context);
  }

  static async delete(deleteMessage) {
    const memoId = await this.getChoiceMemoId(deleteMessage);
    await new Promise((resolve) => {
      db.run("DELETE FROM memos WHERE id = ?", memoId, () => {
        resolve();
      });
    });
    console.log(`ID:${memoId}を削除しました`);
  }

  static async getChoiceMemoId(Message) {
    const choices = await new Promise((resolve) => {
      db.all("SELECT * FROM memos", (error, memos) => {
        if (error) {
          console.error(error.message);
        } else {
          resolve(
            memos.map((memo) => ({
              name: memo.title,
              value: memo.id,
            }))
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
