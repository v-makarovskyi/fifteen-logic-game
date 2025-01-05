import { useState } from "react";
import { FifteenGame } from "../services";

export const useGame = ():FifteenGame => {
    const [game] = useState(() => new FifteenGame())
    return game
}