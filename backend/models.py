from flask_sqlalchemy import SQLAlchemy
import os  # ← これが必要

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(100))
    gender = db.Column(db.String(10))
    age_group = db.Column(db.String(10))
    hobby = db.Column(db.String(50))
    weekend = db.Column(db.String(50))
    icon_path = db.Column(db.String(200))
    voice_path = db.Column(db.String(200))

    def to_dict(self):
        return {
            'id': self.id,
            'nickname': self.nickname,
            'gender': self.gender,
            'ageGroup': self.age_group,
            'hobby': self.hobby,
            'weekend': self.weekend,
            'icon': self.icon_path,
            'voiceURL': f'/uploads/{os.path.basename(self.voice_path)}' if self.voice_path else None
        }
