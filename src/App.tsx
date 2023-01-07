import React, { useEffect, useState } from "react";
import "./App.css";
import { sudoku } from "./data/sudokuExample";
import Timer from "./components/Timer";
import Field from "./components/Field";
import { createField, createStatusField, NUMBERS } from "./utils";
import Keyboard from "./components/Keyboard";
import Description from "./components/Description";

function App() {
  const [isCompleted, setIsComplited] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [mainField, setMainField] = useState<cellData[][]>(() =>
    createField(sudoku.sudokuEasy[0])
  );
  const [statusField, setStatusField] = useState<boolean[][]>(() =>
    createStatusField()
  );

  const [autoCleanNotes, setAutoCleanNotes] = useState(true);
  const [notesMode, setNotesMode] = useState(false);

  useEffect(() => {
    if (!mainField || mainField.length == 0) return;
    setStatusField(() => createStatusField());
    if (!notesMode && autoCleanNotes) {
      removeRowColGridNotes(
        mainField,
        selectedCell.x,
        selectedCell.y,
        mainField[selectedCell.x][selectedCell.y].value
      );
    }
    checkSudokuField(mainField);
  }, [mainField]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function handleClick(i: number, j: number) {
    setSelectedCell({ x: i, y: j });
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key == "*") setNotesMode((prev) => !prev);
    if (selectedCell == null || (selectedCell.x == -1 && selectedCell.y == -1))
      return;
    const isNumKey = /^[0-9]$/.test(e.key) || /^Numpad[0-9]$/.test(e.code);

    if (!isNumKey) return;
    const numValue = Number.parseInt(e.key);
    if (
      !notesMode &&
      numValue == mainField[selectedCell.x][selectedCell.y].value
    )
      return;
    updateCell(numValue, selectedCell.x, selectedCell.y);
  }

  function updateCellStatus(
    statusField: boolean[][],
    i: number,
    j: number,
    value: boolean
  ) {
    if (statusField[i][j] == value) statusField;
    const newRow = [...statusField[i]];
    newRow[j] = value;
    const newRows = statusField.map((row, indx) => {
      return indx === i ? newRow : row;
    });
    return newRows;
  }

  function updateCell(
    value: number,
    i: number,
    j: number,
    isNotesRemove: boolean = false
  ) {
    if (i == -1 && j == -1) return;
    if (mainField[i][j].predefined) return;

    const newRow = mainField[i];
    const cell = newRow[j];
    if (notesMode || isNotesRemove) {
      if (value == 0) {
        cell.notes.clear();
      } else if (cell.notes.has(value)) {
        cell.notes.delete(value);
      } else if (!isNotesRemove) {
        cell.value = 0;
        cell.notes.add(value);
      }
    } else {
      cell.value = value;
      cell.notes.clear();
    }
    setMainField((rows) => {
      const newRows = rows.map((row, indx) => (indx === i ? newRow : row));
      return newRows;
    });
  }

  function removeRowColGridNotes(
    field: cellData[][],
    i: number,
    j: number,
    value: number
  ) {
    for (let y = 0; y < 9; y++) {
      if (field[i][y].notes.has(value) && y != j) {
        updateCell(value, i, y, true);
      }
    }
    for (let x = 0; x < 9; x++) {
      if (field[x][j].notes.has(value) && x != i) {
        updateCell(value, x, j, true);
      }
    }
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const rowId = Math.floor(i / 3) * 3 + x;
        const columnId = Math.floor(j / 3) * 3 + y;
        if (
          field[rowId][columnId].notes.has(value) &&
          rowId != i &&
          columnId != j
        ) {
          updateCell(value, rowId, columnId, true);
        }
      }
    }
  }

  function checkSudokuField(field: cellData[][]) {
    let isRowsClear = true;
    let isColunsClear = true;
    let isSubGridsClear = true;
    for (let i = 0; i < 9; i++) {
      const rowsStatus = checkRow(field, i);
      if (isRowsClear && !rowsStatus) isRowsClear = false;
    }

    for (let j = 0; j < 9; j++) {
      const columnStatus = checkColumn(field, j);
      if (isColunsClear && !columnStatus) isColunsClear = false;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const subGridsStatus = checkSubgrid(field, i, j);
        if (isSubGridsClear && !subGridsStatus) isSubGridsClear = false;
      }
    }
    setIsComplited(isRowsClear && isColunsClear && isSubGridsClear);
  }

  function checkRow(field: cellData[][], i: number) {
    let isClear = true;
    for (let number = 1; number <= 9; number++) {
      let indxs: { x: number; y: number }[] = [];
      for (let j = 0; j < 9; j++) {
        let num = field[i][j].value;
        if (num == 0) isClear = false;
        if (number == num) {
          indxs.push({ x: i, y: j });
        }
      }
      if (indxs.length > 1) {
        isClear = false;
        indxs.forEach((indx) =>
          setStatusField((statusField) =>
            updateCellStatus(statusField, indx.x, indx.y, true)
          )
        );
      }
    }
    return isClear;
  }
  function checkColumn(field: cellData[][], j: number) {
    let isClear = true;
    for (let number = 1; number <= 9; number++) {
      let indxs: { x: number; y: number }[] = [];
      for (let i = 0; i < 9; i++) {
        let num = field[i][j].value;
        if (num == 0) isClear = false;
        if (number == num) {
          indxs.push({ x: i, y: j });
        }
      }
      if (indxs.length > 1) {
        isClear = false;
        indxs.forEach((indx) =>
          setStatusField((statusField) =>
            updateCellStatus(statusField, indx.x, indx.y, true)
          )
        );
      }
    }
    return isClear;
  }

  function checkSubgrid(field: cellData[][], i: number, j: number) {
    let isClear = true;
    for (let number = 1; number <= 9; number++) {
      let indxs: { x: number; y: number }[] = [];
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          let num = field[i * 3 + x][j * 3 + y].value;
          if (num == 0) isClear = false;
          if (number == num) {
            indxs.push({ x: i * 3 + x, y: j * 3 + y });
          }
        }
        if (indxs.length > 1) {
          isClear = false;
          indxs.forEach((indx) =>
            setStatusField((statusField) =>
              updateCellStatus(statusField, indx.x, indx.y, true)
            )
          );
        }
      }
    }
    return isClear;
  }

  return (
    <>
      <div className=" text-center text-white text-7xl font-bold mb-4 ">
        Sudoku
      </div>
      <div className="App flex flex-col justify-center items-center h-auto">
        {mainField.length > 0 && !isCompleted ? (
          <>
            <Timer />
            <div id="field" className="flex w-full gap-1 justify-center  ">
              <div>
                <div className="flex   p-1">
                  <div className=" bg-white border border-spacing-0 rounded ">
                    <Field
                      field={mainField}
                      statusField={statusField}
                      selectedCell={selectedCell}
                      handleClick={handleClick}
                    />
                  </div>
                </div>
              </div>
              <div className="flex    justify-center">
                <Keyboard
                  notesMode={notesMode}
                  setNotesMode={setNotesMode}
                  selectedCell={selectedCell}
                  onCLick={updateCell}
                />
              </div>
            </div>
            <Description />
          </>
        ) : (
          <>
            <div className=" absolute flex h-screen w-screen bg-slate-600 justify-center items-center">
              <h2>You are win</h2>
            </div>
          </>
        )}
        ;
      </div>
    </>
  );
}

export default App;
