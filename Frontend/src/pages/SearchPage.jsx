import React from "react";

export default function SearchPage() {
  useAuthRedirect();
  return (
    <div className="pt-4 pb-20 px-4">
      <h1 className="text-xl font-semibold text-pink-600 mb-4">条件で探す</h1>
      <p>ここに検索フィルターやマッチング条件のUIが入ります。</p>
    </div>
  );
}
