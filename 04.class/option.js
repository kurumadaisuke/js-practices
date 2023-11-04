import { MemoApp, createMemo } from "./memo_app.js";

class Option {
  constructor(paramsOption) {
    this.paramsOption = paramsOption;
  }

  static optionControllers(option) {
    const deleteMessage = "削除したいメモを選択してください:";
    const referenceMessage = "詳細を表示したいメモを選択してください:";

    switch (option.paramsOption) {
      case undefined:
        createMemo();
        break;
      case "-l":
        MemoApp.list();
        break;
      case "-r":
        MemoApp.reference(referenceMessage);
        break;
      case "-d":
        MemoApp.delete(deleteMessage);
        break;
      default:
        console.log("正しいオプションを指定してください");
    }
  }
}

const funcrionOptions = async function () {
  try {
    const option = await new Option(process.argv[2]);
    await Option.optionControllers(option);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

export default funcrionOptions;
