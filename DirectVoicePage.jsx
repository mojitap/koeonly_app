import React from "react";

export default function DirectVoicePage() {
  useAuthRedirect();
  return (
    <div className="pt-4 pb-20 px-4">
      <h1 className="text-xl font-semibold text-pink-600 mb-4">ダイレクトボイス</h1>
      <p>ここにダイレクトボイスの機能が入ります。</p>
    </div>
  );
}