# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import send_from_directory
from models import db, User
import os
from werkzeug.utils import secure_filename
from flask_login import login_required

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/profile', methods=['GET'])
def get_profile():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({'error': 'IDが指定されていません'}), 400

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'ユーザーが見つかりません'}), 404
        
    return jsonify({
        'id': user.id,
        'nickname': user.nickname,
        'gender': user.gender,
        'ageGroup': user.age_group,
        'hobby': user.hobby,
        'weekend': user.weekend,
        'icon': user.icon_path,
        'voiceURL': f"/{user.voice_path}" if user.voice_path else None,
    })
    
@app.route('/api/update-profile', methods=['POST'])
def update_profile():
    user_id = request.form.get('id')
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'ユーザーが見つかりません'}), 404

    # 基本情報更新
    user.nickname = request.form.get('nickname')
    user.gender = request.form.get('gender')
    user.age_group = request.form.get('ageGroup')
    user.hobby = request.form.get('hobby')
    user.weekend = request.form.get('weekend')
    user.icon_path = request.form.get('icon')

    # 音声ファイルがあれば保存
    if 'voiceIntro' in request.files:
        file = request.files['voiceIntro']
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        user.voice_path = filepath

    db.session.commit()
    return jsonify({'message': 'プロフィール更新完了'})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
