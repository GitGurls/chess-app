import { WebSocket } from "ws";
import { Chess } from "chess.js";

export class Game {
  public player1: WebSocket;  // White
  public player2: WebSocket;  // Black
  private chess: Chess;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.chess = new Chess();

    // Dono players ko batao game shuru ho gaya
    player1.send(JSON.stringify({
      type: "init_game",
      payload: { color: "white" }
    }));

    player2.send(JSON.stringify({
      type: "init_game",
      payload: { color: "black" }
    }));
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    // Baari check karo — white ki baari pe black ne move kiya toh reject
    if (this.chess.turn() === "w" && socket !== this.player1) return;
    if (this.chess.turn() === "b" && socket !== this.player2) return;

    // chess.js se move validate karo
    try {
      this.chess.move(move);
    } catch (e) {
      console.log("Invalid move:", move);
      return;
    }

    // Dono players ko move bhejo
    const moveMsg = JSON.stringify({
      type: "move",
      payload: { move }
    });

    this.player1.send(moveMsg);
    this.player2.send(moveMsg);

    // Game over check
    if (this.chess.isGameOver()) {
      const winner = this.chess.turn() === "w" ? "black" : "white";
      const gameOverMsg = JSON.stringify({
        type: "game_over",
        payload: { winner }
      });
      this.player1.send(gameOverMsg);
      this.player2.send(gameOverMsg);
    }
  }
}