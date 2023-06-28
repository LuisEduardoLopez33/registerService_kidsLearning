import "dotenv/config";

import Server from "./server";

(() => {
  const serve = new Server();
  try {
    serve.initialize();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
