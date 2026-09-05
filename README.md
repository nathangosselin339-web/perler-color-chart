# Perler Color Chart & Pattern Maker

Free browser tools for Perler fuse beads. No installs, no accounts, no ads, no tracking — everything runs locally in your browser.

**Color Chart:** https://nathangosselin339-web.github.io/perler-color-chart/

**Pattern Maker:** https://nathangosselin339-web.github.io/perler-color-chart/pattern-maker.html

**Bead Studio:** https://nathangosselin339-web.github.io/perler-color-chart/perler-bead-studio.html

**Color Finder:** https://nathangosselin339-web.github.io/perler-color-chart/perler-color-finder.html

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
- **Sprite mode (default)** — great for pixel art and game sprites (Pokémon, etc.): loads each sprite pixel as exactly one bead (true 1:1, no downscaling), keeps crisp edges, maps each pixel to its closest bead, and keeps transparent backgrounds clear. The live dimension readout shows the board size and a `(1:1)` marker when every sprite pixel is one bead.
- **Photo mode** — smooth, averaged matching for ordinary photos and gradients
- Board width slider plus one-click presets for standard 29-peg boards (1–4 wide), sprite-size presets (16/24/29/32/48/64/96/128 square) for resampling, and a **1 : 1 exact** button to snap back to true 1:1
- Zoom slider for comfortable viewing
- Every pixel is matched to the closest real bead color in perceptual (Lab) color space
- Filter which bead types the matcher may use
- Color checklist showing exactly which colors you need and how many beads of each
- Check off colors you already own — saved in your browser and remembered next visit
- Auto-generated **shopping list** of just the colors you still need, with a copy button
- Export the finished pattern as a PNG

## Bead Studio

An all-in-one studio that combines a full color inventory with the image-to-pattern tool. Ideal if you want to design a pattern **from the beads you actually own**.

- **Master color inventory** — browse and check off every Perler color you own, saved in your browser and remembered next visit
- Search, family filter, and "I have these" / "I need these" views over the 170-color US palette
- Turn any image into a bead pattern (drag-and-drop or click; nothing is uploaded — it stays on your device)
- **Use only my owned colors** — matches every bead to the nearest color you already own, so the whole pattern (including approximate color shifts) is buildable from your stash with nothing extra to buy
- Sprite mode for pixel art (true 1:1, transparency kept clear) and photo mode for smooth averaged matching
- Clear status banner shows exactly which owned colors each pattern was built from
- If you haven't checked off any owned colors, it gracefully falls back to the full palette so you can still see your pattern
- Color checklist, auto-generated shopping list of colors you still need, and PNG export

## Color Finder

Take a photo of a bead and instantly find which Perler color it is.

- **Take a photo** with your phone/PC camera (rear camera by default), or choose/upload an image file
- **Tap any point on the photo** to sample that bead's color — it averages a small area around your tap
- Finds the **single closest Perler color** in perceptual (Lab) color space, scanning the real 170-color US palette
- Shows name, Perler code, bag SKU and a closeness score (ΔE + %), with a side-by-side sampled-vs-matched swatch
- **Top-10 nearest colors** ranked list for comparison
- **Copy match details** button exports the sample and match to the clipboard

## Notes

- Hex values for the classic color range are aligned with the community-maintained [beadcolors](https://github.com/maxcleme/beadcolors) dataset (Perlervault measurements); newer and specialty-only colors (2026 releases, glitters, clears, mixes) were sampled from Perler's own product imagery
- Striped/multi-color mixes are excluded since they have no single representative color
- Your ownership checkmarks are stored only in your browser's local storage (per device/browser) — there is no server and nothing is collected
- The site is plain static HTML/CSS/JS hosted free via GitHub Pages
