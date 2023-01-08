import React from "react";

export default function Description() {
  return (
    <div className=" container text-white bg-white rounded mt-10  bg-opacity-10 p-4">
      <div className="post ">
        <div className="entry-content">
          <h2 className="title text-mySecondary">Keyboard Control</h2>
          <p>
            You can also use the keyboard <br />
            <span className="text-mySecondary">1-9</span> on the keyboard to put
            a number in a cell. <br />
            <span className="text-mySecondary">0</span> - to clear the cell.
            <br />
            <span className="text-mySecondary">*</span> - to enable and disable
            note mode
          </p>
          <h2 className="title  text-mySecondary">
            How to play beginner Sudoku puzzles?
          </h2>
          <p>
            The goal of Sudoku is to fill the cells with numbers from 1 to 9.
            The numbers are placed in 9 squares, 3x3 each, thus, in each row, in
            each column and in each small square there are 9 cells. The same
            digit can be used only once in each separate column, each line and
            in each small square. The level of difficulty depends on how many
            digits are already indicated in the cells. If you open plenty of
            numbers - then you have very easy Sudoku.
          </p>
        </div>
      </div>
    </div>
  );
}
