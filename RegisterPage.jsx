// ✅ RegisterPage.jsx
import React, { useState } from 'react';
import IconSelectModal from "../components/IconSelectModal";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    emailOrPhone: '',
    gender: '',
    ageGroup: '',
    hobby: '',
    weekend: '',
    voiceIntro: null,
    icon: '',
  });
  const [audioURL, setAudioURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleIconSelect = (icon) => {
    setFormData({ ...formData, icon });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        alert('すべての項目を入力してください');
        return;
      }
    }
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    form.append('id', '1');
    try {
      const res = await fetch('http://127.0.0.1:5000/api/update-profile', {
        method: 'POST',
        body: form,
      });
      if (res.ok) {
        localStorage.setItem('userId', '1');
        alert('登録が完了しました');
        window.location.href = '/';
      } else {
        const data = await res.json();
        alert(data.error || '登録に失敗しました');
      }
    } catch (err) {
      console.error('送信エラー:', err);
      alert('エラーが発生しました');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ユーザー登録</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="nickname" placeholder="ニックネーム" value={formData.nickname} onChange={handleChange} style={styles.input} required />
        <input type="text" name="emailOrPhone" placeholder="メールアドレス or 電話番号" value={formData.emailOrPhone} onChange={handleChange} style={styles.input} required />
        <div style={styles.row}>
          <select name="gender" value={formData.gender} onChange={handleChange} style={styles.select} required>
            <option value="">性別</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="未回答">未回答</option>
          </select>
          <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} style={styles.select} required>
            <option value="">年齢帯</option>
            <option value="10代">10代</option>
            <option value="20代">20代</option>
            <option value="30代">30代</option>
            <option value="40代以上">40代以上</option>
          </select>
        </div>
        <input type="text" name="hobby" placeholder="趣味（20文字以内）" maxLength={20} value={formData.hobby} onChange={handleChange} style={styles.input} required />
        <input type="text" name="weekend" placeholder="休日の過ごし方（20文字以内）" maxLength={20} value={formData.weekend} onChange={handleChange} style={styles.input} required />
        <div style={styles.voiceUpload}>
          <label>
            15秒の自己紹介ボイス
            <input type="file" name="voiceIntro" accept="audio/*" onChange={handleChange} required />
          </label>
          {audioURL && <audio src={audioURL} controls style={{ marginTop: 10 }} />}
        </div>
        <div className="text-center mt-4">
          <button type="button" onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-gray-200 rounded">
            アイコンを選ぶ
          </button>
        </div>
        {formData.icon && (
          <div className="text-center mt-2">
            <img
              src={formData.icon}
              alt="選択アイコン"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "contain",
                borderRadius: "50%",
                border: "1px solid #ccc",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        )}
        <IconSelectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleIconSelect} />
        <button type="submit" style={styles.button}>登録</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: 420, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' },
  title: { textAlign: 'center', marginBottom: 24 },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 10, fontSize: 16 },
  select: { padding: 10, fontSize: 16, flex: 1 },
  row: { display: 'flex', gap: 10 },
  voiceUpload: { fontSize: 14 },
  button: { marginTop: 20, padding: 12, fontSize: 16, backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
};

export default RegisterPage;