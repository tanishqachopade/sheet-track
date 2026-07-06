export type SnapshotCell = {
  value: string | number | boolean | null;
  formula: string | null;
};


export type SnapshotData = {
  cells: Record<string, SnapshotCell>;
};


function getColumnLetter(index: number) {
  let column = "";

  index++;

  while (index > 0) {
    const remainder = (index - 1) % 26;

    column =
      String.fromCharCode(65 + remainder) +
      column;

    index = Math.floor((index - 1) / 26);
  }

  return column;
}


export function buildSnapshot(
  values: any[][],
  formulas: any[][]
): SnapshotData {

  const cells: Record<string, SnapshotCell> = {};


  values.forEach((row, rowIndex) => {

    row.forEach((value, colIndex) => {

      const address =
        `${getColumnLetter(colIndex)}${rowIndex + 1}`;


      cells[address] = {
        value,
        formula:
          formulas?.[rowIndex]?.[colIndex] || null,
      };

    });

  });


  return {
    cells,
  };
}