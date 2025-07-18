# file_name.py
import pandas as pd
import sys
import os

def main():
    if len(sys.argv) != 3:
        print("사용법: python3 file_name.py file1.csv file2.csv")
        sys.exit(1)

    file1_path = sys.argv[1]
    file2_path = sys.argv[2]

    # 파일 존재 확인
    if not os.path.exists(file1_path) or not os.path.exists(file2_path):
        print("입력한 파일 경로를 확인해주세요.")
        sys.exit(1)

    # CSV 읽기
    df1 = pd.read_csv(file1_path)
    df2 = pd.read_csv(file2_path)

    # 비교 기준 컬럼 정제
    suburbs = df2['suburb'].astype(str).str.strip().str.lower().unique()
    df1['locality_clean'] = df1['Locality'].astype(str).str.strip().str.lower()

    # 필터링
    filtered_df = df1[df1['locality_clean'].isin(suburbs)]

    # 정제된 컬럼 제거
    filtered_df = filtered_df.drop(columns=['locality_clean'])

    # 결과 저장
    output_path = "filtered_output.csv"
    filtered_df.to_csv(output_path, index=False)
    print(f"필터링 완료: {output_path}에 저장됨")

if __name__ == "__main__":
    main()
