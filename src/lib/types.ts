export type TileShape =
  | "normal"
  | "horizontal"
  | "vertical"
  | "small"
  | "horizontal-long"
  | "vertical-long";

type _LineTypeColOrRow = `${"row" | "col"}${number}`;
export type LineType = `${"card" | "tlbr" | "bltr" | _LineTypeColOrRow}`;
