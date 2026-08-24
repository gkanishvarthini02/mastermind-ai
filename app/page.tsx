export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", padding: "24px", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "16px", maxWidth: "800px", margin: "0 auto 24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#60a5fa", margin: 0 }}>MasterMind AI</h1>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>UPSC & TNPSC Short Video Engine</p>
        </div>
        <div style={{ background: "#0f172a", border: "1px solid #334155", padding: "6px 14px", borderRadius: "9999px", fontSize: "14px" }}>
          Credits: <strong style={{ color: "#fbbf24" }}>20</strong>
        </div>
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", background: "#0f172a", border: "1px solid #1e293b", padding: "24px", borderRadius: "16px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>🎬 Generate Quiz Reel</h2>
        
        <label style={{ fontSize: "12px", color: "#94a3b8" }}>TARGET EXAM</label>
        <div style={{ display: "flex", gap: "10px", margin: "8px 0 16px" }}>
          <button style={{ flex: 1, padding: "10px", background: "#2563eb", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold" }}>TNPSC</button>
          <button style={{ flex: 1, padding: "10px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "white" }}>UPSC</button>
        </div>

        <label style={{ fontSize: "12px", color: "#94a3b8" }}>TOPIC OR QUESTION</label>
        <textarea 
          rows={3} 
          placeholder="e.g. Stone Age in India, Indus Valley Civilization..." 
          style={{ width: "100%", marginTop: "6px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", padding: "12px", color: "white", boxSizing: "border-box" }}
        />

        <button style={{ width: "100%", marginTop: "16px", padding: "12px", background: "linear-gradient(to right, #2563eb, #4f46e5)", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", cursor: "pointer" }}>
          ✨ Generate MCQ Reel (1 Credit)
        </button>
      </main>
    </div>
  );
}
