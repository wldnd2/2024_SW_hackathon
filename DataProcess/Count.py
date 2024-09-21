import json
import re
from collections import Counter

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