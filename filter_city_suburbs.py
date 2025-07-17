import json

# 🔧 설정
input_file = "src/data/house analysis/melbourneSuburbs.json"          # 전체 suburb가 있는 입력 파일
output_file = "src/data/house analysis/citySuburbs.json"   # 필터링된 결과 출력 파일
target_suburbs = ["NORTH MELBOURNE", "PARKVILLE", "CARLTON", "MELBOURNE","DOCKLANDS", "SOUTHBANK", "EAST MELBOURNE", "WEST MELBOURNE", "SOUTH MELBOURNE", "SOUTH WHARF", "PORT MELBOURNE", "CARLTON SOUTH", "CARLTON NORTH"]  # 원하는 서브럽 이름 리스트 (대문자 기준)

# 📥 1. 입력 파일 열기
with open(input_file, "r", encoding="utf-8-sig") as f:
    data = json.load(f)

# 🧹 2. features 필터링
filtered_features = [
    feature for feature in data["features"]
    if feature["properties"].get("vic_loca_2", "").upper() in target_suburbs
]

# 📤 3. 새 GeoJSON 만들기
filtered_geojson = {
    "type": "FeatureCollection",
    "features": filtered_features
}

# 💾 4. 저장
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(filtered_geojson, f, ensure_ascii=False, indent=2)

print(f"✅ {len(filtered_features)} suburbs saved to '{output_file}'")
