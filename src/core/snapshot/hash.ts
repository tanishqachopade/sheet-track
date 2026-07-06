import crypto from "crypto";


export function generateSnapshotHash(
  snapshot: unknown
) {

  const json =
    JSON.stringify(snapshot);


  return crypto
    .createHash("sha256")
    .update(json)
    .digest("hex");

}