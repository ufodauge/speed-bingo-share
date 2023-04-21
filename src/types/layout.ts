export const LayoutNames = ["horizontal", "vertical", "card"] as const;
export type LayoutName = typeof LayoutNames[number];

export const isLayoutName = (v: string): v is LayoutName =>
  LayoutNames.includes(v as LayoutName);

export type LayoutProps = {
  headerHeight: number;
  cellWidth: number;
  cellHeight: number;
};

export const DefaultLayouts: { [key in LayoutName]: LayoutProps } = {
  horizontal: {
    headerHeight: 30,
    cellWidth: 180,
    cellHeight: 100,
  },
  vertical: {
    headerHeight: 30,
    cellWidth: 220,
    cellHeight: 120,
  },
  card: {
    headerHeight: 30,
    cellWidth: 160,
    cellHeight: 160,
  },
} as const;
