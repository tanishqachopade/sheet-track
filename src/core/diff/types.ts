export type ChangeType =
  | "ADD"
  | "DELETE"
  | "UPDATE"
  | "FORMULA_CHANGE"
  | "MOVE";


export interface CellChange {
  cell: string;

  type: ChangeType;

  oldValue?: unknown;
  newValue?: unknown;

  oldFormula?: string | null;
  newFormula?: string | null;
}


export interface InternalRowMove {

  type: "MOVE";

  rowHash: string;

  from: number;

  to: number;

}

export interface RowMove {

  type: "MOVE";

  from: number;

  to: number;

}