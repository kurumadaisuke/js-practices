import MemoApp from "./memo_app.js";

const memo = async function () {
  try {
    const memoapp = await new MemoApp(process.argv[2]);
    await memoapp.optionControllers(memoapp);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(new Error(error));
    }
  }
};

memo();
