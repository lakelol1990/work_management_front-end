# 勤怠管理システム (Work Management System)

社内勤怠管理システムのフロントエンドプロジェクトです。
React + TypeScript ベースの SPA として開発し、Spring Boot の REST API と連携して出退勤管理およびお知らせ機能を提供します。

---

## 📌 プロジェクト概要

社員の出退勤記録管理とお知らせ確認のための Web サービスです。
認証ベースのアクセス制御を適用し、ログインユーザーのみシステム機能を利用できます。

---

## 🛠 技術スタック

### Frontend

* React
* TypeScript
* Vite
* Axios
* React Router

### State & Auth

* カスタム認証ストア（ログイン状態管理）
* Private Route（認証ルーティング）

### Development Tool

* ESLint
* npm

---

## ✨ 主な機能

### 🔐 認証

* ログイン / 新規登録
* 認証ユーザーのみアクセス可能なルーティング制御

### 🕒 勤怠管理

* 出勤登録
* 退勤登録
* 勤怠履歴の確認

### 📢 お知らせ

* お知らせ一覧表示
* お知らせ詳細表示

---

## 📂 プロジェクト構造

```
src
 ├─ api            # サーバー通信モジュール
 ├─ layout         # 共通レイアウト
 ├─ pages          # 画面ページ
 ├─ routers        # ルーティングおよび認証処理
 ├─ store          # グローバル状態管理
 └─ main.tsx       # アプリ開始ポイント
```

---

## 🚀 実行方法

```bash
# パッケージインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザアクセス

```
http://localhost:5173
```

---

## 🔗 Backend Repository

Spring Boot ベースの REST API サーバーと連携します。

---

## 👩‍💻 開発者

個人プロジェクト
