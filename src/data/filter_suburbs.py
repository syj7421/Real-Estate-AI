import pandas as pd

# 1) 두 파일 읽기
suburbs    = pd.read_csv('metropolitan_melbourne_suburbs.csv')   # 1번 파일
dataset2   = pd.read_csv('aaaaaa.csv')                           # 2번 파일

# 2) 1번 파일에 존재하는 suburb 목록만 추출
target_suburbs = set(suburbs['Suburb'].str.strip().str.lower())

# 3) 2번 파일에서 필터링
filtered = (
    dataset2
    .assign(suburb=lambda df: df['Suburb'].str.strip())          # 공백 제거
    .loc[lambda df: df['Suburb'].str.lower().isin(target_suburbs),
         ['Suburb', 'Growth(PA)']]                               # 원하는 두 컬럼만
)

# 4) 결과 저장
filtered.to_csv('filtered_growth.csv', index=False)

print(f"완료: {len(filtered)}개 행을 filtered_growth.csv 로 저장했습니다.")
