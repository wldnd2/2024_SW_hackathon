import json
import re
from collections import Counter
from konlpy.tag import Okt

# JSON 파일 읽기
with open('./DataProcess/creators_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 특수문자를 제거하고 단어 빈도수 계산
word_counter = Counter()

for creator in data['creators']:
    for keyword in creator['keywords']:
        # 특수문자 제거
        cleaned_keyword = re.sub(r'[^\w\s]', '', keyword)
        word_counter.update(cleaned_keyword.split())

# 단어 빈도수를 내림차순으로 정렬
sorted_word_frequencies = dict(word_counter.most_common())

# 결과를 JSON 형식으로 저장
with open('./DataProcess/word_frequencies.json', 'w', encoding='utf-8') as file:
    json.dump(sorted_word_frequencies, file, ensure_ascii=False, indent=4)

print("단어 빈도수가 'word_frequencies.json' 파일에 저장되었습니다.")

# 형태소 분석기 초기화
okt = Okt()

# 명사만 추출하여 새로운 딕셔너리 생성
noun_frequencies = {}
for word, count in sorted_word_frequencies.items():
    nouns = okt.nouns(word)
    if nouns:
        noun_frequencies[word] = count

# 결과를 JSON 형식으로 저장
with open('./DataProcess/noun_frequencies.json', 'w', encoding='utf-8') as file:
    json.dump(noun_frequencies, file, ensure_ascii=False, indent=4)

print("명사 빈도수가 'noun_frequencies.json' 파일에 저장되었습니다.")