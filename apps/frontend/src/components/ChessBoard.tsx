import { useState } from "react";
import { Chess } from "chess.js";

const PIECES: Record<string, string> = {
  wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
  bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟",
};

type Square = { type: string; color: string } | null;

type Props = {
  board: Square[][];
  color: "white" | "black";
  onMove: (move: { from: string; to: string }) => void;
  chess: Chess;
};

// Row/col number ko chess notation mein convert karo (e.g. 0,0 → "a8")
function toChessNotation(row: number, col: number): string {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return files[col] + (8 - row);
}

export default function ChessBoard({ board, color, onMove, chess }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (row: number, col: number) => {
    const square = toChessNotation(row, col);

    if (selected === null) {
      // Pehla click — piece select karo
      const piece = chess.get(square as any);
      if (!piece) return;
      // Sirf apni pieces select honi chahiye
      if (piece.color !== (color === "white" ? "w" : "b")) return;
      setSelected(square);
    } else {
      // Doosra click — move karo
      onMove({ from: selected, to: square });
      setSelected(null);
    }
  };

  // Black ke liye board ulta dikhao
  const displayBoard = color === "black" ? [...board].reverse().map(r => [...r].reverse()) : board;

  return (
    <div style={{
      display: "grid",
      gridTemplateRows: "repeat(8, 70px)",
      gridTemplateColumns: "repeat(8, 70px)",
      border: "3px solid #4a3728",
    }}>
      {displayBoard.map((row, i) =>
        row.map((square, j) => {
          const actualRow = color === "black" ? 7 - i : i;
          const actualCol = color === "black" ? 7 - j : j;
          const squareName = toChessNotation(actualRow, actualCol);
          const isLight = (i + j) % 2 === 0;
          const isSelected = selected === squareName;
          const piece = square ? PIECES[square.color + square.type] : null;

          return (
            <div
              key={`${i}-${j}`}
              onClick={() => handleClick(actualRow, actualCol)}
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: isSelected
                  ? "#f6f669"
                  : isLight ? "#f0d9b5" : "#b58863",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "46px",
                cursor: "pointer",
              }}
            >
              {piece}
            </div>
          );
        })
      )}
    </div>
  );
}