import { FC } from "react";

export interface Coordinates {
  row: number;
  col: number;
}

export interface Cell {
  value: number;
  coords: Coordinates;
}

interface GameButtonProps {
  cell: Cell;
}

export const GameButton: FC<GameButtonProps> = ({ cell }) => {
  const shifft = 25;
  return (
    <button
      className="game-btn"
      style={{
        display: cell.value === 16 ? "none" : "",
        top: `${cell.coords.row * shifft}%`,
        left: `${cell.coords.col * shifft}%`,
      }}
    >
      <span>{cell.value}</span>
    </button>
  );
};
