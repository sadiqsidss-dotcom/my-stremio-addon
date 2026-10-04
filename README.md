# My Stremio Addon (static, GitHub Pages)

Ek chhota Stremio addon jisme server nahi chahiye. Files GitHub Pages par free host hoti hain.

## Titles badalna
`movies.json` kholo aur `movies` list mein apni movies daalo:

- `id`: movie ka IMDb ID (jaise `tt2285752`)
- `name`, `year`
- `streams`: har stream ka `title` (jaise "720p") aur direct video `url`
- `poster` (optional): na doge to metahub se aayega

Sirf legal links daalo: apni hosted files, Archive.org public domain, open films, ya jinki tumhe ijazat hai.

## Build
```
python build.py
```
Ye `docs/` folder bana deta hai (manifest + catalog + stream JSON).

## GitHub par daalna
1. GitHub par naya repo banao (jaise `my-stremio-addon`).
2. Is folder ko push karo (`docs/` folder commit hona chahiye).
3. Repo > Settings > Pages > Source: `main` branch, folder `/docs`.
4. Thodi der baad addon ka URL hoga:
   `https://<username>.github.io/my-stremio-addon/manifest.json`

## Stremio mein install
- Stremio > Addons > Addon repository URL mein manifest URL paste karo, ya
- Claude se kaho: "ye manifest URL install karo".

## Dhyan rakho
- Stremio har `tt...` ID ke liye stream maangta hai. Jo movie tumhari list mein nahi, uski file 404 degi. Ye normal hai, Stremio ise ignore kar deta hai.
- Naya title add karne ke baad `python build.py` chalao, phir commit aur push karo.
- Version badalna ho to `movies.json` mein `addon.version` badlo.
