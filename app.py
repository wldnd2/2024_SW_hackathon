import json
import pandas as pd
from pprint import pprint
from flask import Flask, render_template, request
from sentence_transformers import SentenceTransformer, util
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

# 크리에이터 데이터프레임 읽기
df = pd.read_csv('./Dataprocess/DataFrame2.csv')

# SBERT 모델 로드
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

def database_init():
    try:
        app = firebase_admin.get_app()
    except ValueError as e:
        cred = credentials.Certificate("daeguhackathon.json")
        firebase_admin.initialize_app(cred, {
            "databaseURL": "https://daeguhackathon-62d3b-default-rtdb.asia-southeast1.firebasedatabase.app/",
            "storageBucket": f"{cred.project_id}.appspot.com"
        })
        print("Firebase Database Initialized")

def read_all_data():
    ref = db.reference('/')
    data = ref.get()
    return data

@app.route('/')
def home():
    database_init()
    return render_template('index.html')

@app.route('/match', methods=['POST'])
def match():
    keywords = request.form.getlist('keywords')
    if len(keywords) != 5:
        return "5개의 키워드를 입력해주세요.", 400

    # '아이템명' 열과 입력된 키워드들의 유사도 계산
    new_df = df[['크리에이터명', '아이템명']]

    # 문장 임베딩 생성
    item_embeddings = model.encode(new_df['아이템명'].tolist(), convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords, convert_to_tensor=True)

    # 유사도 계산
    cosine_sim = util.pytorch_cos_sim(keyword_embeddings, item_embeddings)

    # 유사도가 높은 10개의 크리에이터 추출
    similarity_scores = cosine_sim.mean(dim=0).cpu().numpy()
    top_indices = similarity_scores.argsort()[-10:][::-1]
    top_creators = new_df.iloc[top_indices]

    # 유사도 점수를 퍼센트로 변환하여 데이터프레임에 추가
    top_creators['유사도'] = similarity_scores[top_indices] * 100
    pprint(top_creators.to_dict(orient='records'))
    return render_template('match.html', creators=top_creators.to_dict(orient='records'))

@app.route('/data', methods=['GET'])
def data():
    database_init()
    data = read_all_data()
    pprint(data)
    return json.dumps(data, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    database_init()
    app.run(debug=True)