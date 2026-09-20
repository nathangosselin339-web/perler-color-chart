// Download the Perler palette for Paint.NET (.txt) or GIMP (.gpl).
// Uses the page's global COLORS array (shared by index.html and perler-color-chart.html).
// Paint.NET shows at most 96 colors per palette, so the full set ships as three files.
(function () {
  // ---- build the single-color lists once -----------------------------------
  const solids = [];
  const specialty = [];
  for (const c of COLORS) {
    const [code, name, , hex, type] = c;
    if (!hex || hex.includes("|")) continue; // striped/mixed beads have no single color
    (type === "solid" ? solids : specialty).push({ code: code || "", name, hex: hex.toUpperCase() });
  }

  // Paint.NET palette .txt — pure AARRGGBB hex, one color per line.
  // Paint.NET's parser has no name support: it whitespace-splits each line and
  // parses every token as hex, so names/commas would blank the palette.
  const pdn = (entries, title, note) =>
    [
      `; ${title}`,
      `; ${note}`,
      "; AARRGGBB format: one 8-digit hex color per line (FF = fully opaque).",
      "",
      ...entries.map((e) => `FF${e.hex.slice(1)}`),
      "",
    ].join("\r\n");

  // GIMP palette .gpl — GIMP has no 96-color limit, so all colors fit in one file
  const gimp = () => {
    const all = [...solids, ...specialty];
    const rgb = (hex) => {
      const h = hex.slice(1);
      return `${parseInt(h.slice(0, 2), 16)}\t${parseInt(h.slice(2, 4), 16)}\t${parseInt(h.slice(4, 6), 16)}`;
    };
    return [
      "GIMP Palette",
      "Name: Perler All",
      "Columns: 2",
      "# All single-color Perler beads, including the 2026 releases.",
      ...all.map((e) => `${rgb(e.hex)}\t${e.name}`),
      "",
    ].join("\r\n");
  };

  const builders = {
    solids: () => pdn(solids.slice(0, 96), "Perler Solids", "The 96 most common Perler solid colors, in code order."),
    new: () => pdn(solids.slice(96), "Perler New Colors", "Post-classic solid releases, including all 23 brand-new 2026 colors."),
    specialty: () => pdn(specialty, "Perler Specialty", "Pearl, neon, glow-in-the-dark, glitter, metallic and clear beads."),
    gimp: gimp,
  };
  const files = {
    solids: "Perler Solids.txt",
    new: "Perler New Colors.txt",
    specialty: "Perler Specialty.txt",
    gimp: "perler-all.gpl",
  };

  const toastEl = document.getElementById("toast");

  document.querySelectorAll("[data-dl]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.dl;
      const build = builders[key];
      if (!build) return;
      const blob = new Blob([build()], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = files[key];
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      if (toastEl) {
        toastEl.textContent = "Downloaded " + files[key];
        toastEl.classList.add("show");
        setTimeout(() => toastEl.classList.remove("show"), 1200);
      }
    });
  });
})();