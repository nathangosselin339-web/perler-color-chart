// Verifies palette-export.js's pure logic (no DOM) reproduces the installed palettes
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "data.js"), "utf8");
const COLORS = new Function(src + "\nreturn COLORS;")();

// ---- replicate palette-export.js (pure parts) ----
const solids = [];
const specialty = [];
for (const c of COLORS) {
  const [code, name, , hex, type] = c;
  if (!hex || hex.includes("|")) continue;
  (type === "solid" ? solids : specialty).push({ code: code || "", name, hex: hex.toUpperCase() });
}
const label = (e) => (e.code ? `${e.code} ${e.name}` : e.name);
const pdn = (entries, title, note) =>
  [`; ${title}`, `; ${note}`, "; AARRGGBB format: one 8-digit hex color per line (FF = fully opaque).", "",
    ...entries.map((e) => `FF${e.hex.slice(1)}`), ""].join("\r\n");

const builders = {
  "Perler Solids.txt": pdn(solids.slice(0, 96), "Perler Solids", "The 96 most common Perler solid colors, in code order."),
  "Perler New Colors.txt": pdn(solids.slice(96), "Perler New Colors", "Post-classic solid releases, including all 23 brand-new 2026 colors."),
  "Perler Specialty.txt": pdn(specialty, "Perler Specialty", "Pearl, neon, glow-in-the-dark, glitter, metallic and clear beads."),
};

const palettesDir = path.join(process.env.USERPROFILE, "OneDrive", "Documents", "Paint.NET User Files", "Palettes");
let ok = true;
for (const [file, expected] of Object.entries(builders)) {
  const actual = fs.readFileSync(path.join(palettesDir, file), "utf8");
  const same = actual === expected;
  ok = ok && same;
  console.log(`${same ? "MATCH   " : "DIFFER  "} ${file}`);
}
console.log(ok ? "\nAll three browser-generated palettes match the installed files." : "\nMISMATCH!");