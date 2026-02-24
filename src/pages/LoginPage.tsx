import { useState } from "react";
import axios from "axios";
import { setToken } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8182/api/auth/login", {
        email,
        password,
      });

      setToken(res.data.accessToken);
      
      localStorage.setItem(
        "user",
        JSON.stringify({
          employeeId: res.data.email,
        }),
      );

      nav("/test");
    } catch {
      setError("Employee ID またはパスワードが正しくありません");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f6f7f8",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* 헤더 입니다. */}
      <header
        style={{
          paddingTop: 20,
          paddingRight: 30,
          height: "7vh",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          onClick={() => nav("/")}
          src="/IntraSys_logo_transparent.png"
          alt="logo"
          style={{
            position: "absolute",
            left: 20,
            height: 180,
            objectFit: "contain",
          }}
        />
      </header>

      <div style={{ flex: 1, display: "flex" }}>
        {/* 왼쪽 입니다. */}
        <div
          style={{
            flex: 1.2,
            background: "linear-gradient(135deg, #137fec, #1e40af)",
            color: "white",
            padding: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: 52, fontWeight: 800, marginBottom: 24 }}>
            社内勤怠管理システム
          </h1>

          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 40 }}>
            内部のスペースに安全にアクセス。
          </p>

          <div style={{ marginBottom: 12 }}>✔ Secure Login System</div>
          <div style={{ marginBottom: 12 }}>
            ✔ Convenient attendance management
          </div>
          <div style={{ marginBottom: 12 }}>✔ Quick maintenance</div>
        </div>

        {/* 오른쪽 입니다. */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={login} style={{ width: "100%", maxWidth: 420 }}>
            <h2 style={{ fontSize: 30, marginBottom: 6 }}>Welcome</h2>
            <p style={{ color: "#666", marginBottom: 30 }}>
              Please enter your employee login information
            </p>

            {/* 이메일 입니다. */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", fontWeight: 600, marginBottom: 6 }}
              >
                Employee ID
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 12px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: 15,
                }}
              />
            </div>

            {/* 패스워드 입니다. */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", fontWeight: 600, marginBottom: 6 }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 12px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: 15,
                }}
              />
            </div>

            {/* 에러입니다. */}
            <div style={{ color: "red", marginBottom: 10, fontSize: 13 }}>
              {error}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                marginBottom: 24,
              }}
            >
              <span style={{ color: "#137fec", cursor: "pointer" }}></span>
              <span
                onClick={() => nav("/signup")}
                style={{ color: "#137fec", cursor: "pointer" }}
              >
                Sign up
              </span>
            </div>

            <button
              disabled={loading}
              style={{
                width: "100%",
                height: 48,
                background: "#137fec",
                color: "white",
                border: "none",
                borderRadius: 6,
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "ログイン中..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
