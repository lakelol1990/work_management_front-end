import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotice } from "../api/notice";
import AppLayout from "../layout/AppLayout";

export default function NoticeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function formatDate(dateStr?: string) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    getNotice(Number(id))
      .then((res) => setNotice(res))
      .catch(() => setError("お知らせを読み込めませんでした"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AppLayout>
      <div className="dashboard-layout">
        <div className="main-area">

          {/* 상단 네비 입니다. */}
          <div
            className="card card-hover"
            onClick={() => navigate(-1)}
            style={{
              padding: "14px 18px",
              marginBottom: 18,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ← お知らせ一覧へ戻る
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

          {!loading && !error && !notice && (
            <div className="card" style={{ padding: 30 }}>
              存在しないお知らせです
            </div>
          )}

          {/* 본문 입니다. */}
          {!loading && !error && notice && (
            <>
              {/* 제목 카드 입니다. */}
              <div className="card" style={{ padding: 28, marginBottom: 22 }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>
                  {notice.title}
                </div>

                <div
                  style={{
                    color: "var(--text-sub)",
                    fontSize: 13,
                    marginTop: 10,
                  }}
                >
                  {formatDate(notice.createdAt)}
                </div>
              </div>

              {/* 내용 카드 입니다. */}
              <div
                className="card"
                style={{
                  padding: 30,
                  lineHeight: 1.9,
                  fontSize: 15,
                  whiteSpace: "pre-wrap",
                }}
              >
                {notice.content || "内容がありません"}
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}