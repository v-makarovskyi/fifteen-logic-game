import { Cell, Coordinates } from "../components/GameButton";
import { randomValue } from "../utils";

type Side = "top" | "bottom" | "left" | "right" | null;

export class FifteenGame {
  private cellsData: Cell[] = this.getInitialCellsData();

  static getCellPosition(cell: Cell) {
    return cell.coords.row * 4 + cell.coords.col;
  }

  private getInitialCellsData(): Cell[] {
    const newCellsData = Array.from({ length: 16 }, (_, idx) => ({
      value: idx + 1,
      coords: {
        row: Math.floor(idx / 4),
        col: idx % 4,
      },
    }));

    return newCellsData;
  }

  get cells(): Cell[] {
    return this.cellsData.map((cell) => ({
      ...cell,
      coords: { ...cell.coords },
    }));
  }

  private getEmptyCell() {
    return this.cellsData.find((cell) => cell.value === 16);
  }

  private getMoveSide(
    clickedCell: Cell,
    emptyCell = this.getEmptyCell()
  ): Side {
    if (!emptyCell) return null;

    if (clickedCell.coords.col === emptyCell.coords.col) {
      if (clickedCell.coords.row === emptyCell.coords.row - 1) {
        return "top";
      } else if (clickedCell.coords.row === emptyCell.coords.row + 1) {
        return "bottom";
      }
    } else if (clickedCell.coords.row === emptyCell.coords.row) {
      if (clickedCell.coords.col === emptyCell.coords.col - 1) {
        return "left";
      } else if (clickedCell.coords.col === emptyCell.coords.col + 1) {
        return "right";
      }
    }
    return null;
  }

  makeMove(clickedCellValue: number): boolean {
    let cellToMove;

    let clickedCell = this.cellsData.find(
      (cell) => cell.value === clickedCellValue
    );
    if (!clickedCell) return false;

    const emptyCell = this.getEmptyCell();
    if (!emptyCell) return false;

    let clickSide: Side = this.getMoveSide(clickedCell, emptyCell);
    if (!clickSide) return false;

    const nextEmptyCellCoords = { ...clickedCell.coords };

    switch (clickSide) {
      case "top": {
        cellToMove = this.cellsData.find(
          (cell) =>
            cell.coords.col === emptyCell.coords.col &&
            cell.coords.row === emptyCell.coords.row - 1
        );
        if (!cellToMove) return false;
        cellToMove.coords.row++;
        break;
      }
      case "bottom": {
        cellToMove = this.cellsData.find(
          (cell) =>
            cell.coords.col === emptyCell.coords.col &&
            cell.coords.row === emptyCell.coords.row + 1
        );
        if (!cellToMove) return false;
        cellToMove.coords.row--;
        break;
      }
      case "left": {
        cellToMove = this.cellsData.find(
          (cell) =>
            cell.coords.row === emptyCell.coords.row &&
            cell.coords.col === emptyCell.coords.col - 1
        );
        if (!cellToMove) return false;
        cellToMove.coords.col++;
        break;
      }
      case "right": {
        cellToMove = this.cellsData.find(
          (cell) =>
            cell.coords.row === emptyCell.coords.row &&
            cell.coords.col === emptyCell.coords.col + 1
        );
        if (!cellToMove) return false;
        cellToMove.coords.col--;
        break;
      }
      default:
        return false;
    }
    emptyCell.coords = nextEmptyCellCoords;
    return true;
  }

  checkWin(): boolean {
    const isWin = this.cellsData
      .filter((cell) => cell.value !== 16)
      .every((cell, idx) => {
        let position: number = FifteenGame.getCellPosition(cell);
        return position === idx;
      });
    return isWin;
  }

  shuffle(): void {
    do {
      const randomInt = randomValue(50, 100);
      let i = 0;
      while (i < randomInt) {
        let cellToMove = randomValue(1, 15);
        if (this.makeMove(cellToMove)) {
          i++;
        }
      }
    } while (this.checkWin());
  }
}
