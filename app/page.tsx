"use client";

import { useState } from "react";
import MiaApp from "@/components/mia/mia-app";
import MiaDashboard from "@/components/mia/mia-dashboard";
import PasswordGate from "@/components/mia/password-gate";

// ─── ACCESSIBLE EARTH PALETTE ────────────────────────────────────────────────
const P = {
  parchment: "#F5EDE3",
  linen: "#E8C9B5",
  copper: "#E8C9B5",
  plum: "#4A5C40",
  plumSoft: "#6B7C5E",
  rust: "#C2856A",
  sage: "#6B7C5E",
  border: "#D4B898",
  white: "#FFFFFF",
  muted: "#2C1A0E",
};

export default function HomePage() {
  const [view, setView] = useState<"landing" | "b2c" | "b2b">("landing");

  if (view === "b2c") {
    return (
      <PasswordGate>
      <div>
        <button
          onClick={() => setView("landing")}
          className="font-sans"
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 100,
            background: P.plum,
            color: P.copper,
            border: "none",
            borderRadius: 12,
            padding: "10px 18px",
            fontWeight: 600,
            fontSize: 12,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(45,27,53,0.4)",
          }}
        >
          ← Back to Home
        </button>
        <MiaApp />
      </div>
      </PasswordGate>
    );
  }

  if (view === "b2b") {
    return (
      <PasswordGate>
      <div>
        <button
          onClick={() => setView("landing")}
          className="font-sans"
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 100,
            background: P.plum,
            color: P.copper,
            border: "none",
            borderRadius: 12,
            padding: "10px 18px",
            fontWeight: 600,
            fontSize: 12,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(45,27,53,0.4)",
          }}
        >
          ← Back to Home
        </button>
        <MiaDashboard />
      </div>
      </PasswordGate>
    );
  }

  // Landing page
  return (
    <PasswordGate>
    <div
      className="font-sans"
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${P.parchment} 0%, ${P.linen} 50%, ${P.parchment} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .f0{animation:fadeUp .6s ease both}
        .f1{animation:fadeUp .6s .1s ease both}
        .f2{animation:fadeUp .6s .2s ease both}
        .f3{animation:fadeUp .6s .3s ease both}
        .card-hover{transition:all .25s ease;cursor:pointer;}
        .card-hover:hover{transform:translateY(-8px);box-shadow:0 30px 60px rgba(45,27,53,0.25)!important;}
      `}</style>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div
          className="f0"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: P.plum,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              boxShadow: `0 8px 32px rgba(45,27,53,0.4), 0 0 0 4px ${P.copper}`,
            }}
          >
            <span role="img" aria-label="MIA avatar">👩🏾</span>
          </div>
        </div>

        <h1
          className="f1 font-serif"
          style={{
            fontSize: "clamp(40px, 8vw, 64px)",
            fontWeight: 700,
            color: P.plum,
            lineHeight: 1.1,
            margin: "0 0 16px",
          }}
        >
          MIA
        </h1>
        <p
          className="f1 font-sans"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: P.copper,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: "0 0 24px",
          }}
        >
          Maternal Integrity Assistant
        </p>

        <div
          className="f2"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: P.plum,
            borderRadius: 999,
            padding: "8px 20px",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 16 }}>✦</span>
          <span
            className="font-sans"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: P.copper,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Protection · Clarity · Integrity
          </span>
        </div>

        <p
          className="f2 font-sans text-balance"
          style={{
            fontSize: 18,
            color: P.muted,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          The complete doula billing and record-keeping platform.
          <br />
          <span style={{ color: P.plum, fontWeight: 600 }}>
            Your work deserves to be paid.
          </span>
        </p>
      </div>

      {/* Cards */}
      <div
        className="f3"
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 900,
        }}
      >
        {/* B2C Card */}
        <div
          onClick={() => setView("b2c")}
          className="card-hover"
          style={{
            width: 380,
            background: P.white,
            borderRadius: 28,
            padding: "32px 28px",
            border: `2px solid ${P.border}`,
            boxShadow: "0 12px 40px rgba(45,27,53,0.12)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: P.rust,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              marginBottom: 20,
              boxShadow: "0 8px 24px rgba(201,74,30,0.3)",
            }}
          >
            📱
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: P.plum,
              margin: "0 0 8px",
            }}
          >
            Doula App
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: 13,
              color: P.rust,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: "0 0 16px",
            }}
          >
            B2C Mobile Experience
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: 14,
              color: P.muted,
              lineHeight: 1.65,
              margin: "0 0 24px",
            }}
          >
            The 5-screen doula visit recording flow. Welcome, setup, record,
            MIA review, and sign-off. State-ready compliance in minutes.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Voice Recording", "Signature Pad", "7 Milestones", "PDF Export"].map((tag) => (
              <span
                key={tag}
                className="font-sans"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: P.plumSoft,
                  background: P.linen,
                  padding: "5px 12px",
                  borderRadius: 999,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: `1px solid ${P.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className="font-sans" style={{ fontSize: 12, color: P.muted }}>
              iPhone 14 Pro frame
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: P.rust,
              }}
            >
              Launch App →
            </span>
          </div>
        </div>

        {/* B2B Card */}
        <div
          onClick={() => setView("b2b")}
          className="card-hover"
          style={{
            width: 380,
            background: P.white,
            borderRadius: 28,
            padding: "32px 28px",
            border: `2px solid ${P.border}`,
            boxShadow: "0 12px 40px rgba(45,27,53,0.12)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: P.sage,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              marginBottom: 20,
              boxShadow: "0 8px 24px rgba(59,110,82,0.3)",
            }}
          >
            🏢
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: P.plum,
              margin: "0 0 8px",
            }}
          >
            Admin Dashboard
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: 13,
              color: P.sage,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: "0 0 16px",
            }}
          >
            B2B Organization Portal
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: 14,
              color: P.muted,
              lineHeight: 1.65,
              margin: "0 0 24px",
            }}
          >
            Desktop organization-level view for agencies and state partnerships.
            Manage doulas, approve records, and export billing.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Doula Roster", "Approval Queue", "Billing Export", "Alert Feed"].map((tag) => (
              <span
                key={tag}
                className="font-sans"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: P.plumSoft,
                  background: P.linen,
                  padding: "5px 12px",
                  borderRadius: 999,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: `1px solid ${P.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className="font-sans" style={{ fontSize: 12, color: P.muted }}>
              Full-width desktop
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: P.sage,
              }}
            >
              Open Dashboard →
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 60, textAlign: "center" }}>
        <p
          className="font-sans"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: P.border,
          }}
        >
          Powered by PDI — Perinatal Documentation Integrity
        </p>
      </div>
    </div>
    </PasswordGate>
  );
}
