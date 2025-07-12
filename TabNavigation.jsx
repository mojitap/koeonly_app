// src/components/TabNavigation.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TabNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "マイページ", path: "/" },
    { label: "ダイレクトボイス", path: "/direct-voice" },
    { label: "条件で探す", path: "/search" },
  ];

  const handleLogout = () => {
    localStorage.clear();         // ✅ ユーザー情報をクリア
    navigate("/register");        // ✅ 登録画面にリダイレクト
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`text-sm text-center ${
            location.pathname === tab.path ? "font-bold text-pink-600" : "text-gray-600"
          }`}
        >
          {tab.label}
        </Link>
      ))}

      {/* ✅ ログアウトボタン（スタイル合わせ） */}
      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-red-600"
      >
        ログアウト
      </button>
    </nav>
  );
}