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
      className={`border hover:bg-myPrimary border-white border-opacity-5  w-8 h-8  sm:w-16 sm:h-16 hover:cursor-pointer focus-visible:outline-none text-base  sm:text-2xl  leading-3 font-bold ${
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
      {cell.value != null && cell.value != 0
        ? cell.value
        : cell.notes.size > 0 && (
            <>
              <div className="flex sm:gap-1 justify-center items-center w-full h-full max-w-full max-h-full flex-wrap">
                {NUMBERS.map((number, index) => (
                  <div
                    key={index}
                    className="h-2 w-2 text-[8px] leading-[8px] sm:text-sx sm:leading-3 lg:text-base lg:font-bold  sm:w-3 sm:h-3 lg:leading-4 lg:w-4 lg:h-4"
                  >
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
