import React from "react";
import { getRegion, NUMBERS } from "../../utils";

export default function Cell(props: cellProps) {
  const {
    posX,
    posY,
    cell,
    selectedCell,
    status,
    highlightValue,
    handleClick,
  } = props;
  return (
    <td
      tabIndex={0}
      className={`border hover:bg-myPrimary border-white border-opacity-5   w-16 h-16 hover:cursor-pointer focus-visible:outline-none  text-2xl  leading-3 font-bold ${
        cell.predefined ? " text-slate-100" : "text-mySecondary"
      }  ${
        selectedCell.x == posX && selectedCell.y == posY
          ? "bg-myPrimary"
          : status
          ? "  bg-myError"
          : highlightValue != 0 && highlightValue === cell.value
          ? " bg-myPrimary bg-opacity-70 "
          : selectedCell.x == posX ||
            selectedCell.y == posY ||
            getRegion(posX, posY) == getRegion(selectedCell.x, selectedCell.y)
          ? " bg-white bg-opacity-20 "
          : " bg-white bg-opacity-5"
      } `}
      onClick={() => handleClick(posX, posY)}
    >
      {cell.value != null && cell.value != 0 ? (
        cell.value
      ) : (
        <>
          <div className="flex gap-1 flex-wrap">
            {NUMBERS.map((number, index) => (
              <div key={index} className="w-4 h-4">
                {cell.notes.has(number) ? number : ""}
              </div>
            ))}
          </div>
        </>
      )}
    </td>
  );
}

type cellProps = {
  posX: number;
  posY: number;
  status: boolean;
  cell: cellData;
  highlightValue: number;
  selectedCell: { x: number; y: number };
  handleClick: (i: number, j: number) => void;
};
