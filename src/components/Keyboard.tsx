import React, { SetStateAction } from "react";
import { NUMBERS } from "../utils";
import { GoPencil } from "react-icons/go";
import { BsFillEraserFill } from "react-icons/bs";

export default function Keyboard(props: keyboardProps) {
  const { notesMode, selectedCell, setNotesMode, onCLick } = props;
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex  gap-1  max-w-full sm:max-w-[160px]  lg:max-w-[260px] justify-center h-fit flex-wrap">
          <div className="flex w-full justify-center">
            <div className="flex text-white   relative justify-center mb-1 gap-1">
              <button
                onClick={() => setNotesMode((prevValue) => !prevValue)}
                className={` rounded-full cursor-pointer  text-center hover:bg-opacity-50 w-8 h-8 lg:w-16 lg:h-16  ${
                  notesMode ? " bg-myPrimary" : " bg-mySecondary bg-opacity-90"
                }`}
              >
                <div className="flex justify-center text-2xl ">
                  <GoPencil />
                </div>
              </button>
              <div
                className={`absolute hidden  sm:flex items-center justify-center  border -top-2 -right-1/4 bg-white rounded p-1 ${
                  notesMode ? " bg-myPrimary" : " bg-mySecondary bg-opacity-90"
                }`}
              >
                <span className=" text-xs">{notesMode ? "ON" : "OFF"}</span>
              </div>
            </div>
          </div>
          {NUMBERS.map((button, i) => (
            <button
              key={i}
              className={`btn-main btn-main_key`}
              onClick={() => onCLick(button, selectedCell.x, selectedCell.y)}
            >
              {button}
            </button>
          ))}
        </div>
        <div className="flex mt-1 justify-center">
          <button
            onClick={() => onCLick(0, selectedCell.x, selectedCell.y)}
            className={`btn-main btn-main_key`}
          >
            <BsFillEraserFill />
          </button>
        </div>
      </div>
    </>
  );
}

type keyboardProps = {
  selectedCell: { x: number; y: number };
  notesMode: boolean;
  setNotesMode: React.Dispatch<SetStateAction<boolean>>;
  onCLick: (value: number, i: number, j: number) => void;
};
