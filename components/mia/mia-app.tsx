"use client";

import { useState, useEffect, useRef } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const P = {
  parchment: "#F5EDE3",
  linen: "#E8C9B5",
  copper: "#E8C9B5",
  plum: "#4A5C40",
  plumSoft: "#6B7C5E",
  rust: "#C2856A",
  rustHov: "#A66A50",
  sage: "#6B7C5E",
  sageLt: "#EAE8E0",
  amber: "#D4778E",
  amberLt: "#F5EDE3",
  border: "#D4B898",
  white: "#FFFFFF",
  muted: "#2C1A0E",
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scaleIn{from{transform:scale(0.75);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes checkPop{0%{transform:scale(0) rotate(-12deg)}65%{transform:scale(1.18) rotate(3deg)}100%{transform:scale(1) rotate(0)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
    @keyframes arcDraw{from{stroke-dashoffset:264}to{stroke-dashoffset:0}}
    @keyframes rowIn{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}
    @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(194,133,106,0.45)}70%{box-shadow:0 0 0 22px rgba(194,133,106,0)}100%{box-shadow:0 0 0 0 rgba(194,133,106,0)}}
    @keyframes successPop{0%{transform:scale(0.6);opacity:0}65%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
    @keyframes sparkleFloat{
      0%  {transform:translate(0,0) scale(0);opacity:0}
      20% {opacity:1}
      80% {opacity:0.7}
      100%{transform:translate(var(--tx),var(--ty)) scale(var(--ts));opacity:0}
    }
    .sparkle-container{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit;}
    .spark{position:absolute;border-radius:50%;animation:sparkleFloat var(--dur) var(--delay) ease-out forwards;}
    .f0{animation:fadeUp .38s ease both}
    .f1{animation:fadeUp .38s .08s ease both}
    .f2{animation:fadeUp .38s .16s ease both}
    .f3{animation:fadeUp .38s .24s ease both}
    .f4{animation:fadeUp .38s .32s ease both}
    .tap{transition:transform .11s ease,opacity .11s ease;cursor:pointer;}
    .tap:active{transform:scale(0.97);opacity:0.88;}
  `}</style>
);

// ─── SPARKLE ───────────────────────────────────────────────────────────────
const SPARK_COLORS = ["#E8C9B5", "#C2856A", "#D4B898", "#6B7C5E", "#D4778E", "#A66A50", "#F5EDE3", "#8B9E7A"];

function SparkleLayer({ active }: { active: boolean }) {
  const sparks = useRef<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    tx: string;
    ty: string;
    ts: number;
    dur: string;
    delay: string;
  }>>([]);

  if (sparks.current.length === 0 && active) {
    sparks.current = Array.from({ length: 38 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2.5 + Math.random() * 5.5,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      tx: `${(Math.random() - 0.5) * 130}px`,
      ty: `${-25 - Math.random() * 100}px`,
      ts: 0.15 + Math.random() * 0.85,
      dur: `${0.7 + Math.random() * 1.3}s`,
      delay: `${Math.random() * 0.8}s`,
    }));
  }

  if (!active) return null;

  return (
    <div className="sparkle-container">
      {sparks.current.map((s) => (
        <div
          key={s.id}
          className="spark"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            "--tx": s.tx,
            "--ty": s.ty,
            "--ts": s.ts,
            "--dur": s.dur,
            "--delay": s.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── ART LAYER ──────────────────────────────────────────────────────────────
const Art = ({ screen }: { screen: string }) => {
  const arts: Record<string, React.ReactNode> = {
    welcome: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 390 812">
        <ellipse cx="340" cy="80" rx="160" ry="130" fill={P.rust} opacity="0.08" />
        <ellipse cx="310" cy="110" rx="110" ry="88" fill={P.copper} opacity="0.12" />
        <ellipse cx="360" cy="50" rx="90" ry="70" fill={P.copper} opacity="0.1" />
        <path d="M-20,600 Q60,520 130,570 Q200,615 240,560" fill="none" stroke={P.copper} strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
        <path d="M-30,630 Q50,550 110,600" fill="none" stroke={P.rust} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
        <path d="M20,680 Q36,658 50,678 Q36,698 20,680Z" fill={P.copper} opacity="0.22" />
        <path d="M10,700 Q24,682 36,700 Q24,718 10,700Z" fill={P.rust} opacity="0.14" />
        <circle cx="52" cy="652" r="3" fill={P.rust} opacity="0.2" />
        <circle cx="60" cy="660" r="2" fill={P.copper} opacity="0.18" />
        <circle cx="46" cy="665" r="1.5" fill={P.rust} opacity="0.15" />
      </svg>
    ),
    visit: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 390 812">
        <ellipse cx="360" cy="40" rx="130" ry="100" fill={P.copper} opacity="0.1" />
        <ellipse cx="330" cy="70" rx="90" ry="70" fill={P.rust} opacity="0.07" />
        <path d="M0,750 Q25,680 55,720 Q80,750 90,700" fill="none" stroke={P.copper} strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />
        <path d="M30,735 Q50,712 62,732 Q50,752 30,735Z" fill={P.copper} opacity="0.2" />
        <path d="M18,752 Q36,732 46,750 Q36,768 18,752Z" fill={P.rust} opacity="0.13" />
      </svg>
    ),
    record: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 390 812">
        <ellipse cx="195" cy="300" rx="190" ry="155" fill={P.rust} opacity="0.04" />
        <ellipse cx="195" cy="300" rx="135" ry="110" fill={P.rust} opacity="0.05" />
        <ellipse cx="195" cy="300" rx="88" ry="72" fill={P.copper} opacity="0.07" />
        <path d="M390,100 Q360,200 375,320 Q385,400 360,500" fill="none" stroke={P.copper} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
        <path d="M375,200 Q395,180 382,202 Q368,220 375,200Z" fill={P.copper} opacity="0.18" />
      </svg>
    ),
    scrub: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 390 812">
        <path d="M385,30 Q382,100 380,180 Q378,260 376,360" fill="none" stroke={P.copper} strokeWidth="1" strokeLinecap="round" opacity="0.28" />
        <path d="M380,100 Q395,82 385,104 Q372,118 380,100Z" fill={P.copper} opacity="0.2" />
        <path d="M378,200 Q362,186 372,206 Q384,220 378,200Z" fill={P.copper} opacity="0.16" />
      </svg>
    ),
    signoff: (
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 390 812">
        <ellipse cx="50" cy="740" rx="160" ry="130" fill={P.rust} opacity="0.08" />
        <ellipse cx="80" cy="710" rx="110" ry="88" fill={P.copper} opacity="0.11" />
        <ellipse cx="28" cy="770" rx="80" ry="62" fill={P.copper} opacity="0.09" />
        <path d="M410,60 Q330,110 240,80 Q180,58 130,90" fill="none" stroke={P.copper} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
        <path d="M380,55 Q360,38 370,58 Q382,74 380,55Z" fill={P.rust} opacity="0.16" />
      </svg>
    ),
  };
  return <>{arts[screen] || null}</>;
};

// ─── STATUS BAR ────────────────────────────────────────────────────────────
const StatusBar = () => (
  <div
    style={{
      height: 38,
      background: "#3D4D35",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 22px",
      flexShrink: 0,
    }}
  >
    <span className="font-sans" style={{ fontSize: 12, fontWeight: 600, color: "rgba(251,246,239,0.8)" }}>
      9:41
    </span>
    <div style={{ width: 76, height: 20, background: "rgba(255,255,255,0.08)", borderRadius: 10 }} />
    <span style={{ color: "rgba(251,246,239,0.8)", fontSize: 11 }}>●●●</span>
  </div>
);

// ─── PROGRESS BAR ──────────────────────────────────────────────────────────
const SCREENS = ["welcome", "visit", "record", "scrub", "signoff"];

const ProgressBar = ({ screen }: { screen: string }) => {
  const idx = SCREENS.indexOf(screen);
  return (
    <div
      style={{
        padding: "10px 20px 6px",
        display: "flex",
        gap: 4,
        alignItems: "center",
        background: screen === "record" ? P.plum : P.parchment,
        flexShrink: 0,
        transition: "background 0.35s",
      }}
    >
      {SCREENS.map((_, i) => (
        <div
          key={i}
          style={{
            flex: i <= idx ? 2 : 1,
            height: 3,
            borderRadius: 9999,
            background: i <= idx ? P.rust : P.border,
            transition: "all 0.4s ease",
          }}
        />
      ))}
      <span
        className="font-sans"
        style={{
          fontSize: 9,
          fontWeight: 600,
          color: screen === "record" ? "rgba(232,196,160,0.5)" : P.muted,
          marginLeft: 6,
          whiteSpace: "nowrap",
        }}
      >
        {idx + 1}/5
      </span>
    </div>
  );
};

// ─── HEADER ────────────────────────────────────────────────────────────────
const Header = ({ screen, onBack }: { screen: string; onBack: () => void }) => {
  const dark = screen === "record";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 20px 4px",
        background: dark ? P.plum : P.parchment,
        flexShrink: 0,
        transition: "background 0.35s",
      }}
    >
      {SCREENS.indexOf(screen) > 0 ? (
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
            color: dark ? "rgba(232,196,160,0.7)" : P.muted,
            padding: "4px 6px",
            borderRadius: 8,
            lineHeight: 1,
          }}
        >
          ←
        </button>
      ) : (
        <div style={{ width: 32 }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: P.plum,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            flexShrink: 0,
            boxShadow: "0 3px 12px rgba(45,27,53,0.3)",
          }}
        >
          <span role="img" aria-label="MIA avatar">👩🏾</span>
        </div>
        <div>
          <div
            className="font-serif"
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: dark ? "#F3EBE0" : P.plum,
              lineHeight: 1,
            }}
          >
            MIA
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: 8,
              fontWeight: 500,
              color: dark ? "rgba(232,196,160,0.45)" : P.muted,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1.3,
            }}
          >
            Maternal Integrity Assistant
          </div>
        </div>
      </div>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          background: dark ? "rgba(255,255,255,0.06)" : P.linen,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: dark ? "rgba(232,196,160,0.4)" : P.muted,
          fontSize: 13,
        }}
      >
        ☰
      </div>
    </div>
  );
};

// ─── PDI FOOTER ────────────────────────────────────────────────────────────
const PDIFooter = ({ dark }: { dark?: boolean }) => (
  <div
    style={{
      padding: "8px 0 14px",
      textAlign: "center",
      flexShrink: 0,
      background: dark ? P.plum : P.parchment,
      transition: "background 0.35s",
    }}
  >
    <span
      className="font-sans"
      style={{
        fontSize: 9,
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: dark ? "rgba(232,201,181,0.5)" : P.muted,
      }}
    >
      Powered by PDI — Perinatal Documentation Integrity
    </span>
  </div>
);

// ─── CTA BUTTON ────────────────────────────────────────────────────────────
const CTA = ({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="tap font-sans"
    style={{
      width: "100%",
      padding: "17px 0",
      borderRadius: 22,
      border: "none",
      background: disabled ? P.copper : P.rust,
      color: disabled ? "rgba(251,246,239,0.45)" : "#FBF6EF",
      fontWeight: 700,
      fontSize: 15,
      cursor: disabled ? "default" : "pointer",
      transition: "all 0.28s ease",
      boxShadow: disabled ? "none" : "0 10px 32px rgba(201,74,30,0.38)",
      letterSpacing: "0.02em",
    }}
  >
    {label}
  </button>
);

// ─── SIGNATURE PAD ─────────────────────────────────────────────────────────
function SigPad({ onSigned }: { onSigned: (signed: boolean) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const on = useRef(false);
  const [has, setHas] = useState(false);

  const p = (e: React.MouseEvent | React.TouchEvent, c: HTMLCanvasElement) => {
    const r = c.getBoundingClientRect();
    const s = "touches" in e ? e.touches[0] : e;
    return { x: s.clientX - r.left, y: s.clientY - r.top };
  };

  const dn = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    on.current = true;
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const { x, y } = p(e, c);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const mv = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!on.current) return;
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    ctx.strokeStyle = P.plum;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const { x, y } = p(e, c);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHas(true);
  };

  const up = () => {
    on.current = false;
    if (has) onSigned(true);
  };

  const clr = () => {
    ref.current!.getContext("2d")!.clearRect(0, 0, 400, 100);
    setHas(false);
    onSigned(false);
  };

  return (
    <div>
      <canvas
        ref={ref}
        width={340}
        height={95}
        style={{
          touchAction: "none",
          border: `1.5px dashed ${has ? P.sage : P.copper}`,
          borderRadius: 12,
          background: "#FDFAF5",
          width: "100%",
          cursor: "crosshair",
          transition: "border-color 0.3s",
        }}
        onMouseDown={dn}
        onMouseMove={mv}
        onMouseUp={up}
        onMouseLeave={up}
        onTouchStart={dn}
        onTouchMove={mv}
        onTouchEnd={up}
      />
      <button
        onClick={clr}
        className="font-sans"
        style={{
          fontSize: 10,
          color: P.muted,
          textDecoration: "underline",
          marginTop: 3,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN 1 — WELCOME / REFERRAL
// ═══════════════════════════════════════════════════════════════════════════
function WelcomeScreen({ onNext }: { onNext: () => void }) {
  const [npi, setNpi] = useState("");
  const [npiSt, setNpiSt] = useState<"idle" | "valid" | "invalid">("idle");
  const [uploaded, setUp] = useState(false);
  const [loading, setLoad] = useState(false);

  const handleNpi = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 10);
    setNpi(d);
    setNpiSt(d.length === 0 ? "idle" : d.length === 10 ? "valid" : "invalid");
  };

  const upload = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      setUp(true);
    }, 1850);
  };

  const ready = npiSt === "valid" && uploaded;

  const ctaLabel =
    !uploaded && npiSt !== "valid"
      ? "Complete both fields to continue"
      : !uploaded
        ? "Add your referral to continue"
        : npiSt !== "valid"
          ? "Check your NPI number"
          : "Welcome — let's get started →";

  const npiColor = npiSt === "valid" ? P.sage : npiSt === "invalid" ? P.amber : P.border;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        background: P.parchment,
      }}
    >
      <Art screen="welcome" />

      <div style={{ padding: "20px 24px 0", position: "relative", zIndex: 2 }}>
        <div
          className="f0"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: P.plum,
            borderRadius: 999,
            padding: "5px 14px 5px 10px",
            marginBottom: 18,
          }}
        >
          <span style={{ fontSize: 14 }}>✦</span>
          <span
            className="font-sans"
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: P.copper,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Protection · Clarity · Integrity
          </span>
        </div>

        <h1
          className="f1 font-serif"
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: P.plum,
            lineHeight: 1.08,
            marginBottom: 8,
          }}
        >
          Your work
          <br />
          <em style={{ color: P.rust, fontStyle: "italic" }}>deserves to be paid.</em>
        </h1>
        <p className="f2 font-sans" style={{ fontSize: 12, color: P.muted, lineHeight: 1.65 }}>
          Set up once. MIA protects your records
          <br />
          and your income — every visit.
        </p>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 16px 0",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* NPI field */}
        <div
          className="f2"
          style={{
            background: P.white,
            borderRadius: 20,
            padding: "16px 18px",
            border: `1.5px solid ${npiColor}`,
            transition: "border-color 0.3s",
            boxShadow: "0 2px 14px rgba(45,27,53,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <label
              className="font-sans"
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: P.plumSoft,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Type 1 NPI
            </label>
            {npiSt === "valid" && (
              <span
                className="font-sans"
                style={{
                  fontSize: 11,
                  color: P.sage,
                  fontWeight: 600,
                  animation: "scaleIn 0.25s ease",
                }}
              >
                ✓ Looks good.
              </span>
            )}
            {npiSt === "invalid" && (
              <span className="font-sans" style={{ fontSize: 11, color: P.amber, fontWeight: 600 }}>
                Check the number.
              </span>
            )}
          </div>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Enter 10-digit NPI"
            value={npi}
            onChange={(e) => handleNpi(e.target.value)}
            className="font-serif"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 22,
              fontWeight: 500,
              color: P.plum,
              letterSpacing: "0.06em",
              padding: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              paddingTop: 10,
              borderTop: `1px solid ${P.border}`,
            }}
          >
            <span className="font-sans" style={{ fontSize: 10, color: P.muted }}>
              Taxonomy
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: P.plumSoft,
                letterSpacing: "0.06em",
              }}
            >
              374J00000X
            </span>
          </div>
        </div>

        {/* Referral upload */}
        <div
          className="f3"
          style={{
            background: P.white,
            borderRadius: 20,
            padding: "16px 18px",
            border: `1.5px solid ${uploaded ? P.sage : P.border}`,
            transition: "border-color 0.35s",
            boxShadow: "0 2px 14px rgba(45,27,53,0.06)",
          }}
        >
          <p
            className="font-sans"
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: P.plumSoft,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 4,
            }}
          >
            {"Doctor's Referral"}
          </p>
          <p className="font-sans" style={{ fontSize: 12, color: P.muted, lineHeight: 1.55, marginBottom: 12 }}>
            OB · CNM · MD · PA · NP on file before billing.
          </p>
          {!uploaded ? (
            <button
              onClick={upload}
              className="tap font-sans"
              style={{
                width: "100%",
                padding: "13px 0",
                borderRadius: 16,
                border: "none",
                background: loading ? P.plumSoft : P.plum,
                color: "#F3EBE0",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.25s",
              }}
            >
              {loading ? (
                <>
                  <span style={{ animation: "spin 0.9s linear infinite", display: "inline-block", fontSize: 14 }}>◐</span>{" "}
                  Verifying…
                </>
              ) : (
                <>📎 Upload SC-10 / Dr. Letter</>
              )}
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                background: P.sageLt,
                borderRadius: 14,
                padding: "12px 16px",
                animation: "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <span style={{ fontSize: 22, animation: "checkPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}>✅</span>
              <div>
                <p className="font-serif" style={{ fontSize: 16, fontWeight: 700, color: P.sage, margin: 0 }}>
                  Referral Verified
                </p>
                <p className="font-sans" style={{ fontSize: 11, fontWeight: 600, color: "#2A5C3C", margin: 0 }}>
                  Billing Active
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Privacy notice */}
        <div
          className="f4"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 9,
            background: P.linen,
            borderRadius: 14,
            padding: "11px 14px",
            border: `1px solid ${P.border}`,
          }}
        >
          <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>🔒</span>
          <p className="font-sans" style={{ fontSize: 11, color: P.muted, lineHeight: 1.55 }}>
            MIA only records a post-visit voice summary — audio never leaves this device unencrypted.
          </p>
        </div>

        {/* Stats */}
        <div className="f4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {(
            [
              ["12", "Visits"],
              ["4", "Pending"],
              ["0", "Errors"],
            ] as const
          ).map(([n, l]) => (
            <div
              key={l}
              style={{
                background: P.white,
                borderRadius: 16,
                padding: "12px 6px",
                textAlign: "center",
                border: `1px solid ${P.border}`,
              }}
            >
              <p className="font-serif" style={{ fontSize: 24, fontWeight: 700, color: P.rust, margin: 0, lineHeight: 1 }}>
                {n}
              </p>
              <p className="font-sans" style={{ fontSize: 10, color: P.muted, margin: "3px 0 0" }}>
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 16px 0", position: "relative", zIndex: 2 }}>
        <CTA label={ctaLabel} onClick={onNext} disabled={!ready} />
      </div>
      <PDIFooter />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN 2 — VISIT SETUP
// ═══════════════════════════════════════════════════════════════════════════
function VisitScreen({ onNext }: { onNext: (visitType: string) => void }) {
  const [client, setClient] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const clients = [
    { id: "#101", name: "Amara Johnson", sub: "38 wks · Prenatal" },
    { id: "#102", name: "Sofia Martinez", sub: "PP 2wk · Postpartum" },
    { id: "#103", name: "Kezia Nwosu", sub: "34 wks · Prenatal" },
  ];
  const visitTypes = [
    { id: "prenatal", label: "Prenatal", icon: "🌱" },
    { id: "birth", label: "Birth", icon: "⭐" },
    { id: "postpartum", label: "Postpartum", icon: "🌸" },
  ];
  const sel = clients.find((c) => c.id === client);
  const ready = client && visitType;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        background: P.parchment,
      }}
    >
      <Art screen="visit" />

      <div style={{ padding: "16px 24px 12px", position: "relative", zIndex: 2 }}>
        <span
          className="f0 font-sans"
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: P.rust,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Step 02
        </span>
        <h2
          className="f1 font-serif"
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: P.plum,
            margin: "4px 0 0",
            lineHeight: 1.1,
          }}
        >
          Visit Setup
        </h2>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Client selector */}
        <div className="f1">
          <p
            className="font-sans"
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: P.muted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 6,
            }}
          >
            Client
          </p>
          <div
            onClick={() => setOpen(!open)}
            className="tap"
            style={{
              background: P.white,
              borderRadius: 18,
              padding: "14px 18px",
              border: `1.5px solid ${open || client ? P.rust : P.border}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              boxShadow: open ? "0 4px 20px rgba(201,74,30,0.1)" : "0 2px 8px rgba(45,27,53,0.05)",
            }}
          >
            {sel ? (
              <div
                className="font-serif"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: P.rust,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#FBF6EF",
                  flexShrink: 0,
                }}
              >
                {sel.name[0]}
              </div>
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: P.linen,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                👤
              </div>
            )}
            <div style={{ flex: 1 }}>
              <p className="font-serif" style={{ fontSize: 17, fontWeight: 500, color: sel ? P.plum : "#C4A888", margin: 0 }}>
                {sel ? sel.name : "Select client"}
              </p>
              {sel && (
                <p className="font-sans" style={{ fontSize: 11, color: P.muted, margin: 0 }}>
                  {sel.id} · {sel.sub}
                </p>
              )}
            </div>
            <span
              style={{
                color: P.rust,
                fontSize: 13,
                transition: "transform 0.2s",
                transform: open ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              ▾
            </span>
          </div>
          {open && (
            <div
              style={{
                background: P.white,
                borderRadius: "0 0 18px 18px",
                border: `1.5px solid ${P.rust}`,
                borderTop: "none",
                overflow: "hidden",
                marginTop: -4,
              }}
            >
              {clients.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setClient(c.id);
                    setOpen(false);
                  }}
                  className="tap"
                  style={{
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    background: client === c.id ? "#FDF3EE" : "transparent",
                    borderBottom: `1px solid ${P.linen}`,
                  }}
                >
                  <div
                    className="font-serif"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: client === c.id ? P.rust : P.copper,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#FBF6EF",
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <div>
                    <p className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: P.plum, margin: 0 }}>
                      {c.name}
                    </p>
                    <p className="font-sans" style={{ fontSize: 11, color: P.muted, margin: 0 }}>
                      {c.id} · {c.sub}
                    </p>
                  </div>
                  {client === c.id && <span style={{ marginLeft: "auto", color: P.rust, fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visit Type selector */}
        <div className="f2">
          <p
            className="font-sans"
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: P.muted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            Visit Type
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {visitTypes.map((vt) => {
              const active = visitType === vt.id;
              return (
                <button
                  key={vt.id}
                  onClick={() => setVisitType(vt.id)}
                  className="tap"
                  style={{
                    flex: 1,
                    padding: "14px 6px",
                    borderRadius: 18,
                    border: "none",
                    background: active ? P.rust : P.white,
                    outline: active ? "none" : `1.5px solid ${P.border}`,
                    outlineOffset: "-1.5px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: active ? "0 6px 20px rgba(201,74,30,0.28)" : "0 1px 6px rgba(45,27,53,0.05)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{vt.icon}</span>
                  <p className="font-sans" style={{ fontSize: 12, fontWeight: 700, color: active ? "#FBF6EF" : P.plum, margin: 0 }}>
                    {vt.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* National 60-min standard banner */}
        <div className="f3" style={{ background: P.plum, borderRadius: 18, padding: "15px 18px" }}>
          <p className="font-serif" style={{ fontSize: 16, fontWeight: 500, color: P.copper, margin: "0 0 5px", fontStyle: "italic" }}>
            ⏱ National billing standard
          </p>
          <p className="font-sans" style={{ fontSize: 12, color: "rgba(232,196,160,0.75)", lineHeight: 1.6, margin: 0 }}>
            A minimum of <span style={{ color: P.copper, fontWeight: 700 }}>60 minutes</span> per session is the national standard for
            doula reimbursement. Most states require this for any billable visit.
          </p>
        </div>

        {/* Privacy pill */}
        <div
          className="f4"
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            background: P.linen,
            borderRadius: 13,
            padding: "10px 14px",
            border: `1px solid ${P.border}`,
          }}
        >
          <span style={{ fontSize: 12 }}>🔒</span>
          <p className="font-sans" style={{ fontSize: 11, color: P.muted }}>
            Post-visit summary only · Audio stays on device
          </p>
        </div>
      </div>

      <div style={{ padding: "14px 16px 0", position: "relative", zIndex: 2 }}>
        <CTA
          label={ready ? "Summarize the Visit →" : "Select client & visit type"}
          onClick={() => onNext(visitType!)}
          disabled={!ready}
        />
      </div>
      <PDIFooter />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN 3 — RECORD (POST-VISIT SUMMARY)
// ═══════════════════════════════════════════════════════════════════════════
function RecordScreen({ visitType, onNext }: { visitType: string; onNext: () => void }) {
  const [state, setState] = useState<"idle" | "recording" | "stopped">("idle");
  const [offline, setOffline] = useState(false);
  const [manualStart, setManualStart] = useState("");
  const [manualEnd, setManualEnd] = useState("");

  const visitLabels: Record<string, string> = { prenatal: "Prenatal", birth: "Birth", postpartum: "Postpartum" };
  const visitIcons: Record<string, string> = { prenatal: "🌱", birth: "⭐", postpartum: "🌸" };
  const vtLabel = visitLabels[visitType] || "Visit";
  const vtIcon = visitIcons[visitType] || "📋";

  const startRec = () => setState("recording");
  const stopRec = () => setState("stopped");

  const manualReady = offline && manualStart.length >= 4 && manualEnd.length >= 4;
  const canProceed = state === "stopped" || manualReady;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: P.plum }}>
      <Art screen="record" />

      {/* Privacy pill */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(251,246,239,0.06)",
            borderRadius: 999,
            padding: "5px 14px",
            border: "1px solid rgba(251,246,239,0.1)",
          }}
        >
          <span style={{ fontSize: 11 }}>🔒</span>
          <span className="font-sans" style={{ fontSize: 10, color: "rgba(251,246,239,0.5)", letterSpacing: "0.06em" }}>
            Post-visit summary only · Audio stays on device
          </span>
        </div>
      </div>

      {/* Step label + client */}
      <div style={{ textAlign: "center", padding: "10px 24px 0", position: "relative", zIndex: 2 }}>
        <span
          className="font-sans"
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(232,196,160,0.45)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Step 03
        </span>
        <p className="font-sans" style={{ fontSize: 12, color: "rgba(232,196,160,0.45)", marginTop: 2 }}>
          Amara Johnson · #101
        </p>
      </div>

      {/* Visit Type card */}
      <div style={{ padding: "10px 20px 0", position: "relative", zIndex: 2 }}>
        <div
          style={{
            background: "rgba(251,246,239,0.04)",
            borderRadius: 22,
            padding: "16px 20px",
            border: "1px solid rgba(251,246,239,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <p
                className="font-sans"
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: "rgba(232,196,160,0.4)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                Visit Type
              </p>
              <p className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: "#F3EBE0", margin: 0, lineHeight: 1 }}>
                {vtIcon} {vtLabel}
              </p>
            </div>

            {/* Offline toggle */}
            <button
              onClick={() => {
                setOffline(!offline);
                setState("idle");
              }}
              className="font-sans"
              style={{
                background: offline ? "rgba(201,74,30,0.2)" : "rgba(251,246,239,0.06)",
                border: `1px solid ${offline ? "rgba(201,74,30,0.4)" : "rgba(251,246,239,0.12)"}`,
                borderRadius: 20,
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: 10,
                fontWeight: 700,
                color: offline ? "rgba(232,196,160,0.9)" : "rgba(232,196,160,0.4)",
                transition: "all 0.2s",
              }}
            >
              {offline ? "📵 Offline" : "📶 Online"}
            </button>
          </div>

          {/* OFFLINE: manual time inputs */}
          {offline ? (
            <div
              style={{
                borderTop: "1px solid rgba(251,246,239,0.08)",
                paddingTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                animation: "fadeUp .3s ease both",
              }}
            >
              <p className="font-sans" style={{ fontSize: 10, color: "rgba(232,196,160,0.5)", margin: 0, lineHeight: 1.5 }}>
                {"No connection? Enter the visit times manually — they'll sync when you're back online."}
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "rgba(232,196,160,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 5,
                    }}
                  >
                    Arrival Time
                  </p>
                  <input
                    type="time"
                    value={manualStart}
                    onChange={(e) => setManualStart(e.target.value)}
                    className="font-sans"
                    style={{
                      width: "100%",
                      background: "rgba(251,246,239,0.06)",
                      border: "1px solid rgba(251,246,239,0.15)",
                      borderRadius: 10,
                      padding: "9px 12px",
                      color: "#F3EBE0",
                      fontSize: 15,
                      outline: "none",
                      fontWeight: 600,
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "rgba(232,196,160,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 5,
                    }}
                  >
                    Departure Time
                  </p>
                  <input
                    type="time"
                    value={manualEnd}
                    onChange={(e) => setManualEnd(e.target.value)}
                    className="font-sans"
                    style={{
                      width: "100%",
                      background: "rgba(251,246,239,0.06)",
                      border: "1px solid rgba(251,246,239,0.15)",
                      borderRadius: 10,
                      padding: "9px 12px",
                      color: "#F3EBE0",
                      fontSize: 15,
                      outline: "none",
                      fontWeight: 600,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="font-sans" style={{ fontSize: 10, color: "rgba(232,196,160,0.35)", margin: "4px 0 0", lineHeight: 1.5 }}>
              Visit timestamps are captured automatically when you arrive and depart.
            </p>
          )}
        </div>
      </div>

      {/* Mic — only shown when online */}
      {!offline && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 18, position: "relative", zIndex: 2 }}>
          <div
            onClick={state === "idle" ? startRec : state === "recording" ? stopRec : undefined}
            style={{
              width: 108,
              height: 108,
              borderRadius: "50%",
              background:
                state === "recording"
                  ? "radial-gradient(circle at 35% 30%,#E87060,#C94A1E)"
                  : "radial-gradient(circle at 35% 30%,#C8A080,#A07860)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: state === "stopped" ? "default" : "pointer",
              fontSize: 42,
              transition: "all 0.3s ease",
              animation: state === "recording" ? "pulseRing 1.5s ease-in-out infinite" : "none",
              boxShadow: state === "recording" ? "none" : "0 14px 42px rgba(45,27,53,0.5)",
            }}
          >
            🎙️
          </div>

          <p
            className="font-serif"
            style={{
              fontSize: 14,
              fontWeight: 500,
              fontStyle: "italic",
              color: "rgba(232,196,160,0.6)",
              marginTop: 14,
              textAlign: "center",
              lineHeight: 1.55,
              paddingLeft: 28,
              paddingRight: 28,
            }}
          >
            {state === "idle"
              ? "Your voice captures lived experiences."
              : state === "recording"
                ? "Speak freely — MIA is listening."
                : "Summary captured."}
          </p>
          {state === "idle" && (
            <p
              className="font-sans"
              style={{
                fontSize: 10,
                color: "rgba(232,196,160,0.3)",
                marginTop: 4,
                textAlign: "center",
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              Record your post-visit summary after the appointment ends.
            </p>
          )}
        </div>
      )}

      <div style={{ flex: 1 }} />

      {/* Thumb zone CTAs */}
      <div style={{ padding: "0 16px 0", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 10 }}>
        {!offline && state === "recording" && (
          <button
            onClick={stopRec}
            className="tap font-sans"
            style={{
              width: "100%",
              padding: "15px 0",
              borderRadius: 20,
              border: `2px solid ${P.copper}`,
              background: "transparent",
              color: P.copper,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            ⏹ Stop &amp; Finish Summary
          </button>
        )}

        {canProceed && (
          <button
            onClick={onNext}
            className="tap font-sans"
            style={{
              width: "100%",
              padding: "16px 0",
              borderRadius: 20,
              border: "none",
              background: P.rust,
              color: "#FBF6EF",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 10px 32px rgba(201,74,30,0.4)",
            }}
          >
            Verify this with MIA →
          </button>
        )}

        {!canProceed && (
          <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p className="font-sans" style={{ fontSize: 11, color: "rgba(232,196,160,0.28)", textAlign: "center" }}>
              {offline ? "Enter arrival & departure times to continue" : "Tap the mic to record your post-visit summary"}
            </p>
          </div>
        )}
      </div>
      <PDIFooter dark />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN 4 — MIA REVIEW
// ═══════════════════════════════════════════════════════════════════════════
function ScrubScreen({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"scanning" | "results">("scanning");
  const [fixing, setFixing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const t = setTimeout(() => setPhase("results"), 2300);
    return () => clearTimeout(t);
  }, []);

  const milestones = [
    { id: "date", label: "Date & client confirmed", status: "ok" },
    { id: "times", label: "Start & end time logged", status: "ok" },
    { id: "services", label: "Services described", status: "ok" },
    {
      id: "response",
      label: "Client's response noted",
      status: "error",
      error: "Mention how your client felt — her words, her energy, her response.",
    },
    {
      id: "needs",
      label: "New needs identified",
      status: "error",
      error: "Note any emerging needs or referrals flagged during the visit.",
    },
    { id: "sig", label: "Signature ready", status: "pending" },
    { id: "provider", label: "Provider ID on record", status: "ok" },
  ];

  const errorsLeft = milestones.filter((m) => m.status === "error" && !fixing[m.id]).length;

  // Scanning state
  if (phase === "scanning") {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          background: P.parchment,
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 24px",
        }}
      >
        <Art screen="scrub" />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative", width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="96" height="96" style={{ position: "absolute", top: 0, left: 0 }}>
              <circle cx="48" cy="48" r="42" fill="none" stroke={P.border} strokeWidth="2" />
              <circle
                cx="48"
                cy="48"
                r="42"
                fill="none"
                stroke={P.rust}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="264"
                strokeDashoffset="264"
                style={{ animation: "arcDraw 2.3s ease-out forwards", transformOrigin: "48px 48px", transform: "rotate(-90deg)" }}
              />
            </svg>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: P.plum,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 34,
                animation: "breathe 2s ease-in-out infinite",
                zIndex: 1,
              }}
            >
              👩🏾
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p className="font-serif" style={{ fontSize: 24, fontWeight: 700, color: P.plum, margin: "0 0 7px", lineHeight: 1.25 }}>
              MIA is working on
              <br />
              your record…
            </p>
            <p className="font-sans" style={{ fontSize: 12, color: P.muted }}>
              {"Checking your state's milestones"}
            </p>
          </div>
        </div>
        <PDIFooter />
      </div>
    );
  }

  // Results state
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: P.parchment }}>
      <Art screen="scrub" />

      <div style={{ padding: "16px 24px 10px", position: "relative", zIndex: 2 }}>
        <span
          className="f0 font-sans"
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: P.rust,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Step 04 · MIA Review
        </span>
        <h2 className="f1 font-serif" style={{ fontSize: 30, fontWeight: 700, color: P.plum, margin: "4px 0 2px", lineHeight: 1.1 }}>
          {errorsLeft === 0 ? "Here's what you have." : "Here's what's missing."}
        </h2>
        <p className="f2 font-sans" style={{ fontSize: 11, color: P.muted }}>
          {"Checking your state's milestones · 7 items"}
        </p>
      </div>

      {/* Transcript */}
      <div
        className="f2"
        style={{
          margin: "0 16px 10px",
          background: P.linen,
          borderRadius: 16,
          padding: "11px 14px",
          border: `1px solid ${P.border}`,
        }}
      >
        <p
          className="font-sans"
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: P.muted,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 4,
          }}
        >
          Transcript · Amara Johnson
        </p>
        <p className="font-sans" style={{ fontSize: 11, color: P.plumSoft, lineHeight: 1.65 }}>
          {"\"…Visit began 10:02 AM. Rebozo sifting and counter-pressure performed. Client reported mild discomfort at 10:45. Concluded 12:10 PM…\""}
        </p>
      </div>

      {/* Milestones list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px 6px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          position: "relative",
          zIndex: 2,
        }}
      >
        {milestones.map((m, i) => {
          const resolved = m.status === "error" && fixing[m.id];
          const st = resolved ? "ok" : m.status;
          const bg = st === "ok" ? P.sageLt : st === "error" ? "#FDF3EE" : P.amberLt;
          const bdr = st === "ok" ? P.sage : st === "error" ? P.rust : P.amber;
          const tc = st === "ok" ? P.sage : st === "error" ? P.rustHov : P.amber;

          return (
            <div key={m.id} style={{ animation: `rowIn 0.3s ${i * 45}ms ease both` }}>
              <div
                style={{
                  background: bg,
                  border: `1.5px solid ${bdr}`,
                  borderRadius: 14,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.25s",
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0, animation: resolved ? "checkPop 0.4s cubic-bezier(0.34,1.56,0.64,1)" : "none" }}>
                  {st === "ok" ? "✅" : st === "error" ? "❌" : "🔲"}
                </span>
                <p className="font-sans" style={{ fontSize: 12, fontWeight: 600, color: tc, margin: 0, flex: 1 }}>
                  {m.label}
                </p>
                {st === "pending" && (
                  <span
                    className="font-sans"
                    style={{
                      fontSize: 9,
                      color: P.amber,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    PENDING
                  </span>
                )}
              </div>
              {m.status === "error" && !fixing[m.id] && (
                <div
                  style={{
                    margin: "0 6px",
                    background: P.plum,
                    borderRadius: "0 0 12px 12px",
                    padding: "10px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <p className="font-sans" style={{ fontSize: 11, color: "rgba(232,196,160,0.75)", lineHeight: 1.5, margin: 0 }}>
                    {m.error}
                  </p>
                  <button
                    onClick={() => setFixing((p) => ({ ...p, [m.id]: true }))}
                    className="tap font-sans"
                    style={{
                      alignSelf: "flex-start",
                      background: P.rust,
                      color: "#FBF6EF",
                      border: "none",
                      borderRadius: 10,
                      padding: "7px 16px",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Add Note &amp; Fix
                  </button>
                </div>
              )}
              {m.status === "error" && fixing[m.id] && (
                <div style={{ margin: "0 6px", background: P.sageLt, borderRadius: "0 0 12px 12px", padding: "7px 14px" }}>
                  <p className="font-sans" style={{ fontSize: 11, fontWeight: 700, color: P.sage, margin: 0 }}>
                    ✓ Fix it in one tap — done.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: "10px 16px 0", position: "relative", zIndex: 2 }}>
        <CTA
          label={errorsLeft > 0 ? `Fix ${errorsLeft} item${errorsLeft > 1 ? "s" : ""} to continue` : "Continue to Sign-Off →"}
          onClick={onNext}
          disabled={errorsLeft > 0}
        />
      </div>
      <PDIFooter />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN 5 — SIGN-OFF
// ═══════════════════════════════════════════════════════════════════════════
function SignOffScreen() {
  const [signed, setSigned] = useState(false);
  const [generating, setGen] = useState(false);
  const [done, setDone] = useState(false);
  const [sparkling, setSparkling] = useState(false);

  const generate = () => {
    setGen(true);
    setTimeout(() => {
      setGen(false);
      setDone(true);
      setSparkling(true);
      setTimeout(() => setSparkling(false), 3000);
    }, 2400);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: P.parchment }}>
      <Art screen="signoff" />

      {!done ? (
        <>
          <div style={{ padding: "16px 24px 10px", position: "relative", zIndex: 2 }}>
            <span
              className="f0 font-sans"
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: P.rust,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Step 05 · Final
            </span>
            <h2 className="f1 font-serif" style={{ fontSize: 32, fontWeight: 700, color: P.plum, margin: "4px 0 0", lineHeight: 1.1 }}>
              Record complete.
            </h2>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0 16px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Summary chip — "State-ready" */}
            <div
              className="f1"
              style={{
                background: P.sageLt,
                border: `1.5px solid ${P.sage}`,
                borderRadius: 16,
                padding: "12px 16px",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 20 }}>📋</span>
              <div>
                <p className="font-serif" style={{ fontSize: 16, fontWeight: 500, color: P.sage, margin: 0 }}>
                  7/7 Milestones Cleared
                </p>
                <p className="font-sans" style={{ fontSize: 11, color: "#2A5C3C", margin: 0 }}>
                  Amara Johnson · #101 · T1032 · State-ready
                </p>
              </div>
            </div>

            {/* Signature */}
            <div
              className="f2"
              style={{
                background: P.white,
                borderRadius: 20,
                padding: 16,
                border: `1.5px solid ${signed ? P.sage : P.border}`,
                transition: "border-color 0.3s",
                boxShadow: "0 2px 14px rgba(45,27,53,0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <p
                  className="font-sans"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: P.plumSoft,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    margin: 0,
                  }}
                >
                  Sign to authenticate
                </p>
                {signed && (
                  <span className="font-sans" style={{ fontSize: 11, color: P.sage, fontWeight: 600 }}>
                    ✓ Signature captured.
                  </span>
                )}
              </div>
              <SigPad onSigned={setSigned} />
            </div>

            {/* Checklist */}
            <div
              className="f3"
              style={{
                background: P.white,
                borderRadius: 18,
                padding: "14px 16px",
                border: `1px solid ${P.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {(
                [
                  ["HIPAA-encrypted storage", true],
                  ["State billing ready", true],
                  ["State-compliant format", true],
                  ["Doula signature", signed],
                ] as const
              ).map(([lbl, ok]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 7,
                      flexShrink: 0,
                      background: ok ? P.rust : P.linen,
                      border: `1.5px solid ${ok ? P.rust : P.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "#FBF6EF",
                      transition: "all 0.25s",
                    }}
                  >
                    {ok ? "✓" : ""}
                  </div>
                  <p className="font-sans" style={{ fontSize: 12, fontWeight: 500, color: ok ? P.plum : P.muted, margin: 0 }}>
                    {lbl}
                  </p>
                </div>
              ))}
            </div>

            {signed && (
              <p
                className="font-serif"
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  fontStyle: "italic",
                  color: P.sage,
                  fontWeight: 500,
                  animation: "fadeUp 0.3s ease both",
                }}
              >
                Export unlocked.
              </p>
            )}
          </div>

          <div style={{ padding: "10px 16px 0", position: "relative", zIndex: 2 }}>
            <button
              onClick={generate}
              disabled={!signed || generating}
              className="tap font-sans"
              style={{
                width: "100%",
                padding: "17px 0",
                borderRadius: 22,
                border: "none",
                background: signed ? P.rust : P.copper,
                color: "#FBF6EF",
                fontWeight: 700,
                fontSize: 15,
                cursor: signed ? "pointer" : "default",
                transition: "all 0.28s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: signed ? "0 10px 32px rgba(201,74,30,0.38)" : "none",
              }}
            >
              {generating ? (
                <>
                  <span style={{ animation: "spin 0.9s linear infinite", display: "inline-block", fontSize: 14 }}>◐</span> Generating
                  PDF…
                </>
              ) : (
                "📄 Generate Signed Compliance PDF"
              )}
            </button>
          </div>
          <PDIFooter />
        </>
      ) : (
        /* SUCCESS + SPARKLE */
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 20px",
            gap: 20,
            position: "relative",
            zIndex: 2,
          }}
        >
          <SparkleLayer active={sparkling} />

          {/* Check circle with concentrated sparkles */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 118,
                height: 118,
                borderRadius: "50%",
                background: P.sage,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 52,
                animation: "successPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both",
                boxShadow: `0 0 0 18px ${P.sageLt},0 0 0 36px rgba(59,110,82,0.07)`,
              }}
            >
              ✅
            </div>
            <SparkleLayer active={sparkling} />
          </div>

          <div style={{ textAlign: "center", animation: "fadeUp 0.4s 0.3s ease both" }}>
            <h3 className="font-serif" style={{ fontSize: 32, fontWeight: 700, color: P.plum, margin: "0 0 6px" }}>
              Signed record exported.
            </h3>
            <p className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: P.sage, margin: "0 0 4px" }}>
              Synced to secure vault · State-ready
            </p>
            <p className="font-sans" style={{ fontSize: 11, color: P.muted }}>
              Amara Johnson · #101 · PDF sealed &amp; encrypted
            </p>
          </div>

          <div
            style={{
              background: P.linen,
              borderRadius: 20,
              padding: "14px 20px",
              width: "100%",
              border: `1px solid ${P.border}`,
              animation: "fadeUp 0.4s 0.45s ease both",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <SparkleLayer active={sparkling} />
            {["📄 PDF generated & signed", "🔒 Encrypted vault upload", "📬 Billing queue ready", "🏛 State submission ready"].map(
              (item, i) => (
                <p
                  key={i}
                  className="font-sans"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: P.plum,
                    padding: "5px 0",
                    margin: 0,
                    borderBottom: i < 3 ? `1px solid ${P.border}` : "none",
                  }}
                >
                  {item}
                </p>
              )
            )}
          </div>

          <div
            style={{
              background: P.plum,
              borderRadius: 22,
              padding: "18px 24px",
              width: "100%",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              animation: "fadeUp 0.4s 0.6s ease both",
            }}
          >
            <SparkleLayer active={sparkling} />
            <p className="font-serif" style={{ fontSize: 20, fontWeight: 700, fontStyle: "italic", color: P.copper, margin: "0 0 4px" }}>
              Now you can export.
            </p>
            <p className="font-sans" style={{ fontSize: 11, color: "rgba(232,196,160,0.55)", margin: 0 }}>
              This visit is 100% audit-proof.
            </p>
          </div>

          <PDIFooter />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
