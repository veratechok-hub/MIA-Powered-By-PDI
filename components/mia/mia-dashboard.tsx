"use client";

import { useState } from "react";

// ─── ACCESSIBLE EARTH PALETTE ────────────────────────────────────────────────
const P = {
  parchment: "#F5EDE3",
  linen: "#E8C9B5",
  copper: "#E8C9B5",
  copperMid: "#D4B898",
  plum: "#4A5C40",
  plumSoft: "#6B7C5E",
  rust: "#C2856A",
  rustLight: "#F5EDE3",
  sage: "#6B7C5E",
  sageLt: "#EAE8E0",
  sageMid: "#8B9E7A",
  amber: "#D4778E",
  amberLt: "#F5EDE3",
  border: "#D4B898",
  white: "#FFFFFF",
  muted: "#2C1A0E",
  ink: "#2C1A0E",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes countUp { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
    @keyframes barGrow { from{width:0} to{width:var(--w)} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .f0{animation:fadeUp .35s ease both}
    .f1{animation:fadeUp .35s .06s ease both}
    .f2{animation:fadeUp .35s .12s ease both}
    .f3{animation:fadeUp .35s .18s ease both}
    .f4{animation:fadeUp .35s .24s ease both}
    .f5{animation:fadeUp .35s .30s ease both}
    .tap { transition: all .12s ease; cursor: pointer; }
    .tap:hover { opacity: 0.88; transform: translateY(-1px); }
    .tap:active { transform: scale(0.98); }
    .row-hover:hover { background: ${P.linen} !important; }
    .nav-item { transition: all .15s ease; border-radius: 10px; }
    .nav-item:hover { background: rgba(232,201,181,0.12); }
    .nav-item.active { background: rgba(194,133,106,0.18); }
    .badge-pulse { animation: pulse 2s ease-in-out infinite; }
  `}</style>
);

// ─── DATA ────────────────────────────────────────────────────────────────────
const DOULAS = [
  { id: 1, name: "Tamara Williams", npi: "1234567890", visits: 14, rate: 97, pending: 0, status: "active", type: "Birth & Prenatal", last: "Apr 7" },
  { id: 2, name: "Kezia Nwosu", npi: "2345678901", visits: 9, rate: 88, pending: 2, status: "active", type: "Postpartum", last: "Apr 6" },
  { id: 3, name: "Amara Johnson", npi: "3456789012", visits: 21, rate: 100, pending: 0, status: "active", type: "Full Spectrum", last: "Apr 8" },
  { id: 4, name: "Sofia Martinez", npi: "4567890123", visits: 7, rate: 71, pending: 3, status: "review", type: "Prenatal & Birth", last: "Apr 5" },
  { id: 5, name: "Destiny Clarke", npi: "5678901234", visits: 11, rate: 91, pending: 1, status: "active", type: "Birth", last: "Apr 7" },
  { id: 6, name: "Imani Osei", npi: "6789012345", visits: 5, rate: 80, pending: 0, status: "inactive", type: "Postpartum", last: "Mar 29" },
];

const QUEUE = [
  { id: "V-1041", doula: "Kezia Nwosu", client: "Brielle H.", type: "Postpartum", date: "Apr 6", duration: "72 min", issues: 1, flag: "Missing new needs" },
  { id: "V-1039", doula: "Sofia Martinez", client: "Camille R.", type: "Prenatal", date: "Apr 5", duration: "65 min", issues: 2, flag: "Member response + signature" },
  { id: "V-1038", doula: "Sofia Martinez", client: "Yolanda B.", type: "Birth", date: "Apr 5", duration: "8h 14m", issues: 1, flag: "Missing client response" },
  { id: "V-1036", doula: "Destiny Clarke", client: "Rosa N.", type: "Prenatal", date: "Apr 7", duration: "61 min", issues: 0, flag: null },
];

const BILLING = [
  { period: "March 2026", doulas: 6, visits: 48, amount: "$14,400", status: "exported", code: "T1032" },
  { period: "February 2026", doulas: 6, visits: 41, amount: "$12,300", status: "exported", code: "T1032" },
  { period: "January 2026", doulas: 5, visits: 35, amount: "$10,500", status: "exported", code: "T1032" },
  { period: "April 2026 (current)", doulas: 6, visits: 17, amount: "$5,100", status: "in-progress", code: "T1032" },
];

const ALERTS = [
  { type: "warn", msg: "Sofia M. has 3 records with missing milestones this month — pattern detected.", time: "2h ago" },
  { type: "info", msg: "April billing window closes in 6 days. 17 visits ready for export.", time: "5h ago" },
  { type: "ok", msg: "Amara J. achieved 100% compliance for the 3rd consecutive month.", time: "1d ago" },
  { type: "warn", msg: "Imani O. has had no visits logged in 10 days — check in?", time: "2d ago" },
];

// ─── NAV TABS ─────────────────────────────────────────────────────────────────
const TABS = ["Overview", "Doula Roster", "Approval Queue", "Billing Export", "Alerts"];
const ICONS = ["◈", "◉", "⧖", "◫", "◬"];

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
const Badge = ({ label, color, bg }: { label: string; color?: string; bg?: string }) => (
  <span
    className="font-sans"
    style={{
      display: "inline-block",
      background: bg || P.linen,
      color: color || P.muted,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "3px 9px",
      borderRadius: 999,
    }}
  >
    {label}
  </span>
);

const StatusDot = ({ status }: { status: string }) => {
  const map: Record<string, [string, string]> = {
    active: [P.sage, "Active"],
    review: [P.amber, "Review"],
    inactive: [P.border, "Inactive"],
  };
  const [col, lbl] = map[status] || [P.border, "—"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: col,
          animation: status === "active" ? "pulse 2.5s ease-in-out infinite" : "none",
        }}
      />
      <span className="font-sans" style={{ fontSize: 11, fontWeight: 600, color: col }}>
        {lbl}
      </span>
    </div>
  );
};

const ComplianceBar = ({ rate }: { rate: number }) => {
  const color = rate >= 95 ? P.sage : rate >= 80 ? P.amber : P.rust;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: P.linen, borderRadius: 999, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${rate}%`,
            background: color,
            borderRadius: 999,
            transition: "width 0.8s ease",
          }}
        />
      </div>
      <span className="font-sans" style={{ fontSize: 11, fontWeight: 700, color, minWidth: 32, textAlign: "right" }}>
        {rate}%
      </span>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  sub,
  accent,
  icon,
  delay = "f0",
}: {
  label: string;
  value: string;
  sub: string;
  accent?: string;
  icon: string;
  delay?: string;
}) => (
  <div
    className={delay}
    style={{
      background: P.white,
      borderRadius: 20,
      padding: "20px 22px",
      border: `1px solid ${P.border}`,
      flex: 1,
      boxShadow: "0 2px 12px rgba(28,14,4,0.05)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
      <p className="font-sans" style={{ fontSize: 11, fontWeight: 600, color: P.muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
        {label}
      </p>
      <span style={{ fontSize: 18, opacity: 0.6 }}>{icon}</span>
    </div>
    <p className="font-serif" style={{ fontSize: 34, fontWeight: 700, color: accent || P.plum, margin: "0 0 4px", lineHeight: 1 }}>
      {value}
    </p>
    <p className="font-sans" style={{ fontSize: 11, color: P.muted, margin: 0 }}>
      {sub}
    </p>
  </div>
);

// ─── VIEWS ────────────────────────────────────────────────────────────────────

// OVERVIEW
function OverviewView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Stat cards */}
      <div style={{ display: "flex", gap: 14 }}>
        <StatCard label="Active Doulas" value="6" sub="1 under review" accent={P.plum} icon="◉" delay="f0" />
        <StatCard label="Visits This Month" value="17" sub="48 in March" accent={P.rust} icon="📋" delay="f1" />
        <StatCard label="Compliance Rate" value="88%" sub="↑ 4% from last month" accent={P.sage} icon="✓" delay="f2" />
        <StatCard label="Pending Approval" value="4" sub="Needs review today" accent={P.amber} icon="⧖" delay="f3" />
        <StatCard label="Billing Ready" value="$5.1K" sub="April · 17 visits" accent={P.plum} icon="◫" delay="f4" />
      </div>

      {/* Two column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Compliance by doula */}
        <div
          className="f2"
          style={{
            background: P.white,
            borderRadius: 20,
            padding: "20px 22px",
            border: `1px solid ${P.border}`,
            boxShadow: "0 2px 12px rgba(28,14,4,0.05)",
          }}
        >
          <p className="font-serif" style={{ fontSize: 17, fontWeight: 700, color: P.plum, margin: "0 0 16px" }}>
            Compliance by Doula
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DOULAS.map((d) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  className="font-serif"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: P.rust,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#FBF6EF",
                    flexShrink: 0,
                  }}
                >
                  {d.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: P.plum,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 140,
                      }}
                    >
                      {d.name.split(" ")[0]} {d.name.split(" ")[1][0]}.
                    </span>
                    <span className="font-sans" style={{ fontSize: 11, color: P.muted }}>
                      {d.visits}v
                    </span>
                  </div>
                  <ComplianceBar rate={d.rate} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts + activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Alert feed */}
          <div
            className="f3"
            style={{
              background: P.white,
              borderRadius: 20,
              padding: "20px 22px",
              border: `1px solid ${P.border}`,
              boxShadow: "0 2px 12px rgba(28,14,4,0.05)",
              flex: 1,
            }}
          >
            <p className="font-serif" style={{ fontSize: 17, fontWeight: 700, color: P.plum, margin: "0 0 14px" }}>
              MIA Alerts
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ALERTS.map((a, i) => {
                const [bc, tc, icon] =
                  a.type === "warn" ? [P.amberLt, P.amber, "⚠"] : a.type === "ok" ? [P.sageLt, P.sage, "✓"] : ["#EEF2FF", "#4338CA", "i"];
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      background: bc,
                      borderRadius: 12,
                      padding: "9px 12px",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: tc,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: "#fff",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="font-sans" style={{ fontSize: 11, color: P.plum, lineHeight: 1.5, margin: "0 0 2px" }}>
                        {a.msg}
                      </p>
                      <p className="font-sans" style={{ fontSize: 10, color: P.muted, margin: 0 }}>
                        {a.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Visit type breakdown */}
      <div
        className="f4"
        style={{
          background: P.white,
          borderRadius: 20,
          padding: "20px 22px",
          border: `1px solid ${P.border}`,
          boxShadow: "0 2px 12px rgba(28,14,4,0.05)",
        }}
      >
        <p className="font-serif" style={{ fontSize: 17, fontWeight: 700, color: P.plum, margin: "0 0 16px" }}>
          April Visit Breakdown
        </p>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
          {(
            [
              ["Prenatal", "🌱", 8, P.sage],
              ["Birth", "⭐", 5, P.rust],
              ["Postpartum", "🌸", 4, P.amber],
            ] as const
          ).map(([type, icon, count, color]) => (
            <div key={type} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
              <span className="font-serif" style={{ fontSize: 22, fontWeight: 700, color }}>
                {count}
              </span>
              <div style={{ width: "100%", height: 6, background: P.linen, borderRadius: 999 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(count / 17) * 100}%`,
                    background: color,
                    borderRadius: 999,
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 13 }}>{icon}</span>
                <span className="font-sans" style={{ fontSize: 11, fontWeight: 600, color: P.muted }}>
                  {type}
                </span>
              </div>
            </div>
          ))}
          <div style={{ width: 1, height: 80, background: P.border }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 160 }}>
            <p className="font-sans" style={{ fontSize: 11, fontWeight: 700, color: P.muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
              Billing Code
            </p>
            <p className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: P.plum, margin: 0 }}>
              T1032
            </p>
            <p className="font-sans" style={{ fontSize: 11, color: P.muted, margin: 0 }}>
              All visit types · Doula Services
              <br />
              National standard · $300/visit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// DOULA ROSTER
function RosterView() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="f0" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: P.plum, margin: 0 }}>
            Doula Roster
          </h2>
          <p className="font-sans" style={{ fontSize: 12, color: P.muted, marginTop: 3 }}>
            6 providers · 5 active · 1 under review
          </p>
        </div>
        <button
          className="tap font-sans"
          style={{
            background: P.rust,
            color: "#FBF6EF",
            border: "none",
            borderRadius: 14,
            padding: "10px 20px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(201,74,30,0.3)",
          }}
        >
          + Add Doula
        </button>
      </div>

      <div
        className="f1"
        style={{
          background: P.white,
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${P.border}`,
          boxShadow: "0 2px 12px rgba(28,14,4,0.05)",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.4fr 1fr 1fr 0.8fr 1fr 0.8fr",
            padding: "12px 20px",
            background: P.linen,
            borderBottom: `1px solid ${P.border}`,
          }}
        >
          {["Doula", "Specialty", "Visits", "Compliance", "Pending", "Status", "Last Visit"].map((h) => (
            <span
              key={h}
              className="font-sans"
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: P.muted,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {DOULAS.map((d, i) => (
          <div
            key={d.id}
            className="row-hover"
            onClick={() => setSelected(selected === d.id ? null : d.id)}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.4fr 1fr 1fr 0.8fr 1fr 0.8fr",
              padding: "14px 20px",
              borderBottom: `1px solid ${P.border}`,
              cursor: "pointer",
              transition: "background 0.15s",
              background: selected === d.id ? P.rustLight : "transparent",
              animation: `fadeUp .3s ${i * 0.05}s ease both`,
            }}
          >
            {/* Name */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                className="font-serif"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: d.status === "inactive" ? P.linen : P.rust,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: d.status === "inactive" ? P.muted : "#FBF6EF",
                  flexShrink: 0,
                }}
              >
                {d.name[0]}
              </div>
              <div>
                <p className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: P.plum, margin: 0 }}>
                  {d.name}
                </p>
                <p className="font-sans" style={{ fontSize: 10, color: P.muted, margin: 0 }}>
                  NPI {d.npi.slice(0, 4)}••••{d.npi.slice(-2)}
                </p>
              </div>
            </div>

            <span className="font-sans" style={{ fontSize: 12, color: P.muted, alignSelf: "center" }}>
              {d.type}
            </span>
            <span className="font-serif" style={{ fontSize: 16, fontWeight: 600, color: P.plum, alignSelf: "center" }}>
              {d.visits}
            </span>
            <div style={{ alignSelf: "center" }}>
              <ComplianceBar rate={d.rate} />
            </div>
            <div style={{ alignSelf: "center" }}>
              {d.pending > 0 ? (
                <span
                  className="font-sans"
                  style={{
                    background: P.amberLt,
                    color: P.amber,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}
                >
                  {d.pending} pending
                </span>
              ) : (
                <span className="font-sans" style={{ fontSize: 11, color: P.sageMid, fontWeight: 600 }}>
                  ✓ clear
                </span>
              )}
            </div>
            <div style={{ alignSelf: "center" }}>
              <StatusDot status={d.status} />
            </div>
            <span className="font-sans" style={{ fontSize: 11, color: P.muted, alignSelf: "center" }}>
              {d.last}
            </span>
          </div>
        ))}
      </div>

      {/* Expanded detail */}
      {selected &&
        (() => {
          const d = DOULAS.find((x) => x.id === selected)!;
          return (
            <div
              className="f0"
              style={{
                background: P.white,
                borderRadius: 20,
                padding: "22px 24px",
                border: `1.5px solid ${P.rust}`,
                boxShadow: "0 4px 20px rgba(201,74,30,0.1)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div
                    className="font-serif"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: P.plum,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 700,
                      color: P.copper,
                    }}
                  >
                    {d.name[0]}
                  </div>
                  <div>
                    <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: P.plum, margin: 0 }}>
                      {d.name}
                    </h3>
                    <p className="font-sans" style={{ fontSize: 12, color: P.muted, margin: 0 }}>
                      NPI {d.npi} · 374J00000X · {d.type}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="tap font-sans"
                    style={{
                      background: P.linen,
                      color: P.plum,
                      border: "none",
                      borderRadius: 12,
                      padding: "9px 16px",
                      fontWeight: 600,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    View Records
                  </button>
                  <button
                    className="tap font-sans"
                    style={{
                      background: P.rust,
                      color: "#FBF6EF",
                      border: "none",
                      borderRadius: 12,
                      padding: "9px 16px",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Message
                  </button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {(
                  [
                    ["Total Visits", d.visits, "Apr 2026"],
                    ["Compliance", `${d.rate}%`, "This month"],
                    ["Pending", d.pending, "Records"],
                    ["Last Active", d.last, "Visit date"],
                  ] as const
                ).map(([l, v, s]) => (
                  <div
                    key={l}
                    style={{
                      background: P.parchment,
                      borderRadius: 14,
                      padding: "14px 16px",
                      border: `1px solid ${P.border}`,
                    }}
                  >
                    <p className="font-sans" style={{ fontSize: 10, fontWeight: 700, color: P.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>
                      {l}
                    </p>
                    <p className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: P.plum, margin: "0 0 2px" }}>
                      {v}
                    </p>
                    <p className="font-sans" style={{ fontSize: 10, color: P.muted, margin: 0 }}>
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
    </div>
  );
}

// APPROVAL QUEUE
function QueueView() {
  const [approved, setApproved] = useState<string[]>([]);
  const [flagged, setFlagged] = useState<string[]>([]);

  const approve = (id: string) => {
    setApproved((p) => [...p, id]);
  };
  const flag = (id: string) => {
    setFlagged((p) => [...p, id]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="f0" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: P.plum, margin: 0 }}>
            Supervisor Approval Queue
          </h2>
          <p className="font-sans" style={{ fontSize: 12, color: P.muted, marginTop: 3 }}>
            4 records awaiting review · 2 with compliance issues
          </p>
        </div>
        <Badge label="Review before billing" color={P.rust} bg={P.rustLight} />
      </div>

      {QUEUE.map((q, i) => {
        const isApproved = approved.includes(q.id);
        const isFlagged = flagged.includes(q.id);
        const isDone = isApproved || isFlagged;

        return (
          <div
            key={q.id}
            className="f1"
            style={{
              background: isApproved ? P.sageLt : isFlagged ? P.amberLt : P.white,
              borderRadius: 20,
              padding: "20px 22px",
              border: `1.5px solid ${isApproved ? P.sage : isFlagged ? P.amber : q.issues > 0 ? P.copper : P.border}`,
              boxShadow: "0 2px 12px rgba(28,14,4,0.05)",
              transition: "all 0.3s ease",
              animation: `fadeUp .3s ${i * 0.07}s ease both`,
              opacity: isDone ? 0.75 : 1,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              {/* Left info */}
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ background: P.plum, borderRadius: 12, padding: "8px 12px", flexShrink: 0 }}>
                  <p className="font-sans" style={{ fontSize: 9, fontWeight: 700, color: P.copper, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
                    Visit ID
                  </p>
                  <p className="font-serif" style={{ fontSize: 16, fontWeight: 700, color: "#FBF6EF", margin: 0 }}>
                    {q.id}
                  </p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <p className="font-serif" style={{ fontSize: 17, fontWeight: 700, color: P.plum, margin: 0 }}>
                      {q.doula}
                    </p>
                    <span style={{ fontSize: 9, color: P.muted }}>→</span>
                    <p className="font-sans" style={{ fontSize: 12, color: P.muted, margin: 0 }}>
                      {q.client}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Badge label={q.type} color={P.plumSoft} bg={P.linen} />
                    <Badge label={q.date} color={P.muted} bg={P.linen} />
                    <Badge label={q.duration} color={P.muted} bg={P.linen} />
                    {q.issues > 0 && <Badge label={`${q.issues} issue${q.issues > 1 ? "s" : ""}`} color={P.amber} bg={P.amberLt} />}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {!isDone ? (
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => flag(q.id)}
                    className="tap font-sans"
                    style={{
                      background: P.amberLt,
                      color: P.amber,
                      border: `1.5px solid ${P.amber}`,
                      borderRadius: 12,
                      padding: "9px 16px",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    ↩ Flag
                  </button>
                  <button
                    onClick={() => approve(q.id)}
                    className="tap font-sans"
                    style={{
                      background: P.sage,
                      color: "#FBF6EF",
                      border: "none",
                      borderRadius: 12,
                      padding: "9px 18px",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(59,110,82,0.3)",
                    }}
                  >
                    ✓ Approve
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: isApproved ? P.sageLt : P.amberLt,
                    borderRadius: 12,
                    padding: "8px 14px",
                    border: `1px solid ${isApproved ? P.sage : P.amber}`,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{isApproved ? "✅" : "⚠️"}</span>
                  <span className="font-sans" style={{ fontSize: 12, fontWeight: 700, color: isApproved ? P.sage : P.amber }}>
                    {isApproved ? "Approved" : "Flagged for correction"}
                  </span>
                </div>
              )}
            </div>

            {/* Issue detail */}
            {q.flag && !isDone && (
              <div
                style={{
                  background: P.plum,
                  borderRadius: 12,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 14 }}>⚠</span>
                <p className="font-sans" style={{ fontSize: 11, color: "rgba(232,196,160,0.85)", margin: 0, lineHeight: 1.5 }}>
                  <strong style={{ color: P.copper }}>MIA flagged:</strong> {q.flag}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {approved.length > 0 && (
        <div
          className="f0"
          style={{
            background: P.sageLt,
            borderRadius: 16,
            padding: "14px 18px",
            border: `1px solid ${P.sage}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: P.sage, margin: 0 }}>
            {approved.length} record{approved.length > 1 ? "s" : ""} approved · Ready to add to billing export
          </p>
          <button
            className="tap font-sans"
            style={{
              background: P.sage,
              color: "#FBF6EF",
              border: "none",
              borderRadius: 11,
              padding: "8px 16px",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Add to Export →
          </button>
        </div>
      )}
    </div>
  );
}

// BILLING EXPORT
function BillingView() {
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const doExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
    }, 2200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="f0" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: P.plum, margin: 0 }}>
            Billing Export
          </h2>
          <p className="font-sans" style={{ fontSize: 12, color: P.muted, marginTop: 3 }}>
            T1032 · All visits pre-scrubbed by MIA · State-ready format
          </p>
        </div>
      </div>

      {/* Current period CTA */}
      <div className="f1" style={{ background: P.plum, borderRadius: 20, padding: "24px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p className="font-sans" style={{ fontSize: 10, fontWeight: 700, color: P.copper, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 6px" }}>
              Current Billing Period
            </p>
            <h3 className="font-serif" style={{ fontSize: 26, fontWeight: 700, color: "#FBF6EF", margin: "0 0 4px" }}>
              April 2026
            </h3>
            <p className="font-sans" style={{ fontSize: 12, color: "rgba(232,196,160,0.7)", margin: 0 }}>
              17 visits · 6 doulas · $5,100 · Closes in 6 days
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p className="font-serif" style={{ fontSize: 40, fontWeight: 700, color: P.copper, margin: "0 0 12px", lineHeight: 1 }}>
              $5,100
            </p>
            {!exported ? (
              <button
                onClick={doExport}
                className="tap font-sans"
                style={{
                  background: exporting ? "rgba(201,74,30,0.6)" : P.rust,
                  color: "#FBF6EF",
                  border: "none",
                  borderRadius: 14,
                  padding: "12px 24px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(201,74,30,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {exporting ? (
                  <>
                    <span style={{ animation: "spin 0.9s linear infinite", display: "inline-block", fontSize: 14 }}>⟳</span> Generating…
                  </>
                ) : (
                  "📄 Export for State Billing"
                )}
              </button>
            ) : (
              <div
                style={{
                  background: "rgba(59,110,82,0.2)",
                  borderRadius: 14,
                  padding: "12px 20px",
                  border: "1px solid rgba(59,110,82,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 16 }}>✅</span>
                <span className="font-sans" style={{ fontSize: 13, fontWeight: 700, color: "#A8D8B8" }}>
                  Exported to State Portal
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mini compliance bar */}
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid rgba(232,196,160,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span className="font-sans" style={{ fontSize: 11, color: "rgba(232,196,160,0.6)" }}>
              Claims compliance
            </span>
            <span className="font-sans" style={{ fontSize: 11, fontWeight: 700, color: P.copper }}>
              88% · 15 of 17 ready
            </span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 999 }}>
            <div
              style={{
                height: "100%",
                width: "88%",
                background: P.copper,
                borderRadius: 999,
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <p className="font-sans" style={{ fontSize: 10, color: "rgba(232,196,160,0.5)", marginTop: 6 }}>
            2 records pending supervisor approval — approve to include in export
          </p>
        </div>
      </div>

      {/* History */}
      <div
        className="f2"
        style={{
          background: P.white,
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid ${P.border}`,
          boxShadow: "0 2px 12px rgba(28,14,4,0.05)",
        }}
      >
        <div
          style={{
            padding: "16px 22px",
            borderBottom: `1px solid ${P.border}`,
            background: P.linen,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="font-serif" style={{ fontSize: 17, fontWeight: 700, color: P.plum, margin: 0 }}>
            Export History
          </p>
          <span className="font-sans" style={{ fontSize: 11, color: P.muted }}>
            All periods · T1032
          </span>
        </div>

        {BILLING.map((b, i) => (
          <div
            key={b.period}
            className="row-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1.2fr 1fr 0.8fr",
              padding: "14px 22px",
              borderBottom: `1px solid ${P.border}`,
              animation: `fadeUp .3s ${i * 0.06}s ease both`,
              background: b.status === "in-progress" ? "#FFFBF5" : "transparent",
            }}
          >
            <div>
              <p className="font-sans" style={{ fontSize: 13, fontWeight: 600, color: P.plum, margin: 0 }}>
                {b.period}
              </p>
              {b.status === "in-progress" && (
                <span className="font-sans" style={{ fontSize: 9, fontWeight: 700, color: P.amber, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  • In Progress
                </span>
              )}
            </div>
            <span className="font-sans" style={{ fontSize: 12, color: P.muted, alignSelf: "center" }}>
              {b.doulas} doulas
            </span>
            <span className="font-sans" style={{ fontSize: 12, color: P.muted, alignSelf: "center" }}>
              {b.visits} visits
            </span>
            <span className="font-serif" style={{ fontSize: 17, fontWeight: 700, color: P.plum, alignSelf: "center" }}>
              {b.amount}
            </span>
            <div style={{ alignSelf: "center" }}>
              <Badge label={b.status === "exported" ? "Exported" : "Pending"} color={b.status === "exported" ? P.sage : P.amber} bg={b.status === "exported" ? P.sageLt : P.amberLt} />
            </div>
            {b.status === "exported" ? (
              <button
                className="tap font-sans"
                style={{
                  background: "none",
                  border: `1px solid ${P.border}`,
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontWeight: 600,
                  fontSize: 11,
                  color: P.muted,
                  cursor: "pointer",
                  alignSelf: "center",
                }}
              >
                ↓ Re-export
              </button>
            ) : (
              <span className="font-sans" style={{ fontSize: 11, color: P.muted, alignSelf: "center" }}>
                —
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ALERTS VIEW
function AlertsView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="f0">
        <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: P.plum, margin: 0 }}>
          MIA Alert Feed
        </h2>
        <p className="font-sans" style={{ fontSize: 12, color: P.muted, marginTop: 3 }}>
          Pattern detection across all doulas · Updated in real time
        </p>
      </div>
      {ALERTS.map((a, i) => {
        const [bc, tc, bdr, icon] =
          a.type === "warn"
            ? [P.amberLt, P.amber, P.amber, "⚠"]
            : a.type === "ok"
              ? [P.sageLt, P.sage, P.sage, "✓"]
              : ["#EEF2FF", "#4338CA", "#A5B4FC", "i"];
        return (
          <div
            key={i}
            className="f1"
            style={{
              background: bc,
              borderRadius: 18,
              padding: "18px 20px",
              border: `1.5px solid ${bdr}30`,
              animation: `fadeUp .3s ${i * 0.08}s ease both`,
            }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: tc,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "#fff",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <p className="font-sans" style={{ fontSize: 13, color: P.plum, lineHeight: 1.6, margin: "0 0 6px", fontWeight: 500 }}>
                  {a.msg}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <Badge label={a.time} color={P.muted} bg={P.linen} />
                  <Badge
                    label={a.type === "warn" ? "Action needed" : a.type === "ok" ? "No action" : "Info"}
                    color={tc}
                    bg={`${tc}20`}
                  />
                </div>
              </div>
              {a.type === "warn" && (
                <button
                  className="tap font-sans"
                  style={{
                    background: tc,
                    color: "#fff",
                    border: "none",
                    borderRadius: 11,
                    padding: "8px 14px",
                    fontWeight: 700,
                    fontSize: 11,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Review →
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MiaDashboard() {
  const [tab, setTab] = useState(0);

  const views = [<OverviewView key="overview" />, <RosterView key="roster" />, <QueueView key="queue" />, <BillingView key="billing" />, <AlertsView key="alerts" />];

  return (
    <div className="font-sans" style={{ minHeight: "100vh", background: "#EDE5D8", display: "flex" }}>
      <GlobalStyles />

      {/* SIDEBAR */}
      <div
        style={{
          width: 240,
          flexShrink: 0,
          background: P.plum,
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px",
          boxShadow: "4px 0 24px rgba(28,14,4,0.18)",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 32, paddingLeft: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: P.rust,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              👩🏾
            </div>
            <div>
              <p className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "#FBF6EF", margin: 0, lineHeight: 1 }}>
                MIA
              </p>
              <p className="font-sans" style={{ fontSize: 8, fontWeight: 600, color: "rgba(232,196,160,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
                For Organizations
              </p>
            </div>
          </div>
          <div style={{ background: "rgba(201,74,30,0.15)", borderRadius: 10, padding: "8px 12px", marginTop: 12 }}>
            <p className="font-sans" style={{ fontSize: 10, fontWeight: 700, color: P.copper, margin: 0 }}>
              Sunflower Birth Collective
            </p>
            <p className="font-sans" style={{ fontSize: 9, color: "rgba(232,196,160,0.5)", margin: 0 }}>
              Admin · Tulsa, OK
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {TABS.map((label, i) => (
            <button
              key={label}
              onClick={() => setTab(i)}
              className={`nav-item ${tab === i ? "active" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 14px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                background: tab === i ? "rgba(201,74,30,0.18)" : "transparent",
              }}
            >
              <span style={{ fontSize: 14, opacity: tab === i ? 1 : 0.5, color: tab === i ? P.copper : "#FBF6EF" }}>{ICONS[i]}</span>
              <span className="font-sans" style={{ fontSize: 13, fontWeight: tab === i ? 700 : 500, color: tab === i ? "#FBF6EF" : "rgba(251,246,239,0.55)" }}>
                {label}
              </span>
              {i === 2 && (
                <span
                  className="badge-pulse"
                  style={{
                    marginLeft: "auto",
                    background: P.amber,
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 800,
                    borderRadius: 999,
                    padding: "2px 7px",
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  4
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Powered by PDI */}
        <div style={{ paddingTop: 20, borderTop: `1px solid rgba(232,201,181,0.15)`, textAlign: "center" }}>
          <p className="font-sans" style={{ fontSize: 8, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,201,181,0.5)", margin: 0, lineHeight: 1.5 }}>
            Powered by PDI<br />
            <span style={{ fontSize: 7, letterSpacing: "0.08em" }}>Perinatal Documentation Integrity</span>
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div
          style={{
            background: P.parchment,
            borderBottom: `1px solid ${P.border}`,
            padding: "18px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <h1 className="font-serif" style={{ fontSize: 24, fontWeight: 700, color: P.plum, margin: 0 }}>
              {TABS[tab]}
            </h1>
            <p className="font-sans" style={{ fontSize: 11, color: P.muted, margin: 0, marginTop: 2 }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div
                className="font-sans"
                style={{
                  background: P.white,
                  border: `1px solid ${P.border}`,
                  borderRadius: 12,
                  padding: "8px 14px",
                  fontSize: 12,
                  color: P.muted,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 13 }}>🔔</span> Alerts
              </div>
              <div
                className="badge-pulse"
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: P.rust,
                  border: "2px solid #FBF6EF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                2
              </div>
            </div>
            <div
              className="font-serif"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: P.plum,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 700,
                color: P.copper,
              }}
            >
              D
            </div>
          </div>
        </div>

        {/* Content area */}
        <div key={tab} style={{ padding: "28px 32px", flex: 1 }}>
          {views[tab]}
        </div>
      </div>
    </div>
  );
}
