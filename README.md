# The AI Timer Lab portfolio

Design H is the current portfolio. `index.html` and `design-h.html` contain the same published page; keep them in sync when editing. Styling and playback use `design-h.css`, `design-h.js`, and `classroom-player.js`.

## Preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` from this folder and open http://127.0.0.1:8000/.

## Publishing

GitHub Pages publishes the root of `main` at https://ailingtay.github.io/portfolio-web/. The direct H link is https://ailingtay.github.io/portfolio-web/design-h.html.

Media used by H from the original LFS-managed source folder is copied into `assets/portfolio-media/` as regular files so GitHub Pages can serve it directly. Preserve the originals for the local archive.

## Search visibility

Both pages include `<meta name="robots" content="noindex, nofollow, noimageindex">`. Keep this tag when editing. Google must crawl the pages to read it; do not block them with `robots.txt`. Existing search results may remain until Google recrawls. Use Google Search Console's Removals tool if faster removal is needed.

This setting does not restrict visitors, protect direct media URLs, or hide a public GitHub repository. Anyone with a page or asset URL can access and share it.

## Archived designs

Previous local designs A–G and the review page are saved in `archive/2026-09-28/`. That folder is ignored by Git and is not published. It includes the original README and design notes, plus a `github-published/` snapshot of the former live pages. The archive shares the root `assets/` directory through relative symlinks, so retain those assets. Previously committed versions also remain in Git history.
