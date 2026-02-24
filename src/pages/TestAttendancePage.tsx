import { useEffect, useState } from "react";
import {
  clockIn,
  clockOut,
  getTodayAttendance,
  getMyAttendance,
} from "../api/attendance";
import AppLayout from "../layout/AppLayout";
import NoticePreview from "../contents/NoticePreview";

export default function AttendanceDashboard() {
  const [now, setNow] = useState(new Date());
  const [today, setToday] = useState<Record<string, any> | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  /* 현재 시간 입니다. */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* 시간 포맷 입니다. */
  function formatTime(time?: string | null) {
    if (!time) return "-";
    return new Date(time).toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  function formatDateTime(time?: string | null) {
    if (!time) return "-";
    return new Date(time).toLocaleString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  }

  /* 데이터 입니다. */
  const loadToday = async () => {
    try {
      const res = await getTodayAttendance();
      setToday(res ?? {});
    } catch {
      setToday({});
    }
  };

  const loadHistory = async () => {
    try {
      const res = await getMyAttendance();
      setHistory(res ?? []);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    loadToday();
    loadHistory();
  }, []);

  const isWorking = today?.checkIn && !today?.checkOut;

  const handleClick = async () => {
    if (isWorking) await clockOut();
    else await clockIn();
    await loadToday();
    await loadHistory();
  };

  return (
    <AppLayout>
      <div className="dashboard-layout">
        {/* 메인입니다. */}
        <div className="main-area">
          {/* 시계 카드 입니다. */}
          <div
            className="card"
            style={{
              padding: 40,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  color: "var(--text-sub)",
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                {formatDate(now)}
              </div>

              <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>
                {now.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </div>
            </div>

            <button
              onClick={handleClick}
              className="main-button"
              style={{
                background: isWorking
                  ? "linear-gradient(135deg,#ef4444,#dc2626)"
                  : "linear-gradient(135deg,#3b82f6,#2563eb)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {isWorking ? "退勤する" : "出勤する"}
              </div>
              <div style={{ fontSize: 22, marginTop: 6, fontWeight: 800 }}>
                {isWorking ? "CLOCK OUT" : "CLOCK IN"}
              </div>
            </button>
          </div>

          {/* 상태 카드 입니다. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
              marginTop: 30,
            }}
          >
            <MiniCard
              title="勤務状態"
              value={isWorking ? "勤務中" : "待機中"}
            />
            <MiniCard title="出勤時間" value={formatTime(today?.checkIn)} />
            <MiniCard title="退勤時間" value={formatTime(today?.checkOut)} />
          </div>

          {/* 오늘 기록 입니다. */}
          <SectionTable title="今日の勤務記録">
            <tr>
              <td>{today?.workDate ?? "-"}</td>
              <td>{formatDateTime(today?.checkIn)}</td>
              <td>{formatDateTime(today?.checkOut)}</td>
            </tr>
          </SectionTable>

          {/* 전체 기록 입니다. */}
          <SectionTable title="全勤務履歴">
            {history.map((h, i) => (
              <tr key={i}>
                <td>{h.workDate}</td>
                <td>{formatDateTime(h.checkIn)}</td>
                <td>{formatDateTime(h.checkOut)}</td>
              </tr>
            ))}
          </SectionTable>
        </div>

        {/* 오른쪽 패널 입니다. */}
        <RightPanel today={today} isWorking={isWorking} />
      </div>
    </AppLayout>
  );
}

/* 작은 카드 입니다. */
function MiniCard({ title, value }: any) {
  return (
    <div className="card card-hover" style={{ padding: 22 }}>
      <div style={{ color: "var(--text-sub)", fontSize: 13 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{value}</div>
    </div>
  );
}

/* 테이블 입니다. */
function SectionTable({ title, children }: any) {
  return (
    <div className="card" style={{ marginTop: 40, padding: 25 }}>
      <h2 style={{ marginBottom: 18, fontSize: 18, fontWeight: 700 }}>
        {title}
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              color: "var(--text-sub)",
              textAlign: "left",
              fontSize: 14,
            }}
          >
            <th>日付</th>
            <th>出勤</th>
            <th>退勤</th>
          </tr>
        </thead>
        <tbody className="table-body">{children}</tbody>
      </table>
    </div>
  );
}

/* 오른쪽 사원증 카드 입니다. */
function RightPanel({ today, isWorking }: any) {
  const [employeeId, setEmployeeId] = useState<string>("----");

  // 최초 1번 user 읽습니다. 
  useEffect(() => {
    const raw = localStorage.getItem("user");

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (parsed?.employeeId) setEmployeeId(parsed.employeeId);
    } catch (e) {
      console.error("user 파싱 실패", e);
    }
  }, []);

  return (
    <div className="right-panel">
      {/* 사원증 입니다. */}
      <div
        className="card"
        style={{
          paddingTop: 50,
          paddingBottom: 100,
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          textAlign: "center",
          background: "whitle",
          borderRadius: 20,
        }}
      >
        {/* 사진 입니다.*/}
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto",
            background: "#F3F4F6",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21a8 8 0 10-16 0" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* 정보 입니다. */}
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
          }}
        >
          {/* 사원 표시 입니다.  */}
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.3 }}>
            職員
          </div>

          {/* 구분선 입니다. */}
          <div
            style={{
              height: 1,
              background: "#E5E7EB",
              margin: "12px 24px",
            }}
          />

          {/* 정보 영역 입니다. 사원 번호 연동입니다. */}
          <div style={{ fontSize: 17, lineHeight: "22px" }}>
            <div>
              <span style={{ color: "#9CA3AF" }}>社員番号</span>
              <span style={{ marginLeft: 8, fontWeight: 600 }}>
                {employeeId}
              </span>
            </div>

            <div style={{ marginTop: 4 }}>
              <span style={{ color: "#9CA3AF" }}>勤務状態</span>
              <span
                style={{
                  marginLeft: 8,
                  padding: "3px 8px",
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 12,
                  background: isWorking ? "#DCFCE7" : "#FEE2E2",
                  color: isWorking ? "#166534" : "#991B1B",
                }}
              >
                {isWorking ? "勤務中" : "待機中"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
      <NoticePreview />
      </div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <span style={{ color: "var(--text-sub)" }}>{label}</span>
      <b>{value}</b>
    </div>
  );
}
