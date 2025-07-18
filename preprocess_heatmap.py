import csv, json, os, re
from pathlib import Path

# ── 경로 설정 ─────────────────────────────────────────────────────────────
BASE_DIR = Path("src/data")
CSV_IN   = 'src/data/suburb analysis/PA_suburb_every_year.csv'
GEO_IN   = 'src/data/suburb analysis/main_suburbs.geojson';
OUT_DIR  = Path("src/data") / "suburb analysis" / "every_PA_region"


OUT_DIR.mkdir(parents=True, exist_ok=True)   # 빈 폴더가 없으면 생성

# ── 1) CSV 모든 연도별 Growth 파싱 ────────────────────────────────────────
with open(CSV_IN, newline='', encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    fieldnames = reader.fieldnames or (rows[0].keys() if rows else [])

# 어떤 열들이 “PA YYYY-24” 형태인지 동적으로 추출
pa_cols = [col for col in fieldnames if re.fullmatch(r"PA \d{4}-24", col)]

# suburb → {연도열: 값} 구조로 빌드
growth_by_suburb = { row["Suburb"].strip(): { col: float(row[col]) if row[col] else None
                                              for col in pa_cols }
                     for row in rows }

# ── 2) 원본 GeoJSON 로드 ────────────────────────────────────────────────
with open(GEO_IN, encoding="utf-8") as f:
    base_geo = json.load(f)

# ── 3) 연도별 GeoJSON 생성 ─────────────────────────────────────────────
for col in pa_cols:
    # 깊은 복사(필요 최소한)
    geo = json.loads(json.dumps(base_geo))

    for feat in geo["features"]:
        name = feat["properties"].get("vic_loca_2") \
               or feat["properties"].get("name") \
               or feat["properties"].get("suburb")
        feat["properties"]["change"] = growth_by_suburb.get(name, {}).get(col)

    # 연도 추출 (예: "PA_2015_to_end" → "2015")
    year = col.split("-")[0]
    out_path = OUT_DIR / f"melbourneSuburbsWithChange_{year}.geojson"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(geo, f, ensure_ascii=False, indent=2)
    print(f"✔  {out_path.name} written")

print("► All yearly GeoJSON files generated in:", OUT_DIR)
