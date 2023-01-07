import React from "react";

export default function Description() {
  return (
    <div className=" container text-white bg-white rounded mt-10  bg-opacity-10 p-4">
      <div className="post ">
        <h1 className="title">Easy Sudoku for beginners</h1>
        <div className="entry-content">
          <p>
            Easy Sudoku is characterized by the fact that cells contain more
            numbers than medium or hard ones. It makes this game suitable for
            beginners and those who have never played Sudoku before.
          </p>
          <p>
            Sudoku is one of the most popular games to develop your
            intelligence. Supposedly, it was invented in 1970 by Dell's puzzler
            in New York, who published it in his journal “Mathematical Puzzles
            and Logical Problems”. The further development to web Sudoku was
            held in Japan, where the name of the game was invented. In 2004,
            Sudoku was first published in the “Times” as an online game.
          </p>
          <p>
            Easy Sudoku puzzles not only bring pleasure, but also train
            concentration and attention. You will notice how quickly your
            ability to concentrate improves, if you play daily. It is especially
            useful to play easy web Sudoku on a regular basis for older people
            in order to maintain their mental abilities for many years.
          </p>
          <p>
            If you have never played this game before, we recommend starting
            with free easy Sudoku by selecting the appropriate level on
            Sudoku.com.
          </p>
          <h2 className="title">How to play beginner Sudoku puzzles?</h2>
          <p>
            The goal of Sudoku is to fill the cells with numbers from 1 to 9.
            The numbers are placed in 9 squares, 3x3 each, thus, in each row, in
            each column and in each small square there are 9 cells. The same
            digit can be used only once in each separate column, each line and
            in each small square. The level of difficulty depends on how many
            digits are already indicated in the cells. If you open plenty of
            numbers - then you have very easy Sudoku.
          </p>
          Text taken from https://sudoku.com/
        </div>
      </div>
    </div>
  );
}
