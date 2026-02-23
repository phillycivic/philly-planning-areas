# QGIS: Georeferencing a JPEG and Drawing Polygons

## Overview
How to georeference a JPEG image onto a Philadelphia basemap in QGIS, then manually draw polygons on top of it.

---

## Step 1: Georeference the JPEG

1. Go to **Layer > Georeferencer** (or Raster > Georeferencer in older versions)
2. Open your JPEG in the Georeferencer window
3. Go to **Settings > Transformation Settings** and configure:
   - Transformation type: Polynomial 1 (good for simple cases)
   - Output raster: set a destination path somewhere you have write access (e.g. Desktop), with a `.tif` extension
   - Target CRS: match your project CRS (e.g. EPSG:3857)
   - Avoid spaces or special characters in the file path

### Adding Ground Control Points (GCPs)

- Click a recognizable point on your image, then match it to the corresponding location on the map
- When entering coordinates manually, make sure to enter them as **X (longitude), Y (latitude)** — not the other way around
  - Philly coordinates look like: X = **-75.xxxxxx**, Y = **40.xxxxxx**
  - Even though the field says "East," negative longitude values are correct for Philly
- If your project CRS is EPSG:3857 (Web Mercator), look for a CRS button near the coordinate entry fields and set it to **EPSG:4326** so you can enter coordinates in degrees instead of meters
- Add at least **4 GCPs** spread across the image
- Click the green **Run** button to generate the georeferenced GeoTIFF

### Troubleshooting

- **"Could not create destination file"** — check that the output file path exists, you have write permissions, and the filename ends in `.tif`
- **Image lands near Africa (0°, 0°)** — you entered lat/lon backwards; swap them so longitude (the -75 value) is X and latitude (the 40 value) is Y

---

## Step 2: Add the Georeferenced Image to the Map

- The GeoTIFF should automatically load into QGIS after georeferencing
- If not: **Layer > Add Layer > Add Raster Layer** and browse to your `.tif` file

### Adjust Transparency
1. Right-click the layer in the Layers panel > **Properties**
2. Click **Transparency** in the left sidebar
3. Drag the **Global Opacity** slider down until you can see the basemap underneath

---

## Step 3: Draw Polygons on Top

1. Go to **Layer > Create Layer > New Shapefile Layer** (or GeoPackage)
2. Set the CRS and geometry type to **Polygon**
3. Save the file somewhere accessible
4. Select the new layer in the Layers panel
5. Click the **pencil icon** to toggle editing
6. Click the **Add Feature** button (polygon icon with a star)

### Drawing
- **Single-click** to place each vertex/corner of the polygon
- **Right-click** to finish and close the polygon
- A popup will ask for attributes — click **OK**
- Immediately start single-clicking to draw the next polygon
- Repeat for all polygons without stopping editing — they all go into the same layer

### Saving
- When all polygons are done, click the **pencil icon** again to stop editing
- Click **Save** when prompted

### Export to GeoJSON (optional)
- Right-click the layer > **Export > Save Features As**
- Set format to **GeoJSON**
- Choose output path and click OK

---

## Key Things to Remember

| Thing | Detail |
|---|---|
| Coordinate order | X = Longitude (-75), Y = Latitude (40) |
| EPSG:3857 GCP entry | Switch GCP CRS to 4326 to enter in degrees |
| Output format | Georeferencer outputs `.tif`, not `.jpg` |
| Multiple polygons | Stay in edit mode between polygons to keep them on one layer |
| File paths | No spaces, no special characters, folder must already exist |
