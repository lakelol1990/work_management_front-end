import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: any) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main style={{ padding: 28, flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}