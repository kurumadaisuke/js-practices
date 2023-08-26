import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./test.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE callbacks (id INT AUTO_INCREMENT, name VARCHAR(10), PRIMARY KEY (id))",
  );
  const name = "KURUMA DAISUKE";
  db.run("INSERT INTO callbacks (name) VALUES (?)", [name]);
  db.close();
});
