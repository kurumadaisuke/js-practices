import minimist from "minimist";
import * as List from "./list.js";

const argv = minimist(process.argv.slice(2));
argv.l ?? new List.List().showList();
