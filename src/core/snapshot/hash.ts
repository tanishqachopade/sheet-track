import crypto from "crypto";
import stringify from "json-stable-stringify";


export function generateSnapshotHash(
  snapshot: unknown
) {

  const json = stringify(snapshot);


  if (!json) {
    throw new Error(
      "Invalid snapshot data"
    );
  }


  return crypto
    .createHash("sha256")
    .update(json)
    .digest("hex");

}