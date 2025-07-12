import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">コイコイへようこそ</h1>
      <p className="mb-6">声の自己紹介でつながる、あたらしい出会い</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 bg-pink-500 text-white rounded shadow"
        >
          新規登録
        </button>

        {userId && (
          <button
            onClick={() => navigate("/mypage")}
            className="px-6 py-2 bg-gray-300 text-black rounded shadow"
          >
            マイページへ
          </button>
        )}
      </div>
    </div>
  );
}
