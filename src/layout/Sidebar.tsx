import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: 240,
        background: "linear-gradient(180deg, #0f3fa6, #1e3a8a)",
        color: "#fff",
        padding: "24px 14px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 회사 로고 크기 입니다. */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 30,
          paddingLeft: 10,
          letterSpacing: 0.3,
        }}
      >
        INTRA SYS
      </div>

      {/* 메뉴입니다. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <MenuItem
          to="/test"
          active={location.pathname === "/test"}
        >
          ダッシュボード
        </MenuItem>

        <MenuItem
          to="/main/notices"
          active={location.pathname.startsWith("/main/notices")}
        >
          お知らせ
        </MenuItem>
      </div>
    </aside>
  );
}

function MenuItem({ children, active, to }: any) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div
        style={{
          position: "relative",
          padding: "12px 16px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: active ? 600 : 400,
          cursor: "pointer",
          transition: "all .15s ease",
          background: active ? "rgba(255,255,255,0.12)" : "transparent",
          color: "#fff",
        }}
        onMouseEnter={(e) => {
          if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.style.background = "transparent";
        }}
      >
        {/* 왼쪽 사이드바 선택 표시 입니다. */}
        {active && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 6,
              bottom: 6,
              width: 4,
              borderRadius: 4,
              background: "#93c5fd",
            }}
          />
        )}

        <span style={{ marginLeft: active ? 10 : 14 }}>{children}</span>
      </div>
    </Link>
  );
}