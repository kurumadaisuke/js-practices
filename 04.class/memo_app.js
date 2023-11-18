import Memo from "./memo.js";

class MemoApp {
  constructor(paramsOption) {
    this.paramsOption = paramsOption;
  }

  optionControllers(option) {
    const deleteMessage = "削除したいメモを選択してください:";
    const referenceMessage = "詳細を表示したいメモを選択してください:";
    const fileName = "./memos.sqlite3";
    const memo = new Memo(fileName);

    switch (option.paramsOption) {
      case undefined:
        memo.add();
        console.log("データの入力が完了しました");
        break;

      case "-l":
        memo.list().then((memos) => {
          memos.forEach((memo) => {
            console.log(memo.title);
          });
        });
        break;

      case "-r":
        memo.reference(referenceMessage).then((searchResultMemo) => {
          console.log(searchResultMemo.context);
        });
        break;

      case "-d":
        memo.delete(deleteMessage).then((memoId) => {
          console.log(`ID:${memoId}を削除しました`);
        });
        break;

      default:
        console.log("正しいオプションを指定してください");
    }
  }
}

export default MemoApp;
