import json, csv

# ◆ Paths (adjust if needed)
CSV_IN    = 'src/data/filtered_growth.csv'
GEO_IN    = 'src/data/melbourneSuburbs.json'
GEO_OUT   = 'src/data/melbourneSuburbsWithChange.geojson'

# 1) Load price growth
change_by_suburb = {}
with open(CSV_IN, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        suburb = row['Suburb'].strip()
        try:
            change = float(row['Growth(PA)'])
        except:
            continue
        change_by_suburb[suburb] = change

# 2) Load GeoJSON
with open(GEO_IN, encoding='utf-8') as f:
    geo = json.load(f)

# 3) Inject `change` into each feature
for feat in geo['features']:
    # match on whichever property holds your suburb name
    name = feat['properties'].get('vic_loca_2') or feat['properties'].get('name')
    feat['properties']['change'] = change_by_suburb.get(name, None)

# 4) Write out enriched GeoJSON
with open(GEO_OUT, 'w', encoding='utf-8') as f:
    json.dump(geo, f, ensure_ascii=False, indent=2)

print(f"► Wrote enriched GeoJSON to {GEO_OUT}")
