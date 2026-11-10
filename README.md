# H24 Creationz website (two editions)

- `index.html` – Studio edition (cinematic, animated)
- `minimal/index.html` – Minimal edition (calm, iOS-style)
Both share the `assets` folder, so keep the folder structure exactly as it is.

## Upload to GitHub Pages
1. Create a public repository named `h24-creationz`.
2. Unzip this file. Open the `h24-creationz` folder and drag EVERYTHING inside it (all files plus the `assets` and `minimal` folders) into the repository's "uploading an existing file" page. Commit.
3. Settings > Pages > Deploy from a branch > `main` / `(root)` > Save.
4. Live in about a minute at https://harshavarthanep.github.io/h24-creationz/ (minimal edition at /minimal/).

If you use a different repo name, find and replace `h24-creationz` in index.html, minimal/index.html, 404.html, robots.txt and sitemap.xml.

## Before going live
- Testimonials are DRAFTS. Search "DRAFT QUOTES" in both index files, send each quote to the client, keep only what they approve.
- Free offers (15-minute brand call, findability report): keep only if you are happy to deliver them.
- "Decode H24" layer meanings (paper, frame, ink, fire, water) are a draft. Edit them in index.html and assets/js/minimal.js if your logo means something different.
- Add the seventh Android app name in assets/js/app.js (search "Retro Shooter").

## Updating later
Change `h24-v3` to `h24-v4` (and so on) at the top of `sw.js` after every update, so returning visitors get the new version.

## Logo
`assets/brand/h24-logo-4k.png` is your original logo upscaled to 3840x3840 with AI super-resolution. If you have the original design file, exporting from it will always be sharper.

## Store badges
The Chrome Web Store, Google Play and "Available at Amazon" badges load from Google and Amazon's official servers, so they only appear once the site is online.
