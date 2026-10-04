"""Build the static Stremio addon from movies.json.

Run:  python build.py
Output goes to docs/ (publish that folder with GitHub Pages).
"""
import json
import os
import shutil

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "docs")

with open(os.path.join(HERE, "movies.json"), encoding="utf-8") as f:
    cfg = json.load(f)
addon, movies = cfg["addon"], cfg["movies"]

shutil.rmtree(OUT, ignore_errors=True)


def write(rel, data):
    path = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


CATALOG_ID = "my-picks"

write("manifest.json", {
    "id": addon["id"],
    "version": addon["version"],
    "name": addon["name"],
    "description": addon["description"],
    "resources": ["catalog", "stream"],
    "types": ["movie"],
    "idPrefixes": ["tt"],
    "catalogs": [{"type": "movie", "id": CATALOG_ID, "name": addon["catalogName"]}],
})

write(f"catalog/movie/{CATALOG_ID}.json", {"metas": [
    {
        "id": m["id"],
        "type": "movie",
        "name": m["name"],
        "releaseInfo": str(m.get("year", "")),
        "poster": m.get("poster") or f"https://images.metahub.space/poster/medium/{m['id']}/img",
    }
    for m in movies
]})

for m in movies:
    write(f"stream/movie/{m['id']}.json", {"streams": [
        {"name": addon["name"], "title": s.get("title", "Stream"), "url": s["url"]}
        for s in m["streams"]
    ]})

# GitHub Pages: serve files as-is, no Jekyll processing
open(os.path.join(OUT, ".nojekyll"), "w").close()

print(f"Built {len(movies)} movie(s) -> {OUT}")
