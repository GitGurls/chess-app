import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { supabase } from "./supabaseClient";
import ChessBoard from "./components/ChessBoard";
import LoginPage from "./components/LoginPage";
import { useSocket } from "./useSocket";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { started, color, moves, initGame, sendMove } = useSocket(user);
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    // Current session check karo
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Auth state change listen karo
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (moves.length === 0) return;
    const lastMove = moves[moves.length - 1];
    chess.move(lastMove);
    setBoard(chess.board());
  }, [moves]);

  if (loading) return (
    <div style={{ color: "white", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      Loading...
    </div>
  );

  if (!user) return <LoginPage />;

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
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={user.user_metadata?.avatar_url}
          width="36"
          height="36"
          style={{ borderRadius: "50%" }}
        />
        <span style={{ color: "white" }}>{user.user_metadata?.user_name}</span>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{
            backgroundColor: "#333",
            color: "#aaa",
            border: "none",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

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