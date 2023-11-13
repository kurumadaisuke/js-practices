import sqlite3 from "sqlite3";
import readline from "readline";
import enquirer from "enquirer";

const db = new sqlite3.Database("./memos.sqlite3");

class MemoApp {
  constructor(paramsOption) {
    this.paramsOption = paramsOption;
  }

  optionControllers(option) {
    const deleteMessage = "削除したいメモを選択してください:";
    const referenceMessage = "詳細を表示したいメモを選択してください:";

    switch (option.paramsOption) {
      case undefined:
        this.add();
        console.log("データの入力が完了しました");
        break;
      case "-l":
        this.list();
        break;
      case "-r":
        this.reference(referenceMessage);
        break;
      case "-d":
        this.delete(deleteMessage);
        break;
      default:
        console.log("正しいオプションを指定してください");
    }
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

  list() {
    db.all("SELECT * FROM memos ORDER BY id ASC", (error, memos) => {
      if (error) {
        console.error(error.message);
      } else {
        memos.forEach((memo) => {
          console.log(memo.title);
        });
      }
    });
  }

  async reference(referenceMessage) {
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

  async delete(deleteMessage) {
    const memoId = await this.getChoiceMemoId(deleteMessage);
    await new Promise((resolve) => {
      db.run("DELETE FROM memos WHERE id = ?", memoId, () => {
        resolve();
      });
    });
    console.log(`ID:${memoId}を削除しました`);
  }

  async getChoiceMemoId(Message) {
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
}

export default MemoApp;
