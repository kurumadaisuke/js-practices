import { MemoApp, createMemo } from "./memo_app.js";

class Option {
  constructor(paramsOption) {
    this.paramsOption = paramsOption;
  }

  static parseOption(option) {
    switch (option.paramsOption) {
      case undefined:
        createMemo();
        break;
      case "-l":
        MemoApp.list();
        break;
      case "-r":
        MemoApp.reference();
        break;
      case "-d":
        MemoApp.delete();
        break;
      default:
        console.log("正しいオプションを指定してください");
    }
  }
}

function paramsOption() {
  return new Promise((resolve, reject) => {
    const paramsOption = process.argv[2];
    try {
      const option = new Option(paramsOption);
      resolve(option);
    } catch (error) {
      reject(error);
    }
  });
}

const createOption = async function () {
  try {
    const option = await paramsOption();
    await Option.parseOption(option);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

export default createOption;
