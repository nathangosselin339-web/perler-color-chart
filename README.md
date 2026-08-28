# Perler Color Chart & Pattern Maker

Free browser tools for Perler fuse beads. No installs, no accounts, no ads, no tracking — everything runs locally in your browser.

**Color Chart:** https://nathangosselin339-web.github.io/perler-color-chart/

**Pattern Maker:** https://nathangosselin339-web.github.io/perler-color-chart/pattern-maker.html

## Color Chart

A reference of every numbered Perler fuse bead color sold in the US — 170 colors including the 2026 releases.

- Search by name, code or SKU
- Filter chips by type: solid, pearl, neon, glow, glitter, metallic, clear
- Click any card to copy its hex value
- Each card shows the official color name, Perler code, bag SKU (1,000-bead bag number) and sampled hex
- New colors are badged automatically

## Pattern Maker

Turn any image into a fuse-bead pattern using the real Perler palette.

- Click, drag-and-drop or paste an image (nothing is uploaded — it never leaves your device)
- **Sprite mode (default)** — great for pixel art and game sprites (Pokémon, etc.): loads at native resolution, keeps crisp edges, maps each pixel to its closest bead, and keeps transparent backgrounds clear
- **Photo mode** — smooth, averaged matching for ordinary photos and gradients
- Board width slider plus one-click presets for standard 29-peg boards (1–4 wide), and sprite-size presets (16/24/29/32/48/64/96/128 square)
- Zoom slider for comfortable viewing
- Every pixel is matched to the closest real bead color in perceptual (Lab) color space
- Filter which bead types the matcher may use
- Color checklist showing exactly which colors you need and how many beads of each
- Check off colors you already own — saved in your browser and remembered next visit
- Auto-generated **shopping list** of just the colors you still need, with a copy button
- Export the finished pattern as a PNG

## Notes

- Hex values for the classic color range are aligned with the community-maintained [beadcolors](https://github.com/maxcleme/beadcolors) dataset (Perlervault measurements); newer and specialty-only colors (2026 releases, glitters, clears, mixes) were sampled from Perler's own product imagery
- Striped/multi-color mixes are excluded since they have no single representative color
- Your ownership checkmarks are stored only in your browser's local storage (per device/browser) — there is no server and nothing is collected
- The site is plain static HTML/CSS/JS hosted free via GitHub Pages
