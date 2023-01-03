import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Cell from "./components/Cell";

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [count, setCount] = useState(0);
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
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push({ value: 0, predifined: false });
      }
      arr.push(row);
    }
    setRows(arr);
  }, []);
  function handleMouseOver() {
    rows[selectedCell.x].cells[selectedCell.y].value = "9";
  }

  function handleClick(e: React.MouseEvent) {
    console.log("Click", e.target);
    setSelectedCell(overCell);
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    console.log("Key pressed", e.key);
    if (selectedCell == null || (selectedCell.x == -1 && selectedCell.y == -1))
      return;
    const newRow = rows[selectedCell.x];
    newRow.cells[selectedCell.y].value = e.key;
    setRows((rows) =>
      rows.map((row) => (rows.indexOf(row) === selectedCell.x ? newRow : row))
    );
  }

  return (
    <div className="App flex justify-center items-center h-screen">
      <div>
        {rows[1].cells[0].value} - {mouseOverRow}
      </div>
      <div id="field" className="flex gap-1  ">
        <div className="block ">
          <table
            onClick={(e) => handleClick(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="su-field overflow-hidden main-table border bg-white border-separate border-spacing-0 rounded"
          >
            <tbody className="">
              {rows.map((rowsData, i) => (
                <tr key={i}>
                  {rowsData.cells.map((cell, j) => (
                    <td
                      tabIndex={0}
                      key={j}
                      className={`  ${
                        selectedCell.x == i ||
                        selectedCell.y == j ||
                        getRegion(i, j) ==
                          getRegion(selectedCell.x, selectedCell.y)
                          ? " bg-red-500 bg-opacity-50"
                          : "bg-slate-400"
                      } hover:bg-slate-800`}
                      onMouseEnter={() => {
                        console.log(i, j);
                        setOverCell({ x: i, y: j });
                      }}
                      onMouseLeave={() => setOverCell({ x: -1, y: -1 })}
                    >
                      {i}-{j}/{cell.value != null ? cell.value : ""}
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
            >
              {button}
            </button>
          ))}
        </div>

        <button onClick={() => handleMouseOver()}>123</button>
      </div>
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
  console.log("Res", res);
  return res;
}
type cellData = {
  value: string;
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
