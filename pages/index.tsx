"use client";
import React, { useState } from "react";
import { Play, Download, Sparkles, Video, ShieldCheck } from "lucide-react";

export default function MasterMindDashboard() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("TNPSC");
  const [loading, setLoading] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [credits, setCredits] = useState(20);

  const handleGenerate = () => {
    if (!topic) return alert("Please enter an exam topic!");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVideoGenerated(true);
      setCredits((prev) => Math.max(0, prev - 1));
    }, 2500);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", padding: "24px", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "16px", maxWidth: "800px", margin: "0 auto 24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#60a5fa", margin: 0 }}>MasterMind AI</h1>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>UPSC & TNPSC Short Video Engine</p>
        </div>
        <div style={{ background: "#0f172a", border: "1px solid #334155", padding: "6px 14px", borderRadius: "9999px", fontSize: "14px" }}>
          Credits: <strong style={{ color: "#fbbf24" }}>{credits}</strong>
        </div>
      </header>

      {/* Main Workspace */}
      <main style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        {/* Input Form */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", padding: "20px", borderRadius: "16px" }}>
          <h2 style={{ fontSize: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Video size={18} color="#60a5fa" /> Create Quiz Reel
          </h2>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>TARGET EXAM</label>
            <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
              {["TNPSC", "UPSC"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: category === item ? "#3b82f6" : "#334155",
                    background: category === item ? "#2563eb" : "#1e293b",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>TOPIC OR QUESTION</label>
            <textarea
              rows={3}
              placeholder="e.g. Indus Valley Civilization, Stone Age in India, River Systems..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ width: "100%", marginTop: "6px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", padding: "10px", color: "white", boxSizing: "border-box" }}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#2563eb", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", cursor: "pointer" }}
          >
            {loading ? "Synthesizing Video..." : "✨ Generate MCQ Reel (1 Credit)"}
          </button>
        </div>

        {/* Video Preview */}
        {videoGenerated && (
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", padding: "20px", borderRadius: "16px", textAlign: "center" }}>
            <h3 style={{ fontSize: "14px", color: "#34d399", marginBottom: "12px" }}>✅ Video Reel Ready!</h3>
            <div style={{ maxWidth: "220px", aspectRatio: "9/16", background: "#1e293b", margin: "0 auto 16px", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid #334155" }}>
              <span style={{ fontSize: "10px", background: "#2563eb", padding: "2px 6px", borderRadius: "4px", alignSelf: "center" }}>{category} QUIZ</span>
              <p style={{ fontSize: "12px" }}>{topic}</p>
              <span style={{ fontSize: "10px", color: "#94a3b8" }}>Timer: 5s ⏳ | Audio Synced</span>
            </div>
            <button style={{ width: "100%", padding: "10px", background: "#059669", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", cursor: "pointer" }}>
              Download MP4 Reel
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
