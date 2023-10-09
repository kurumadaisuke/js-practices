import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)",
  () => {
    console.log("テーブルを作成");
    db.run("INSERT INTO books (title) VALUES (?)", "初めてのJavaScript", () => {
      const lastID = db.lastID;
      console.log(`データを挿入 => ID: ${lastID}`);
      db.get("SELECT * FROM books", (error, book) => {
        console.log(`id:「${book.id}」 title:「${book.title}」`);
        db.run("DROP TABLE books", () => {
          console.log("テーブルを削除");
          db.close();
        });
      });
    });
  },
);
