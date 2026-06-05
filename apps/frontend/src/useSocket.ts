import { useEffect, useRef, useState } from "react";

export type Move = { from: string; to: string };

export function useSocket(user: any) {
  const socketRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState<"white" | "black">("white");
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    if (!user) return;

    const ws = new WebSocket("wss://chess-app-gpf1.onrender.com");
    socketRef.current = ws;

    ws.onopen = () => setConnected(true);

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

    ws.onclose = () => setConnected(false);

    return () => ws.close();
  }, [user]);

  const initGame = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "init_game" }));
    }
  };

  const sendMove = (move: Move) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "move", payload: { move } }));
    }
  };

  return { started, color, moves, initGame, sendMove, connected };
}
