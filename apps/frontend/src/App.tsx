import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "./components/ChessBoard";
import { useSocket } from "./useSocket";

export default function App() {
  const { started, color, moves, initGame, sendMove } = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  // Jab bhi server se move aaye, board update karo
  useEffect(() => {
    if (moves.length === 0) return;
    const lastMove = moves[moves.length - 1];
    chess.move(lastMove);
    setBoard(chess.board());
  }, [moves]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#1a1a1a",
      gap: "20px"
    }}>
      {!started ? (
        <button
          onClick={initGame}
          style={{
            padding: "12px 32px",
            fontSize: "18px",
            backgroundColor: "#769656",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          New Game
        </button>
      ) : (
        <>
          <p style={{ color: "white", fontSize: "16px" }}>
            Tum ho: <strong>{color}</strong>
          </p>
          <ChessBoard
            board={board}
            color={color}
            onMove={sendMove}
            chess={chess}
          />
        </>
      )}
    </div>
  );
}