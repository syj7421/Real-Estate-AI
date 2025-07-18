import json
import pandas as pd
import os

def filter_geojson_by_csv():
    # 📁 파일 경로 직접 설정
    geojson_path = 'vic_suburbs.json'
    csv_path = 'src/data/suburb analysis/melbourne_suburbs.csv'
    output_path = 'src/data/suburb analysis/main_suburbs.geojson'

    # 🔑 GeoJSON과 CSV에서 suburb 이름이 저장된 key
    geojson_suburb_key = 'vic_loca_2'
    csv_suburb_column = 'suburb'

    # ✅ 존재 여부 확인
    if not os.path.exists(geojson_path):
        print(f"❌ GeoJSON 파일이 존재하지 않습니다: {geojson_path}")
        return
    if not os.path.exists(csv_path):
        print(f"❌ CSV 파일이 존재하지 않습니다: {csv_path}")
        return

    # 📄 CSV에서 suburb 이름 목록 추출
    df = pd.read_csv(csv_path)
    suburb_list = set(df[csv_suburb_column].str.upper().str.strip())

    # 📄 GeoJSON 불러오기
    with open(geojson_path, 'r', encoding='utf-8') as f:
        geojson_data = json.load(f)

    # 🔍 필터링
    filtered_features = [
        feature for feature in geojson_data['features']
        if feature['properties'].get(geojson_suburb_key, '').upper().strip() in suburb_list
    ]

    # 🗂️ 결과 저장
    filtered_geojson = {
        "type": "FeatureCollection",
        "features": filtered_features
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(filtered_geojson, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 필터 완료. 결과 저장됨: {output_path}")
    print(f"📍 남은 suburb 수: {len(filtered_features)}")

if __name__ == "__main__":
    filter_geojson_by_csv()
