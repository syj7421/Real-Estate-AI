import pandas as pd

# Load CSV
df = pd.read_csv("src/data/suburb analysis/melbourne_suburb_house_median.csv")

# Clean column names
df.columns = df.columns.str.strip()

# Define final year and confirm column exists
final_year = 2024
final_col = str(final_year)

# Convert all year columns to numeric
for year in range(2014, final_year + 1):
    col = str(year)
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors="coerce")

# Calculate PA for each start year up to 2023
for start_year in range(2014, final_year):
    start_col = str(start_year)
    if start_col in df.columns:
        n_years = final_year - start_year
        pa_col_name = f"PA {start_year}-24"
        df[pa_col_name] = ((df[final_col] / df[start_col]) ** (1 / n_years) - 1) * 100
        df[pa_col_name] = df[pa_col_name].round(1)

# Save result
df.to_csv("PA_suburb_every_year.csv", index=False)
print("Saved to PA_suburb_every_year.csv")
