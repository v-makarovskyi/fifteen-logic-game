import { useState, useEffect, FC } from "react";
import { Cell, GameButton } from "./GameButton";
import { useGame } from "../hooks";

interface FieldProps {
  cells: Cell[];
  onHandleCellClick?: (cellValue: number) => void;
}

const Field: FC<FieldProps> = ({ cells, onHandleCellClick }) => {
  return (
    <div className="field">
      {cells.map((cell) => (
        <GameButton
          key={cell.value}
          cell={cell}
          onCellClick={onHandleCellClick}
        />
      ))}
    </div>
  );
};

export function Game() {
  const game = useGame();
  const [cellsData, setCellsData] = useState(game.cells);
  const [isWin, setIsWin] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [move, setMove] = useState(0);

  function handleClickCell(cellValue: number) {
    if (game.makeMove(cellValue)) {
      setCellsData(game.cells);
      setIsWin(game.checkWin());
      setMove((prevMove) => prevMove + 1);
    }
  }

  function handleStartGame() {
    const shuffleIntervals = [0, 200, 400, 600];
    const shuffle = () => {
      game.shuffle();
      setCellsData(game.cells);
    };
    setIsPlaying(true)
    setIsWin(false)
    setMove(0)
    shuffleIntervals.forEach((interval) => setTimeout(shuffle, interval));
  }

  useEffect(() => {
    if (isWin) {
      setIsPlaying(false);
    }
  }, [isWin]);

  let startButtonText = "play";
  if (isWin) startButtonText = "game again";
  if (isPlaying) startButtonText = "shuffle";

  return (
    <div className="game">
      <h2 className="title">fifteen game</h2>
      <p className="score">Score: &nbsp; {move}</p>
      <Field
        cells={cellsData}
        onHandleCellClick={isPlaying ? handleClickCell : undefined}
      />
      <button className="shuffle-btn" onClick={handleStartGame}>
        {startButtonText}
      </button>
    </div>
  );
}
