"use client";

import { useState, useEffect, ReactNode } from "react";

const P = {
  parchment: "#F5EDE3",
  linen: "#E8C9B5",
  copper: "#E8C9B5",
  plum: "#4A5C40",
  plumSoft: "#6B7C5E",
  rust: "#C2856A",
  rustHover: "#A66A50",
  border: "#D4B898",
  white: "#FFFFFF",
  muted: "#2C1A0E",
  error: "#C2856A",
};

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: P.parchment,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: `3px solid ${P.border}`,
            borderTopColor: P.rust,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // Authenticated - show children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Password entry screen
  return (
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
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
        .fade-in{animation:fadeUp .6s ease both}
        .input-focus:focus{outline:none;border-color:${P.rust}!important;box-shadow:0 0 0 3px rgba(201,74,30,0.15)!important;}
      `}</style>

      <div
        className="fade-in"
        style={{
          background: P.white,
          borderRadius: 28,
          padding: "48px 40px",
          width: "100%",
          maxWidth: 420,
          border: `2px solid ${P.border}`,
          boxShadow: "0 20px 60px rgba(45,27,53,0.15)",
          textAlign: "center",
        }}
      >
        {/* Logo */}
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
            margin: "0 auto 24px",
            boxShadow: `0 8px 32px rgba(45,27,53,0.4), 0 0 0 4px ${P.copper}`,
          }}
        >
          <span role="img" aria-label="MIA avatar">👩🏾</span>
        </div>

        <h1
          className="font-serif"
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: P.plum,
            margin: "0 0 8px",
          }}
        >
          MIA
        </h1>

        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: P.copper,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          Maternal Integrity Assistant
        </p>

        <p
          style={{
            fontSize: 14,
            color: P.muted,
            margin: "0 0 32px",
          }}
        >
          Enter password to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-focus"
            autoFocus
            style={{
              width: "100%",
              padding: "16px 20px",
              fontSize: 16,
              border: `2px solid ${error ? P.error : P.border}`,
              borderRadius: 16,
              background: P.parchment,
              color: P.plum,
              marginBottom: 16,
              transition: "all 0.2s ease",
            }}
          />

          {error && (
            <p
              style={{
                fontSize: 13,
                color: P.error,
                margin: "0 0 16px",
                fontWeight: 500,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            style={{
              width: "100%",
              padding: "16px 24px",
              fontSize: 15,
              fontWeight: 700,
              color: P.white,
              background: isLoading || !password ? P.muted : P.rust,
              border: "none",
              borderRadius: 16,
              cursor: isLoading || !password ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: isLoading || !password ? "none" : "0 8px 24px rgba(201,74,30,0.3)",
            }}
            onMouseOver={(e) => {
              if (!isLoading && password) {
                e.currentTarget.style.background = P.rustHover;
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading && password) {
                e.currentTarget.style.background = P.rust;
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {isLoading ? "Verifying..." : "Enter MIA"}
          </button>
        </form>

        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: `1px solid ${P.border}`,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: P.muted,
              margin: 0,
            }}
          >
            Protected content. Authorized access only.
          </p>
        </div>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: 32,
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
  );
}
