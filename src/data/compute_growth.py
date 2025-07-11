import pandas as pd

# 1) CSV 파일 경로
INPUT_CSV  = '18-24prelim-house-price.csv'
OUTPUT_CSV = 'price_change_2018_2024.csv'

# 2) 데이터 로드 및 칼럼 정리
df = pd.read_csv(INPUT_CSV)
if 'Unnamed: 0' in df.columns:
    df = df.rename(columns={'Unnamed: 0': 'suburb'})

# 3) 숫자 타입 변환
df['2018'] = pd.to_numeric(df['2018'], errors='coerce')
df['2024'] = pd.to_numeric(df['2024'], errors='coerce')

# 4) 2018 또는 2024가 NA인 행 제거
df_clean = df.dropna(subset=['2018', '2024'])

# 5) 2018→2024 성장률 계산 (%)
df_clean['pct_change_2018_2024'] = (
    (df_clean['2024'] - df_clean['2018']) / df_clean['2018']
) * 100

# 6) 결과 저장
out = df_clean[['suburb', 'pct_change_2018_2024']]
out.to_csv(OUTPUT_CSV, index=False)

print(f"✅ {len(out)}개 서브러브에 대해 성장률 계산 완료")
print(f"▶ 저장된 파일: {OUTPUT_CSV}")
