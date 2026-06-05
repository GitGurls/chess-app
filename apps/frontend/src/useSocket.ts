import { useEffect, useRef, useState } from "react";

export type Move = { from: string; to: string };

export function useSocket(user: any) {
  const socketRef = useRef<WebSocket | null>(null);
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState<"white" | "black">("white");
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket("wss://chess-app-gpf1.onrender.com");
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "init_game") {
        setColor(message.payload.color);
        setStarted(true);
      }
      if (message.type === "move") {
        setMoves((prev) => [...prev, message.payload.move]);
      }
    };

    return () => ws.close();
  }, [user]);

  const initGame = () => {
    socketRef.current?.send(JSON.stringify({ type: "init_game" }));
  };

  const sendMove = (move: Move) => {
    socketRef.current?.send(JSON.stringify({ type: "move", payload: { move } }));
  };

  return { started, color, moves, initGame, sendMove };
}