const SLABELS = ["Welcome", "Setup", "Record", "Review", "Sign-Off"];

export default function MiaApp() {
  const [screen, setScreen] = useState("welcome");
  const [visitType, setVisitType] = useState<string | null>(null);

  const nav = (s: string) => setScreen(s);
  const back = () => setScreen(SCREENS[Math.max(0, SCREENS.indexOf(screen) - 1)]);

  const bg: Record<string, string> = {
    welcome: P.parchment,
    visit: P.parchment,
    record: P.plum,
    scrub: P.parchment,
    signoff: P.parchment,
  };

  return (
    <div
      className="font-sans"
      style={{
        minHeight: "100vh",
        background: "#E2D5C8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <GlobalStyles />

      {/* Phone shell */}
      <div
        style={{
          width: 390,
          height: 812,
          background: bg[screen],
          borderRadius: 52,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: `0 40px 100px rgba(45,27,53,0.48),
                     0 0 0 10px ${P.plum},
                     0 0 0 13px ${P.copper}`,
          transition: "background 0.35s ease",
          position: "relative",
        }}
      >
        <StatusBar />
        <div style={{ flexShrink: 0, background: bg[screen], transition: "background 0.35s" }}>
          <ProgressBar screen={screen} />
        </div>
        <div style={{ flexShrink: 0, background: bg[screen], transition: "background 0.35s" }}>
          <Header screen={screen} onBack={back} />
        </div>

        <div key={screen} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
          {screen === "welcome" && <WelcomeScreen onNext={() => nav("visit")} />}
          {screen === "visit" && (
            <VisitScreen
              onNext={(vt) => {
                setVisitType(vt);
                nav("record");
              }}
            />
          )}
          {screen === "record" && <RecordScreen visitType={visitType || "prenatal"} onNext={() => nav("scrub")} />}
          {screen === "scrub" && <ScrubScreen onNext={() => nav("signoff")} />}
          {screen === "signoff" && <SignOffScreen />}
        </div>

        <div
          style={{
            height: 26,
            background: bg[screen],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.35s",
          }}
        >
          <div
            style={{
              width: 120,
              height: 4,
              borderRadius: 999,
              background: screen === "record" ? "rgba(251,246,239,0.12)" : "rgba(45,27,53,0.1)",
            }}
          />
        </div>
      </div>

      {/* Demo nav */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 5,
          background: "rgba(45,27,53,0.92)",
          backdropFilter: "blur(16px)",
          padding: "8px 14px",
          borderRadius: 999,
          boxShadow: "0 8px 32px rgba(45,27,53,0.5)",
        }}
      >
        {SLABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => setScreen(SCREENS[i])}
            className="font-sans"
            style={{
              minWidth: 44,
              height: 30,
              borderRadius: 999,
              background: screen === SCREENS[i] ? P.rust : "rgba(232,196,160,0.08)",
              color: screen === SCREENS[i] ? "#FBF6EF" : P.copper,
              border: "none",
              cursor: "pointer",
              fontSize: 10,
              fontWeight: 700,
              padding: "0 10px",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
