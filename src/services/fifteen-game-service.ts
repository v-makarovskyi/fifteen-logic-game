import { Cell, Coordinates } from "../components/GameButton";
import { randomValue } from "../utils";

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
}
