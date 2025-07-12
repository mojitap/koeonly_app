import React, { useEffect, useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect"; // ←これは残す

export default function MyPage() {
  useAuthRedirect(); // ←これも残す（ログインチェック）

  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`http://localhost:5000/api/profile?id=${userId}`);
        const data = await res.json();

        if (res.ok) {
          setProfile(data);
        } else {
          alert(data.error || "プロフィール取得に失敗しました");
        }
      } catch (err) {
        console.error("取得エラー:", err);
        alert("通信エラーが発生しました");
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) return <div className="p-4">読み込み中...</div>;

  return (
    <div className="pt-4 pb-20 px-4">
      <h1 className="text-xl font-semibold text-pink-600 mb-4">マイページ</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <img src={profile.icon} alt="アイコン" className="w-20 h-20 rounded-full mb-4" />
        <p><strong>ニックネーム：</strong>{profile.nickname}</p>
        <p><strong>性別：</strong>{profile.gender}</p>
        <p><strong>年齢帯：</strong>{profile.ageGroup}</p>
        <p><strong>趣味：</strong>{profile.hobby}</p>
        <p><strong>休日の過ごし方：</strong>{profile.weekend}</p>
        {profile.voiceURL && (
          <div className="mt-4">
            <p><strong>自己紹介ボイス：</strong></p>
            <audio src={`http://localhost:5000${profile.voiceURL}`} controls className="w-full mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
