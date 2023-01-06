import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Cell from "./components/UI/Cell";
import { sudoku1 } from "./data/sudokuExample";
import Timer from "./components/Timer";

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [isCompleted, setIsComplited] = useState(false);
  const [highlightValue, setHighlightValue] = useState(0);
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [field, setField] = useState<cellData[][]>(() => createField());
  const [rowsStatus, setRowsStatus] = useState<boolean[][]>(() =>
    createStatusField()
  );
  const [notesMode, setNotesMode] = useState(false);

  function createStatusField() {
    return new Array(9).fill(new Array(9).fill(false));
  }
  function createField() {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        sudoku1[i][j] || sudoku1[i][j] != 0
          ? row.push({
              value: sudoku1[i][j],
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
  useEffect(() => {
    if (!field || field.length == 0) return;
    setHighlightValue(field[selectedCell.x][selectedCell.y].value);
    setRowsStatus((statusField) => createStatusField());
    checkSudokuField(field);
  }, [field]);

  useEffect(() => {
    if (!field || field.length == 0) return;
    setHighlightValue(field[selectedCell.x][selectedCell.y].value);
  }, [selectedCell]);

  function handleClick(i: number, j: number) {
    setSelectedCell({ x: i, y: j });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    console.log("Key pressed", e.key);
    if (selectedCell == null || (selectedCell.x == -1 && selectedCell.y == -1))
      return;
    const isNumKey = /^[0-9]$/.test(e.key) || /^Numpad[0-9]$/.test(e.code);
    if (!isNumKey) return;
    const newValue = Number.parseInt(e.key);
    updateCell(newValue);
  }
  function startNewGame(){
    
  }
  function changeFieldValue(
    statusField: boolean[][],
    i: number,
    j: number,
    value: boolean
  ) {
    if (rowsStatus[i][j] == value) statusField;
    console.log("Change  row at ", i, "col:", j);

    const newRow = [...statusField[i]];
    newRow[j] = value;
    const newRows = statusField.map((row, indx) => {
      {
        if (indx === i) console.log(row, newRow);
        return indx === i ? newRow : row;
      }
    });
    return newRows;
  }
  function updateCellStatus(
    statusField: boolean[][],
    i: number,
    j: number,
    value: boolean
  ) {
    if (rowsStatus[i][j] == value) statusField;
    console.log("Change  row at ", i, "col:", j);

    const newRow = [...statusField[i]];
    newRow[j] = value;
    const newRows = statusField.map((row, indx) => {
      {
        if (indx === i) console.log(row, newRow);
        return indx === i ? newRow : row;
      }
    });
    return newRows;
  }

  function updateCell(value: number) {
    if (selectedCell == null || (selectedCell.x == -1 && selectedCell.y == -1))
      return;
    if (field[selectedCell.x][selectedCell.y].predefined) return;
    const newRow = field[selectedCell.x];
    const cell = newRow[selectedCell.y];
    if (notesMode && value != 0) {
      cell.value = 0;
      const notes = cell.notes;
      if (notes.has(value)) notes.delete(value);
      else notes.add(value);
    } else {
      cell.value = value;
      cell.notes = new Set<number>();
    }
    setField((rows) => {
      const newRows = rows.map((row, indx) =>
        indx === selectedCell.x ? newRow : row
      );
      return newRows;
    });
  }

  function checkSudokuField(field: cellData[][]) {
    for (let i = 0; i < 9; i++) {
      checkRow2(field, i);
    }

    for (let j = 0; j < 9; j++) {
      checkColumn2(field, j);
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        checkSubgrid2(field, i, j);
      }
    }
  }

  function checkRow(field: cellData[][], i: number) {
    let numbers = new Set();
    for (let j = 0; j < 9; j++) {
      let num = field[i][j].value;
      if (!num || numbers.has(num)) {
        return false;
      }
      if (num) numbers.add(num);
    }
    return true;
  }
  function checkRow2(field: cellData[][], i: number) {
    for (let number = 1; number <= 9; number++) {
      let indxs: { x: number; y: number }[] = [];
      for (let j = 0; j < 9; j++) {
        let num = field[i][j].value;
        if (number == num) {
          indxs.push({ x: i, y: j });
        }
      }
      if (indxs.length > 1) {
        indxs.forEach((indx) =>
          setRowsStatus((statusField) =>
            updateCellStatus(statusField, indx.x, indx.y, true)
          )
        );
      }
    }
  }
  function checkColumn2(field: cellData[][], j: number) {
    for (let number = 1; number <= 9; number++) {
      let indxs: { x: number; y: number }[] = [];
      console.log("check number", number);
      for (let i = 0; i < 9; i++) {
        let num = field[i][j].value;
        console.log(i, j, num);
        if (number == num) {
          console.log("find", i, j, num, number);
          indxs.push({ x: i, y: j });
        }
      }
      console.log("indxs", indxs);
      if (indxs.length > 1) {
        indxs.forEach((indx) =>
          setRowsStatus((statusField) =>
            updateCellStatus(statusField, indx.x, indx.y, true)
          )
        );
      }
    }
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
  function checkSubgrid2(field: cellData[][], i: number, j: number) {
    for (let number = 1; number <= 9; number++) {
      let indxs: { x: number; y: number }[] = [];
      console.log("check number", number);
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          let num = field[i * 3 + x][j * 3 + y].value;
          if (number == num) {
            console.log("find", i, j, num, number);
            indxs.push({ x: i * 3 + x, y: j * 3 + y });
          }
        }
        console.log("indxs", indxs);
        if (indxs.length > 1) {
          indxs.forEach((indx) =>
            setRowsStatus((statusField) =>
              updateCellStatus(statusField, indx.x, indx.y, true)
            )
          );
        }
      }
    }
  }

  return (
    <div
      className="App flex flex-col justify-center items-center h-screen"
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <Timer />
      {field.length > 0 && (
        <>
          <div id="field" className="flex w-full gap-1 justify-center  ">
            <div className="flex   p-1">
              <div className=" bg-white border border-spacing-0 rounded ">
                <table className="su-field overflow-hidden text-center main-table ">
                  <tbody className="">
                    {field.map((rowsData, i) => (
                      <tr key={i}>
                        {rowsData.map((cell, j) => (
                          <td
                            tabIndex={0}
                            key={j}
                            className={`border  w-16 h-16 hover:cursor-pointer focus-visible:outline-none  border-slate-700 text-2xl  leading-3 font-bold ${
                              cell.predefined
                                ? " text-gray-900"
                                : "text-sky-800"
                            }  ${
                              rowsStatus[i][j]
                                ? " bg-red-900"
                                : (selectedCell.x == i &&
                                    selectedCell.y == j) ||
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
                            onClick={() => handleClick(i, j)}
                          >
                            {cell.value != null && cell.value != 0 ? (
                              cell.value
                            ) : (
                              <>
                                <div className="flex gap-1 flex-wrap">
                                  {buttons.map((number, index) => (
                                    <div key={index} className="w-4 h-4">
                                      {cell.notes.has(number) ? number : ""}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex    justify-center">
              <div className="flex  gap-1 max-w-[128px] h-fit flex-wrap">
                <div>
                  <button
                    onClick={() => setNotesMode((prevValue) => !prevValue)}
                    className={` bg-white text-black cursor-pointer  w-10 h-10  ${
                      notesMode ? " bg-slate-700" : " bg-white"
                    }`}
                  >
                    Notes
                  </button>
                </div>
                {buttons.map((button, i) => (
                  <button
                    key={i}
                    className="flex rounded shrink-0 bg-white w-10 h-10  text-center justify-center items-center"
                    onClick={() => updateCell(button)}
                  >
                    {button}
                  </button>
                ))}
              </div>
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
  predefined: boolean;
  notes: Set<number>;
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
