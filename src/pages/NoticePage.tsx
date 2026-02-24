import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notice";
import AppLayout from "../layout/AppLayout";

export default function NoticePage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  function formatDate(dateStr?: string) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    getNotices()
      .then((res) => setNotices(res ?? []))
      .catch(() => setError("お知らせを読み込めませんでした"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <div className="dashboard-layout">
        <div className="main-area">

          {/* 제목 카드입니다. */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>お知らせ</div>
            <div style={{ color: "var(--text-sub)", marginTop: 6 }}>
              社内のお知らせ一覧を確認できます
            </div>
          </div>

          {/* 상태 입니다.  */}
          {loading && (
            <div className="card" style={{ padding: 30 }}>
              読み込み中...
            </div>
          )}

          {error && (
            <div className="card" style={{ padding: 30, color: "#dc2626" }}>
              {error}
            </div>
          )}

          {/* 목록 입니다. */}
          {!loading && !error && (
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              {notices.length === 0 ? (
                <div style={{ padding: 30, color: "var(--text-sub)" }}>
                  登録されたお知らせはありません
                </div>
              ) : (
                notices.map((n, i) => (
                  <div
                    key={n.id}
                    className="card-hover"
                    onClick={() => navigate(`/main/notices/${n.id}`)}
                    style={{
                      padding: "18px 22px",
                      borderBottom:
                        i !== notices.length - 1 ? "1px solid #F1F5F9" : "none",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                  >
                    {/* 제목 입니다. */}
                    <div style={{ fontWeight: 700, fontSize: 16 }}>
                      {n.title}
                    </div>

                    {/* 날짜 입니다. */}
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-sub)",
                        marginTop: 6,
                      }}
                    >
                      {formatDate(n.createdAt)}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}