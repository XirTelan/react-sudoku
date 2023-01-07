type cellData = {
  value: number;
  predefined: boolean;
  notes: Set<number>;
};

type rowData = {
  cells: cellData[];
};
