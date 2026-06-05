import { supabase } from "../supabaseClient";

export default function LoginPage() {
  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#1a1a1a",
      gap: "16px"
    }}>
      <h1 style={{ color: "white", fontSize: "48px", marginBottom: "8px" }}>
        ♟ Chess
      </h1>
      <p style={{ color: "#aaa", marginBottom: "24px" }}>
        Login to play multiplayer chess
      </p>

      {/* GitHub Login — Real */}
      <button
        onClick={handleGitHubLogin}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#24292e",
          color: "white",
          border: "none",
          padding: "12px 32px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          width: "280px",
          justifyContent: "center"
        }}
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          width="22"
          height="22"
          style={{ filter: "invert(1)" }}
        />
        Login with GitHub
      </button>

      {/* Google Login — Coming Soon */}
      <button
        disabled
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#2a2a2a",
          color: "#666",
          border: "1px solid #333",
          padding: "12px 32px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "not-allowed",
          width: "280px",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <img
          src="https://www.google.com/favicon.ico"
          width="22"
          height="22"
          style={{ opacity: 0.3 }}
        />
        Login with Google
        <span style={{
          position: "absolute",
          right: "12px",
          fontSize: "11px",
          backgroundColor: "#333",
          color: "#888",
          padding: "2px 6px",
          borderRadius: "4px"
        }}>
          Soon
        </span>
      </button>
    </div>
  );
}