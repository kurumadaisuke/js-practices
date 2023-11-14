import DatabaseManager from "./database_manager.js";

class MemoApp {
  constructor(paramsOption) {
    this.paramsOption = paramsOption;
  }

  optionControllers(option) {
    const deleteMessage = "削除したいメモを選択してください:";
    const referenceMessage = "詳細を表示したいメモを選択してください:";
    const databaseManager = new DatabaseManager();

    switch (option.paramsOption) {
      case undefined:
        databaseManager.add();
        console.log("データの入力が完了しました");
        break;
      case "-l":
        databaseManager.list();
        break;
      case "-r":
        databaseManager.reference(referenceMessage);
        break;
      case "-d":
        databaseManager.delete(deleteMessage);
        break;
      default:
        console.log("正しいオプションを指定してください");
    }
  }
}

export default MemoApp;
