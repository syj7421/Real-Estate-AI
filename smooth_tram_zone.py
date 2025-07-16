import geojson
from shapely.geometry import shape, mapping, Polygon, LinearRing
import numpy as np

# --- Paste your polygon coordinates here (in [lng, lat] order) ---
polygon_geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {"name": "Melbourne Free Tram Zone"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [144.93870320193497, -37.820735938145845],
                    [144.94840397834187, -37.82302598424069],
                    [144.97516474084364, -37.815406902012484],
                    [144.97299042889034, -37.81056198987275],
                    [144.9734364415987, -37.807654889983816],
                    [144.97087186852565, -37.8073025064625],
                    [144.96144842808508, -37.81013432203061],
                    [144.9597285709457, -37.80613356677873],
                    [144.95578276941356, -37.80571358661414],
                    [144.95521032149182, -37.809315646638986],
                    [144.95613032703042, -37.81156078794341],
                    [144.94511070411224, -37.814742633955156],
                    [144.94441461568044, -37.81339162125037],
                    [144.94313271237297, -37.81259051103347],
                    [144.93764157432446, -37.81470663238321],
                    [144.93840688973194, -37.81632391280718],
                    [144.94382149623968, -37.814358988039494],
                    [144.94609830967778, -37.81904449161007]
                ]]
            }
        }
    ]
}

def densify_ring(coords, num_points=20):
    """Interpolate points between each pair of coordinates in a ring."""
    ring = LinearRing(coords)
    new_coords = []
    for i in range(len(ring.coords) - 1):
        p1 = np.array(ring.coords[i])
        p2 = np.array(ring.coords[i + 1])
        for t in np.linspace(0, 1, num_points, endpoint=False):
            new_coords.append((p1 * (1 - t) + p2 * t).tolist())
    new_coords.append(ring.coords[-1])  # close the ring
    return new_coords

# Densify the polygon
feature = polygon_geojson["features"][0]
polygon = shape(feature["geometry"])
exterior = densify_ring(list(polygon.exterior.coords), num_points=20)  # Increase num_points for smoother

# If you have holes, densify them too (not present here)
holes = [densify_ring(list(h), num_points=20) for h in polygon.interiors]

smooth_polygon = Polygon(exterior, holes)
feature["geometry"] = mapping(smooth_polygon)

# Save to file
with open("smoothed_free_tram_zone.geojson", "w") as f:
    geojson.dump(polygon_geojson, f, indent=2)

print("Smoothed polygon saved to smoothed_free_tram_zone.geojson")
