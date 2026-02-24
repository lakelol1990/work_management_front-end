import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../api/notice";

export default function NoticePreview() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    getNotices().then((data) => {
      setNotices(data.slice(0, 5)); // 최신 5개만 올리겠습니다.
    });
  }, []);

  return (
    <div style={card}>
      <div style={header}>
        <h2 style={{ margin: 0 }}>お知らせ</h2>
        <span style={more} onClick={() => navigate("/main/notices")}>
          一覧へ →
        </span>
      </div>

      {notices.map((n) => (
        <div
          key={n.id}
          style={item}
          onClick={() => navigate(`/main/notices/${n.id}`)}
        >
          <div style={title}>{n.title}</div>
          <div style={date}>{n.createdAt?.slice(0, 10)}</div>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#fff",
  borderRadius: 14,
  padding: 16,
  boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
};

const more = {
  fontSize: 12,
  color: "#2563eb",
  cursor: "pointer",
};

const item = {
  padding: "10px 8px",
  borderRadius: 8,
  cursor: "pointer",
  marginBottom: 6,
  borderBottom: "1px solid #f1f1f1",
};

const title = {
  fontSize: 13,
  fontWeight: 500,
};

const date = {
  fontSize: 11,
  color: "#888",
};