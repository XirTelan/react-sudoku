import React from "react";

export default function Cell({ x, y, update }: cellProps) {
  return (
    <div onMouseEnter={() => update(x, y)}>
      {x} - {y}
    </div>
  );
}

type cellProps = {
  x: number;
  y: number;
  update: (x: number, y: number) => void;
};
