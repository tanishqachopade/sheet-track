import { generateSnapshotHash } from "./hash";


export function validateSnapshot(
  snapshot: unknown,
  storedHash: string
) {

  const currentHash =
    generateSnapshotHash(snapshot);


  return currentHash === storedHash;

}