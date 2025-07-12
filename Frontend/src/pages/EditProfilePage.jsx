// src/pages/EditProfilePage.jsx
import React, { useState, useEffect } from 'react';

const EditProfilePage = () => {
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    nickname: '',
    gender: '',
    ageGroup: '',
    hobby: '',
    weekend: '',
    voiceIntro: null,
    icon: '',
  });
  const [audioURL, setAudioURL] = useState(null);

  // 初期表示：プロフィール取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`http://127.0.0.1:5000/api/profile?id=${userId}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            nickname: data.nickname,
            gender: data.gender,
            ageGroup: data.ageGroup,
            hobby: data.hobby,
            weekend: data.weekend,
            voiceIntro: null,
            icon: data.icon,
          });
          if (data.voiceURL) setAudioURL(`http://127.0.0.1:5000${data.voiceURL}`);
        } else {
          alert(data.error || 'プロフィールの取得に失敗しました');
        }
      } catch (err) {
        console.error('取得エラー:', err);
        alert('通信エラーが発生しました');
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'voiceIntro' && files.length > 0) {
      const audioFile = files[0];
      setAudioURL(URL.createObjectURL(audioFile));
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    for (const key in formData) {
      if (formData[key]) form.append(key, formData[key]);
    }

    form.append('id', userId);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/update-profile', {
        method: 'POST',
        body: form,
      });

      if (res.ok) {
        alert('プロフィールを更新しました');
        window.location.href = '/';
      } else {
        const data = await res.json();
        alert(data.error || '更新に失敗しました');
      }
    } catch (err) {
      console.error('送信エラー:', err);
      alert('通信エラーが発生しました');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>プロフィール編集</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="text" name="nickname" placeholder="ニックネーム" value={formData.nickname} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">性別</option>
          <option value="男性">男性</option>
          <option value="女性">女性</option>
          <option value="未回答">未回答</option>
        </select>
        <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} required>
          <option value="">年齢帯</option>
          <option value="10代">10代</option>
          <option value="20代">20代</option>
          <option value="30代">30代</option>
          <option value="40代以上">40代以上</option>
        </select>
        <input type="text" name="hobby" placeholder="趣味" maxLength={20} value={formData.hobby} onChange={handleChange} required />
        <input type="text" name="weekend" placeholder="休日の過ごし方" maxLength={20} value={formData.weekend} onChange={handleChange} required />
        <label>
          自己紹介ボイスの再アップロード（任意）
          <input type="file" name="voiceIntro" accept="audio/*" onChange={handleChange} />
        </label>
        {audioURL && <audio src={audioURL} controls style={{ marginTop: 10 }} />}
        <button type="submit" style={{ padding: 12, backgroundColor: '#555', color: '#fff', borderRadius: 6 }}>保存</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
