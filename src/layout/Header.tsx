import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header
      style={{
        height: 64,
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
      }}
    >
      {/* 왼쪽 페이지 타이틀 입니다. */}
      <div style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>
      </div>

      {/* 오른쪽 사원증 공지사항 공간 입니다. */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>

        {/* 로그아웃 버튼 입니다. */}
        <button
          onClick={handleLogout}
          style={{
            padding: "7px 14px",
            background: "#f1f5f9",
            color: "#334155",
            border: "1px solid #e2e8f0",
            borderRadius: 6,
            fontSize: 12.5,
            cursor: "pointer",
            fontWeight: 600,
            transition: "all .15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
          }}
        >
          ログアウト
        </button>
      </div>
    </header>
  );
}