"use client";
import React, { useState } from "react";
import { Play, Download, Sparkles, Video, CheckCircle, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center py-4 border-b border-slate-800 mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            MasterMind AI
          </h1>
          <p className="text-xs text-slate-400">UPSC & TNPSC Short Video Engine</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full text-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Credits: <strong className="text-amber-400">{credits}</strong></span>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Input Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-400" /> Create Quiz Reel
          </h2>

          <div>
            <label className="text-xs text-slate-400 font-medium">TARGET EXAM</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {["TNPSC", "UPSC"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`py-2 text-sm rounded-lg border font-medium transition-all ${
                    category === item
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium">TOPIC OR QUESTION</label>
            <textarea
              rows={3}
              placeholder="e.g. Indus Valley Civilization, Stone Age in India, River Systems..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg font-semibold flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? (
              <span>Synthesizing Video...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate MCQ Reel (1 Credit)
              </>
            )}
          </button>
        </div>

        {/* Right: Live Preview */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center min-h-[350px]">
          {!videoGenerated ? (
            <div className="text-slate-500 flex flex-col items-center gap-2">
              <Play className="w-12 h-12 stroke-[1.5] text-slate-700" />
              <p className="text-sm">Enter topic & click generate to preview video reel</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full max-w-[240px] aspect-[9/16] bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700 flex flex-col justify-between p-4 shadow-xl">
                <div className="bg-blue-600/90 text-[10px] font-bold px-2 py-0.5 rounded w-fit self-center uppercase">
                  {category} Quiz
                </div>
                <p className="text-xs font-semibold text-center leading-relaxed">
                  {topic.length > 50 ? topic.substring(0, 50) + "..." : topic}
                </p>
                <div className="text-[10px] text-slate-400 bg-slate-950/80 p-2 rounded text-center">
                  Timer: 5s ⏳ | Direct Audio Synced
                </div>
              </div>

              <a
                href="#download"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-semibold flex justify-center items-center gap-2 text-white"
              >
                <Download className="w-4 h-4" /> Download MP4 Reel
              </a>
            </div>
          )}
        </div>
      </main>

      {/* Subscription Box */}
      <footer className="w-full max-w-4xl mt-12 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex justify-between items-center text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Razorpay Instant Automated Credits Enabled</span>
        </div>
        <button className="text-blue-400 font-semibold hover:underline">
          Upgrade Plan
        </button>
      </footer>
    </div>
  );
}
