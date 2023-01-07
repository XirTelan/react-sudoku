import React from "react";
import { getRegion, NUMBERS } from "../utils";
import Cell from "./UI/Cell";

export default function Field(props: fieldProps) {
  const { field, statusField, selectedCell, handleClick } = props;
  const isPaused = false; //Todo
  return (
    <>
      <div className="relative">
        <table className="su-field bg-mySurface overflow-hidden text-center main-table ">
          <tbody className="">
            {field.map((rowsData, i) => (
              <tr key={i}>
                {rowsData.map((cell, j) => (
                  <Cell
                    key={j}
                    posX={i}
                    posY={j}
                    highlightValue={field[selectedCell.x][selectedCell.y].value}
                    status={statusField[i][j]}
                    cell={cell}
                    selectedCell={selectedCell}
                    handleClick={handleClick}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {isPaused && <div className=" absolute inset-0 z-10 bg-white"></div>}
      </div>
    </>
  );
}

type fieldProps = {
  field: cellData[][];
  statusField: boolean[][];
  selectedCell: { x: number; y: number };
  handleClick: (i: number, j: number) => void;
};
