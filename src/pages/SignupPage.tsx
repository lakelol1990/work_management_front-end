import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const isMismatch = confirm.length > 0 && password !== confirm;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isMismatch) {
      alert("パスワードが一致しません。");
      return;
    }

    try {
      setLoading(true);
      await signup({ email, password });
      alert("会員登録完了！");
      nav("/");
    } catch (e) {
      alert("会員登録失敗");
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
        {/* 왼쪽 패널 입니다. */}
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
            社員アカウントを作成してください。
          </p>

          <div style={{ marginBottom: 12 }}>✔ Secure Account Creation</div>
          <div style={{ marginBottom: 12 }}>
            ✔ Convenient attendance management
          </div>
          <div style={{ marginBottom: 12 }}>✔ Quick maintenance</div>
        </div>

        <div
          style={{
            flex: 1,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleSignup}
            style={{ width: "100%", maxWidth: 420 }}
          >
            <h2 style={{ fontSize: 30, marginBottom: 6 }}>Create Account</h2>
            <p style={{ color: "#666", marginBottom: 30 }}>
              Register your employee information
            </p>

            {/* 사원번호 입니다. */}
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
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* 비밀번호 입니다. */}
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
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* 비밀번호 체크 부분 입니다. */}
            <div style={{ marginBottom: 10 }}>
              <label
                style={{ display: "block", fontWeight: 600, marginBottom: 6 }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 12px",
                  border: isMismatch ? "1px solid red" : "1px solid #ddd",
                  borderRadius: 6,
                  fontSize: 15,
                  boxSizing: "border-box",
                }}
              />
            </div>

            {isMismatch && (
              <div style={{ color: "red", fontSize: 13, marginBottom: 10 }}>
                비밀번호가 일치하지 않습니다
              </div>
            )}

            <div style={{ marginTop: 10, marginBottom: 24 }}>
              <span
                onClick={() => nav("/")}
                style={{ color: "#137fec", cursor: "pointer", fontSize: 14 }}
              >
                Back to login
              </span>
            </div>

            <button
              disabled={isMismatch || !email || !password || loading}
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
              {loading ? "作成中..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
