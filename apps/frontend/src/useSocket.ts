// import { useEffect, useRef, useState } from "react";

// export type Move = { from: string; to: string };

// export function useSocket(user: any) {
//   const socketRef = useRef<WebSocket | null>(null);
//   const [connected, setConnected] = useState(false);
//   const [started, setStarted] = useState(false);
//   const [color, setColor] = useState<"white" | "black">("white");
//   const [moves, setMoves] = useState<Move[]>([]);

//   useEffect(() => {
//     if (!user) return;

//     const ws = new WebSocket("wss://chess-app-gpf1.onrender.com");
//     socketRef.current = ws;

//     ws.onopen = () => setConnected(true);

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       if (message.type === "init_game") {
//         setColor(message.payload.color);
//         setStarted(true);
//       }
//       if (message.type === "move") {
//         setMoves((prev) => [...prev, message.payload.move]);
//       }
//     };

//     ws.onclose = () => setConnected(false);

//     return () => ws.close();
//   }, [user]);

//   const initGame = () => {
//     if (socketRef.current?.readyState === WebSocket.OPEN) {
//       socketRef.current.send(JSON.stringify({ type: "init_game" }));
//     }
//   };

//   const sendMove = (move: Move) => {
//     if (socketRef.current?.readyState === WebSocket.OPEN) {
//       socketRef.current.send(JSON.stringify({ type: "move", payload: { move } }));
//     }
//   };

//   return { started, color, moves, initGame, sendMove, connected };
// }




import { useEffect, useRef, useState } from "react";

export type Move = {
  from: string;
  to: string;
};

export function useSocket(user: any) {
  const socketRef = useRef<WebSocket | null>(null);

  const [connected, setConnected] = useState(false);
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState<"white" | "black">("white");
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    if (!user) return;

    console.log("Creating websocket connection...");

    const ws = new WebSocket(
      "wss://chess-app-gpf1.onrender.com"
    );

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS Connected");
      setConnected(true);
    };

    ws.onerror = (event) => {
      console.log("🚨 WS Error", event);
    };

    ws.onclose = (event) => {
      console.log(
        "❌ WS Closed",
        event.code,
        event.reason
      );

      setConnected(false);
    };

    ws.onmessage = (event) => {
      console.log("📩 Incoming:", event.data);

      const message = JSON.parse(event.data);

      if (message.type === "init_game") {
        console.log(
          "🎮 Game Started",
          message.payload.color
        );

        setColor(message.payload.color);
        setStarted(true);
      }

      if (message.type === "move") {
        setMoves((prev) => [
          ...prev,
          message.payload.move,
        ]);
      }
    };

    return () => {
      console.log("Closing websocket...");
      ws.close();
    };
  }, [user]);

  const initGame = () => {
    console.log(
      "🎮 New Game Clicked",
      socketRef.current?.readyState
    );

    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({
          type: "init_game",
        })
      );
    } else {
      console.log("⚠️ Socket not open");
    }
  };

  const sendMove = (move: Move) => {
    console.log("♟ Sending Move:", move);

    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({
          type: "move",
          payload: {
            move,
          },
        })
      );
    }
  };

  return {
    started,
    color,
    moves,
    initGame,
    sendMove,
    connected,
  };
}
