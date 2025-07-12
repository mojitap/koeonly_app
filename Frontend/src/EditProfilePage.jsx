import React, { useState, useEffect } from 'react';

const ICONS = {
  male: [
    '/icons/male1.png', '/icons/male2.png', '/icons/male3.png',
    '/icons/male4.png', '/icons/male5.png', '/icons/male6.png',
    '/icons/male7.png', '/icons/male8.png', '/icons/male9.png',
  ],
  female: [
    '/icons/female1.png', '/icons/female2.png', '/icons/female3.png',
    '/icons/female4.png', '/icons/female5.png', '/icons/female6.png',
    '/icons/female7.png', '/icons/female8.png', '/icons/female9.png',
  ],
};

const EditProfilePage = ({ currentUser }) => {
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
  const [iconGender, setIconGender] = useState('male');

  useEffect(() => {
    // プロフィール初期値の読み込み（propsなどから）
    if (currentUser) {
      setFormData({
        ...currentUser,
        voiceIntro: null, // 音声ファイルは新たにアップロードする必要あり
      });
      setAudioURL(currentUser.voiceURL || null);
    }
  }, [currentUser]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('更新データ:', formData);
    // PUT /api/update-profile などに送信処理を追加予定
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>プロフィール編集</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="nickname" placeholder="ニックネーム" value={formData.nickname} onChange={handleChange} style={styles.input} required />

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
            自己紹介ボイス（15秒以内）
            <input type="file" name="voiceIntro" accept="audio/*" onChange={handleChange} />
          </label>
          {audioURL && <audio src={audioURL} controls style={{ marginTop: 10 }} />}
        </div>

        <div style={styles.iconArea}>
          <div style={styles.genderToggle}>
            <button type="button" onClick={() => setIconGender('male')} style={iconGender === 'male' ? styles.activeTab : styles.tab}>男性</button>
            <button type="button" onClick={() => setIconGender('female')} style={iconGender === 'female' ? styles.activeTab : styles.tab}>女性</button>
          </div>
          <div style={styles.iconGrid}>
            {ICONS[iconGender].map((iconPath) => (
              <img
                key={iconPath}
                src={iconPath}
                alt="icon"
                onClick={() => handleIconSelect(iconPath)}
                style={{
                  ...styles.iconImg,
                  border: formData.icon === iconPath ? '2px solid #333' : '1px solid #ccc',
                }}
              />
            ))}
          </div>
        </div>

        <button type="submit" style={styles.button}>保存</button>
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
  iconArea: { marginTop: 20 },
  genderToggle: { display: 'flex', justifyContent: 'center', marginBottom: 10, gap: 10 },
  tab: { padding: 6, background: '#eee', border: '1px solid #ccc', cursor: 'pointer' },
  activeTab: { padding: 6, background: '#ccc', border: '1px solid #666', cursor: 'pointer' },
  iconGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 },
  iconImg: { width: 80, height: 80, objectFit: 'cover', borderRadius: 10, cursor: 'pointer' },
  button: { marginTop: 20, padding: 12, fontSize: 16, backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
};

export default EditProfilePage;
