export const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function getRegion(row: number, col: number) {
  const res = Math.floor(row / 3) * 3 + Math.floor(col / 3);
  return res;
}

export function createStatusField() {
  return Array(9).fill(new Array(9).fill(false));
}

export function createField(sudoku: number[][]) {
  const arr = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      sudoku[i][j] || sudoku[i][j] != 0
        ? row.push({
            value: sudoku[i][j],
            predefined: true,
            notes: new Set<number>(),
          } as cellData)
        : row.push({
            value: 0,
            predefined: false,
            notes: new Set<number>(),
          });
    }
    arr.push(row);
  }
  return arr;
}
