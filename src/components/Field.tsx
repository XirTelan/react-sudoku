import React from "react";
import { getRegion, NUMBERS } from "../utils";
import Cell from "./UI/Cell";

export default function Field(props: fieldProps) {
  const { field, statusField, isRunning, selectedCell, handleClick } = props;
  return (
    <>
      <div className="relative border-white border border-solid">
        <table className="su-field bg-mySurface    overflow-hidden text-center main-table ">
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
        {!isRunning && (
          <div className=" absolute inset-0 z-10 flex bg-mySurface bg-opacity-80 justify-center items-center text-slate-100 font-bold text-5xl text-opacity-70">
            <span>PAUSED</span>
          </div>
        )}
      </div>
    </>
  );
}

type fieldProps = {
  field: cellData[][];
  statusField: boolean[][];
  isRunning: boolean;
  selectedCell: { x: number; y: number };
  handleClick: (i: number, j: number) => void;
};
