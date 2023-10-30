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
      if (error) {
        console.error(error.message);
      } else {
        rows.map((row) => {
          console.log(`No ${row.id}: ${row.context}`);
        });
      }
    });
  }

  static reference() {
    console.log("-r オプション");
  }

  static delete() {
    (async () => {
      const question = {
        type: "select",
        name: "title",
        message: "Choose a note you want to delete:",
        choices: this.list,
      };
      const answer = await enquirer.prompt(question);
      console.log(`僕も${answer.title}が好きだよ`);
    })();
  }
}

function memoData() {
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
    const memo = await memoData();
    await new MemoApp(memo);
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
