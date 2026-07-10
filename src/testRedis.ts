import "dotenv/config";

import { acquireCommitLock } from "./core/version/commitLock";

async function main() {

  console.log("Testing Redis...");

  const first =
    await acquireCommitLock(
      "user123",
      "sheet123"
    );

  console.log(
    "First:",
    first
  );


  const second =
    await acquireCommitLock(
      "user123",
      "sheet123"
    );

  console.log(
    "Second:",
    second
  );
}

main();