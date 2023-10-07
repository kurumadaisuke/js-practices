import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  () => {
    console.log("テーブルを作成");
    db.run(
      "INSERT INTO books (username) VALUES (?)",
      "くるまだいすけ",
      (error) => {
        if (error) {
          console.error(error.message);
        } else {
          const lastID = db.lastID;
          console.log(`データを挿入 => ID: ${lastID}`);
        }
        db.get("SELECT * FROM username", (error, username) => {
          if (error) {
            console.error(error.message);
          } else {
            console.log(`id:「${username.id}」 title:「${username.title}」`);
          }
          db.run("DROP TABLE books", () => {
            console.log("テーブルを削除");
            db.close();
          });
        });
      }
    );
  }
);
