// import { WebSocketServer } from "ws";
// import { GameManager } from "./GameManager";

// const wss = new WebSocketServer({ port: 8080 });
// const gameManager = new GameManager();

// console.log("WebSocket server was started on port 8080");

// wss.on("connection", (socket) => {
//   console.log("Naya player was connected!");
//   gameManager.addPlayer(socket);
// });




import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const PORT = Number(process.env.PORT) || 8080;

const wss = new WebSocketServer({
  port: PORT,
});

const gameManager = new GameManager();

console.log(`WebSocket server started on ${PORT}`);

wss.on("connection", (socket) => {
  console.log("Naya player was connected!");
  gameManager.addPlayer(socket);
});
