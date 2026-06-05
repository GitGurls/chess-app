import { WebSocket } from "ws";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private pendingPlayer: WebSocket | null;

  constructor() {
    this.games = [];
    this.pendingPlayer = null;
  }

  addPlayer(socket: WebSocket) {
    socket.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(socket, message);
      } catch (e) {
        console.log("Invalid message:", e);
      }
    });

    socket.on("close", () => {
      if (this.pendingPlayer === socket) {
        this.pendingPlayer = null;
        console.log("Pending player left — queue clear");
      }
      // Game se bhi remove karo
      this.games = this.games.filter(
        g => g.player1 !== socket && g.player2 !== socket
      );
    });
  }

  private handleMessage(socket: WebSocket, message: any) {
    if (message.type === "init_game") {
      if (this.pendingPlayer === null) {
        this.pendingPlayer = socket;
        console.log("Player 1 wait kar raha hai...");
      } else if (this.pendingPlayer !== socket) {
        // Doosra player aaya
        const game = new Game(this.pendingPlayer, socket);
        this.games.push(game);
        this.pendingPlayer = null;
        console.log("Game shuru! Total games:", this.games.length);
      }
    }

    if (message.type === "move") {
      const game = this.games.find(
        g => g.player1 === socket || g.player2 === socket
      );
      if (game) {
        game.makeMove(socket, message.payload.move);
      }
    }
  }
}
