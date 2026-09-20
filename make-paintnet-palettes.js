// Generates palette files from the Perler color data in data.js
//
// Paint.NET (.txt)  - saved to <Documents>\Paint.NET User Files\Palettes\
//   Paint.NET only shows 96 colors per palette, so the full set is split:
//   1. Perler Solids.txt       - the 96 most common solid colors (classic range)
//   2. Perler New Colors.txt   - remaining solids incl. all brand-new 2026 colors
//   3. Perler Specialty.txt    - pearl / neon / glow / glitter / metallic / clear
//
// GIMP (.gpl)       - saved next to this script (perler-color-chart/)
//   GIMP has no 96-color limit, so a single all-color palette also works.
//   4. perler-solid.gpl        - all 125 solid colors        (matches the existing file)
//   5. perler-specialty.gpl    - all 26 specialty colors
//   6. perler-all.gpl          - all 151 single-color beads
//
// Usage:  node make-paintnet-palettes.js [--out <directory>]

const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
const rows = new Function(src + "\nreturn COLORS;")();

const solids = [];
const specialty = [];

for (const r of rows) {
  const [code, name, sku, hex, type] = r;
  if (!hex || hex.includes("|")) continue; // striped/mixed beads have no single color
  const entry = {
    code: code || "",
    name,
    hex: hex.toUpperCase(),
    type,
  };
  if (type === "solid") solids.push(entry);
  else specialty.push(entry);
}

const hex8 = (hex) => "FF" + hex.slice(1); // #RRGGBB -> AARRGGBB (opaque)

// Paint.NET palette files are pure hex: one 8-digit AARRGGBB color per line.
// There is no name support — the parser splits lines on whitespace and parses
// each token as hex, and anything else (commas, names) makes the line fail,
// so the palette would load blank.
const toPdn = (entries, title, note) =>
  [
    `; ${title}`,
    `; ${note}`,
    "; AARRGGBB format: one 8-digit hex color per line (FF = fully opaque).",
    "",
    ...entries.map((e) => hex8(e.hex)),
    "",
  ].join("\r\n");

const toGpl = (entries, name, note) => {
  const rgb = (hex) => {
    const h = hex.slice(1);
    return `${parseInt(h.slice(0, 2), 16)}\t${parseInt(h.slice(2, 4), 16)}\t${parseInt(h.slice(4, 6), 16)}`;
  };
  return [
    "GIMP Palette",
    `Name: ${name}`,
    "Columns: 2",
    ...(note ? [`# ${note}`] : []),
    ...entries.map((e) => `${rgb(e.hex)}\t${e.name}`),
    "",
  ].join("\n");
};

// ---- paint.NET palettes (installed into the Palettes folder) ----
const pdnOutDir = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : path.join(process.env.USERPROFILE, "OneDrive", "Documents", "Paint.NET User Files", "Palettes");

fs.mkdirSync(pdnOutDir, { recursive: true });
const pdnPalettes = [
  {
    file: "Perler Solids.txt",
    content: toPdn(solids.slice(0, 96), "Perler Solids", "The 96 most common Perler solid colors, in code order."),
  },
  {
    file: "Perler New Colors.txt",
    content: toPdn(solids.slice(96), "Perler New Colors", "Post-classic solid releases, including all 23 brand-new 2026 colors."),
  },
  {
    file: "Perler Specialty.txt",
    content: toPdn(specialty, "Perler Specialty", "Pearl, neon, glow-in-the-dark, glitter, metallic and clear beads."),
  },
];
for (const p of pdnPalettes) {
  const out = path.join(pdnOutDir, p.file);
  fs.writeFileSync(out, p.content, "utf8");
  console.log(`wrote ${out}  (${(p.content.match(/^FF[0-9A-F]{6},/gm) || []).length} colors)`);
}

// ---- GIMP palettes (written next to this script) ----
const gplOutDir = __dirname;
const gplPalettes = [
  { file: "perler-solid.gpl", content: toGpl(solids, "Perler Solid", null) },
  { file: "perler-specialty.gpl", content: toGpl(specialty, "Perler Specialty", "Pearl, neon, glow-in-the-dark, glitter, metallic and clear beads.") },
  { file: "perler-all.gpl", content: toGpl([...solids, ...specialty], "Perler All", "All single-color Perler beads, including the 2026 releases.") },
];
for (const p of gplPalettes) {
  const out = path.join(gplOutDir, p.file);
  fs.writeFileSync(out, p.content, "utf8");
  console.log(`wrote ${out}  (${p.content.split("\n").filter((l) => /^\d+\t\d+\t\d+\t/.test(l)).length} colors)`);
}

console.log(`\ntotal: ${solids.length} solids, ${specialty.length} specialty, ${rows.length} rows in data.js`);