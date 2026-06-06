# ♟ Chess App — Real-time Multiplayer Chess

A full-stack real-time multiplayer chess application built from scratch, inspired by Chess.com.

🔗 **Live Demo:** https://chess-app-iota-five.vercel.app

---

## 🎮 Features

- **Real-time Multiplayer** — Play with anyone, anywhere using WebSocket protocol
- **GitHub OAuth** — Secure login with GitHub via Supabase Auth
- **Matchmaking System** — Automatically pairs two players into a live game
- **Move Validation** — Server-side validation using chess.js (no cheating!)
- **Board Flip** — Black player sees the board from their perspective
- **Responsive UI** — Clean dark theme chess board

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite |
| WebSocket Server | Node.js, ws library |
| Chess Logic | chess.js |
| Authentication | Supabase Auth (GitHub OAuth) |
| Database | Supabase PostgreSQL |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 🏗️ Architecture
chess-app/                  ← Monorepo
├── apps/
│   ├── frontend/           ← React app (Vite)
│   └── ws/                 ← WebSocket server (Node.js)
└── package.json

**How it works:**
1. Two players open the app and click "New Game"
2. WebSocket server queues them and pairs into a game
3. Each move is validated server-side using chess.js
4. Both players' boards update in real-time

---

## 🚀 Run Locally

**Prerequisites:** Node.js 18+, npm

```bash
# 1. Clone the repo
git clone https://github.com/GitGurls/chess-app.git
cd chess-app

# 2. Install dependencies
npm install

# 3. Frontend environment setup
cd apps/frontend
cp .env.example .env
# Add your Supabase URL and anon key in .env

# 4. Start both servers
cd ../..
npm run dev
```

Open `http://localhost:5173` in **two tabs** — click "New Game" in both and start playing!

---

## 🔑 Environment Variables

Create `apps/frontend/.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📁 Project Structure
apps/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChessBoard.tsx   ← 8x8 board, piece rendering, click handling
│   │   │   └── LoginPage.tsx    ← GitHub OAuth login UI
│   │   ├── useSocket.ts         ← WebSocket connection hook
│   │   ├── supabaseClient.ts    ← Supabase client setup
│   │   └── App.tsx              ← Main app, auth state, game state
│   └── package.json
│
└── ws/
├── src/
│   ├── Game.ts              ← Game logic, move validation, game over
│   ├── GameManager.ts       ← Matchmaking, player queue management
│   └── index.ts             ← WebSocket server entry point
└── package.json

---

## 🎯 Key Learnings

- WebSocket protocol for real-time bi-directional communication
- Monorepo architecture with npm workspaces
- Server-side game state validation (client can't cheat)
- OAuth authentication flow with Supabase
- Deploying Node.js WebSocket servers on Render

---

## 🔮 Coming Soon

- [ ] Google OAuth
- [ ] Game history — review past games
- [ ] Player profiles
- [ ] Online player count
