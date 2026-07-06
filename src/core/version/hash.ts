import crypto from "crypto";

export function hashSnapshot(snapshot: unknown) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(snapshot))
    .digest("hex");
}