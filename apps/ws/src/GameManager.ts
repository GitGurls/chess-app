import { WebSocket } from "ws";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private pendingPlayer: WebSocket | null;  // koi wait kar raha hai?

  constructor() {
    this.games = [];
    this.pendingPlayer = null;
  }

  addPlayer(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      this.handleMessage(socket, message);
    });

    socket.on("close", () => {
      // Agar pending player disconnect ho gaya
      if (this.pendingPlayer === socket) {
        this.pendingPlayer = null;
      }
    });
  }

  private handleMessage(socket: WebSocket, message: any) {
    if (message.type === "init_game") {
      if (this.pendingPlayer === null) {
        // Pehla player — wait karwao
        this.pendingPlayer = socket;
        console.log("Player 1 wait kar raha hai...");
      } else {
        // Doosra player aaya — game banao!
        const game = new Game(this.pendingPlayer, socket);
        this.games.push(game);
        this.pendingPlayer = null;
        console.log("Game shuru! Total games:", this.games.length);
      }
    }

    if (message.type === "move") {
      // Kaunsi game mein ye player hai dhundo
      const game = this.games.find(
        g => g.player1 === socket || g.player2 === socket
      );
      if (game) {
        game.makeMove(socket, message.payload.move);
      }
    }
  }
}