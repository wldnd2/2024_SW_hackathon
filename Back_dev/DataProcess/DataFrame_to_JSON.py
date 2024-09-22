import pandas as pd
import json
import re

# 조사로 끝나는 단어들을 제거하고 특수문자가 포함된 단어들을 제거하는 함수
def remove_particles_and_special_chars(keywords):
    # 조사 목록: 필요시 확장 가능
    particles = ['을', '를', '의', '이', '가', '에', '와', '과', '으로', '로']
    
    # 특수문자를 포함한 키워드를 걸러내기 위한 정규식 패턴
    special_char_pattern = re.compile(r"[()'\".,]")

    # 조사로 끝나는 단어 및 특수문자를 포함한 단어를 제거
    filtered_keywords = [
        word for word in keywords
        if not any(word.endswith(p) for p in particles) and not special_char_pattern.search(word)
    ]
    
    return filtered_keywords

# CSV 파일 로드 및 키워드 분석
def load_and_analyze_csv(csv_file):
    # CSV 파일 로드
    df = pd.read_csv(csv_file, encoding='utf-8')
    
    # 크리에이터별 키워드 추출
    creators_data = []
    for _, row in df.iterrows():
        creator_name = row['크리에이터명']
        item_name_clean = row['아이템명_clean']
        
        # 아이템명_clean에서 키워드를 추출 (공백 기준으로 단어를 분리)
        keywords = item_name_clean.split()
        
        # 조사 및 특수문자를 포함한 단어를 제거
        filtered_keywords = remove_particles_and_special_chars(keywords)
        
        # 결과를 리스트에 추가
        creators_data.append({
            'creator_name': creator_name,
            'keywords': filtered_keywords,  # 조사 및 특수문자가 제거된 키워드 리스트
            'keyword_count': len(filtered_keywords)  # 키워드 개수
        })
    
    return creators_data

# JSON 파일로 저장
def save_to_json(creators_data, output_file):
    # JSON으로 저장
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({'creators': creators_data}, f, ensure_ascii=False, indent=4)

# CSV 파일로 저장
def save_to_csv(creators_data, output_file):
    # 데이터프레임으로 변환 후 CSV로 저장
    df = pd.DataFrame(creators_data)
    df.to_csv(output_file, index=False, encoding='utf-8-sig')

# 메인 함수: CSV 로드 -> 키워드 분석 -> JSON 및 CSV 저장
def main():
    csv_input_file = 'DataFrame2.csv'  # 분석할 CSV 파일 경로
    json_output_file = 'creators_data.json'  # 저장할 JSON 파일 경로
    csv_output_file = 'Keyword_List.csv'  # 저장할 CSV 파일 경로
    
    # CSV 데이터 로드 및 키워드 추출
    creators_data = load_and_analyze_csv(csv_input_file)
    
    # 결과를 JSON 파일로 저장
    save_to_json(creators_data, json_output_file)
    print(f"크리에이터별 키워드 분석 결과가 {json_output_file}에 저장되었습니다.")
    
    # 결과를 CSV 파일로 저장
    save_to_csv(creators_data, csv_output_file)
    print(f"크리에이터별 키워드 분석 결과가 {csv_output_file}에 저장되었습니다.")

if __name__ == "__main__":
    main()