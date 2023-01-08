import React from "react";
import { sudokuLevels } from "../data/sudokuExample";
import { createField } from "../utils";

export default function LevelSelect({ setLevel }: levelSelectProps) {
  function loadData(index: number) {
    const levelCount = sudokuLevels[index].levels.length;
    console.log(levelCount);
    setLevel(createField(sudokuLevels[index].levels[GetRandomLvl(levelCount)]));
  }

  function GetRandomLvl(max: number) {
    return Math.floor(Math.random() * max);
  }
  return (
    <div className="flex flex-col w-40 gap-3  items-center justify-center">
      {sudokuLevels.map((levelType, index) => (
        <button
          className="text-slate-100 p-3 w-full font-bold rounded cursor-pointer bg-mySecondary hover:bg-opacity-80"
          key={index}
          onClick={() => loadData(index)}
        >
          {levelType.title}
        </button>
      ))}
    </div>
  );
}
type levelSelectProps = {
  setLevel: React.Dispatch<React.SetStateAction<cellData[][]>>;
};
