import { prisma } from "@/lib/prisma";

import {
  buildSnapshot
} from "@/core/snapshot/builder";

import {
  generateSnapshotHash
} from "@/core/snapshot/hash";


export async function createSnapshot(
  spreadsheetId: string,
  values: unknown[][],
  formulas: unknown[][]
) {

  const spreadsheet =
    await prisma.spreadsheet.findUnique({
      where: {
        id: spreadsheetId,
      },
    });


  if (!spreadsheet) {
    throw new Error(
      "Spreadsheet not found"
    );
  }


  const snapshot =
    buildSnapshot(
      values,
      formulas
    );


  const hash =
    generateSnapshotHash(
      snapshot
    );


  return prisma.snapshot.create({

    data: {
      spreadsheetId,
      data: snapshot,
      hash,
    },

  });

}