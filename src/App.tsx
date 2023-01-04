import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Cell from "./components/Cell";
import { sudoku1 } from "./data/sudokuExample";

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsComplited] = useState(false);
  const [highlightValue, setHighlightValue] = useState(0);
  const [mouseOverColumn, setMouseOverColumn] = useState<number | null>();
  const [mouseOverRow, setMouseOverRow] = useState<number | null>();
  const [overCell, setOverCell] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });
  const [rows, setRows] = useState<cellData[][]>([]);
  const [rowsStatus, setRowsStatus] = useState<boolean[][]>(
    new Array(9).fill(new Array(9).fill(false))
  );

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        sudoku1[i][j] || sudoku1[i][j] != 0
          ? row.push({
              value: sudoku1[i][j],
              predefined: true,
              duplicate: false,
            } as cellData)
          : row.push({
              value: 0,
              predefined: false,
              duplicate: false,
            });
      }
      arr.push(row);
    }
    setRows(arr);
    console.log("asd", arr);
  }, []);

  useEffect(() => {
    console.log("Status Check", rowsStatus);
    if (!rows || rows.length == 0) return;
    setIsComplited(checkSudokuField(rows));
  }, [rows]);

  useEffect(() => {
    if (!rows || rows.length == 0) return;
    setHighlightValue(rows[selectedCell.x][selectedCell.y].value);
  }, [selectedCell]);

  function handleClick(e: React.MouseEvent) {
    console.log("Click", e.target);
    setSelectedCell(overCell);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    console.log("Key pressed", e.key);
    if (selectedCell == null || (selectedCell.x == -1 && selectedCell.y == -1))
      return;
    const isNumKey = /^[1-9]$/.test(e.key) || /^Numpad[1-9]$/.test(e.code);
    if (!isNumKey) return;
    updateCellValue(Number.parseInt(e.key));
    console.log("new rows", rows);
  }

  function updateCellStatus(i: number, j: number, value: boolean) {
    console.log("Change  row at ", i, "col:", j);
    const newRow = [...rowsStatus[i]];
    newRow[j] = value;
    setRowsStatus((rows) => {
      const newRows = rowsStatus.map((row, indx) => {
        {
          console.log("INDx:", indx, "Row", row);
          return indx === i ? newRow : row;
        }
      });
      return newRows;
    });
  }

  function updateCellValue(value: number) {
    if (selectedCell == null || (selectedCell.x == -1 && selectedCell.y == -1))
      return;
    if (rows[selectedCell.x][selectedCell.y].predefined) return;

    const newRow = rows[selectedCell.x];
    newRow[selectedCell.y].value = value;
    setRows((rows) => {
      const newRows = rows.map((row, indx) =>
        indx === selectedCell.x ? newRow : row
      );
      return newRows;
    });
  }

  console.log("ROws", rows);

  function checkSudokuField(field: cellData[][]) {
    for (let i = 0; i < 9; i++) {
      if (!checkRow(field, i)) {
        console.log("row fail");

        return false;
      }
    }

    for (let j = 0; j < 9; j++) {
      if (!checkColumn(field, j)) {
        console.log("col fail");
        return false;
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!checkSubgrid(field, i, j)) {
          console.log("subgrid fail");
          return false;
        }
      }
    }

    return true;
  }

  function checkRow(field: cellData[][], i: number) {
    let numbers = new Set();
    for (let j = 0; j < 9; j++) {
      let num = field[i][j].value;
      if (!num || numbers.has(num)) {
        console.log(i, j);
        return false;
      }
      if (num) numbers.add(num);
    }
    return true;
  }

  function checkColumn(field: cellData[][], j: number) {
    let numbers = new Set();
    for (let i = 0; i < 9; i++) {
      let num = field[i][j].value;
      if (!num || numbers.has(num)) {
        console.log(i, j);
        return false;
      }
      if (num) numbers.add(num);
    }
    return true;
  }

  function checkSubgrid(field: cellData[][], i: number, j: number) {
    let numbers = new Set();
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        let num = field[i * 3 + x][j * 3 + y].value;
        if (!num || numbers.has(num)) {
          return false;
        }
        if (num) numbers.add(num);
      }
    }
    return true;
  }

  return (
    <div className="App flex justify-center items-center h-screen">
      {rows.length > 0 && (
        <>
          <div>
            {rows[1][0].value} - {mouseOverRow}
          </div>
          <div id="field" className="flex gap-1  ">
            <div className="flex border bg-white border-spacing-0 rounded p-1">
              <table
                onClick={(e) => handleClick(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                className="su-field overflow-hidden text-center main-table "
              >
                <tbody className="">
                  {rows.map((rowsData, i) => (
                    <tr key={i}>
                      {rowsData.map((cell, j) => (
                        <td
                          tabIndex={0}
                          key={j}
                          className={`border border-slate-700 ${
                            rowsStatus[i][j]
                              ? " bg-red-900"
                              : (selectedCell.x == i && selectedCell.y == j) ||
                                (highlightValue != 0 &&
                                  highlightValue === cell.value)
                              ? " bg-red-500"
                              : selectedCell.x == i ||
                                selectedCell.y == j ||
                                getRegion(i, j) ==
                                  getRegion(selectedCell.x, selectedCell.y)
                              ? " bg-red-300 bg-opacity-50"
                              : "bg-slate-400"
                          } hover:bg-slate-800`}
                          onMouseEnter={() => {
                            console.log(i, j);
                            setOverCell({ x: i, y: j });
                          }}
                          onMouseLeave={() => setOverCell({ x: -1, y: -1 })}
                        >
                          {cell.value != null && cell.value != 0
                            ? cell.value
                            : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-1 h-fit flex-wrap max-w-[128px] justify-center">
              {buttons.map((button, i) => (
                <button
                  key={i}
                  className="flex rounded bg-white w-20 h-20 text-center justify-center items-center"
                  onClick={() => updateCellValue(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>

          {isCompleted && (
            <>
              <div className=" absolute flex h-screen w-screen bg-slate-600 justify-center items-center">
                <h2>You are win</h2>
              </div>
            </>
          )}
        </>
      )}
      ;
    </div>
  );
}

export default App;

const cell = (i: number, j: number) => {
  return (
    <div className=" bg-white h-10 w-10">
      {i} - {j}
    </div>
  );
};

function inRange(low: number, high: number, x: number) {
  return (x - high) * (x - low) <= 0;
}

function getRegion(row: number, col: number) {
  const res = Math.floor(row / 3) * 3 + Math.floor(col / 3);
  return res;
}
type cellData = {
  value: number;
  duplicate: boolean;
  predefined: boolean;
};

type rowData = {
  cells: cellData[];
};
// {fieldData.map((rows, i) => {
//   console.log(rows);
//   const res = rows.map((row, j) => (
//     <Cell
//       x={i}
//       y={j}
//       update={() => {
//         handleMouseOver(i, j);
//       }}
//     />
//   ));
//   console.log("res", res);
//   return res;
// })}
