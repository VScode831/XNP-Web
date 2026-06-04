const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error("Usage: node scripts/render-markdown-pdf.js <input.md> <output.pdf>");
  process.exit(1);
}

const source = fs.readFileSync(input, "utf8").replace(/\r\n/g, "\n");
fs.mkdirSync(path.dirname(output), { recursive: true });

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 56, bottom: 56, left: 54, right: 54 },
  bufferPages: true,
  info: {
    Title: "Technical Specification for the Application of Self-Fusing Functional Film for Architectural Metal Surface Protection",
    Author: "Xiniupi Waterproof Technology Co., Ltd.",
  },
});

doc.pipe(fs.createWriteStream(output));

const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
const normal = "Helvetica";
const bold = "Helvetica-Bold";

function ensureSpace(height) {
  if (doc.y + height > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

function paragraph(text, opts = {}) {
  const font = opts.bold ? bold : normal;
  const size = opts.size || 10;
  const indent = opts.indent || 0;
  const gap = opts.gap == null ? 6 : opts.gap;
  doc.font(font).fontSize(size);
  const height = doc.heightOfString(text, { width: pageWidth - indent, align: "left" });
  ensureSpace(height + gap);
  doc.text(text, doc.page.margins.left + indent, doc.y, {
    width: pageWidth - indent,
    align: "left",
    lineGap: 2,
  });
  doc.moveDown(gap / 10);
}

function table(lines) {
  const rows = lines
    .filter((line) => line.trim().startsWith("|"))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim())
    )
    .filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)));

  if (!rows.length) return;

  const colCount = rows[0].length;
  const widths = colCount === 3 ? [38, 225, pageWidth - 38 - 225] : Array(colCount).fill(pageWidth / colCount);
  const cellPad = 4;
  doc.font(normal).fontSize(8.5);

  for (const row of rows) {
    const cellHeights = row.map((cell, index) =>
      doc.heightOfString(cell, { width: widths[index] - cellPad * 2, lineGap: 1 })
    );
    const rowHeight = Math.max(...cellHeights) + cellPad * 2;
    ensureSpace(rowHeight + 2);

    let x = doc.page.margins.left;
    const y = doc.y;
    for (let i = 0; i < row.length; i++) {
      doc.rect(x, y, widths[i], rowHeight).stroke("#777777");
      doc.font(row === rows[0] ? bold : normal).fontSize(8.5);
      doc.text(row[i], x + cellPad, y + cellPad, {
        width: widths[i] - cellPad * 2,
        lineGap: 1,
      });
      x += widths[i];
    }
    doc.y = y + rowHeight;
  }
  doc.moveDown(0.8);
}

const lines = source.split("\n");
let i = 0;
while (i < lines.length) {
  const raw = lines[i];
  const line = raw.trim();

  if (!line) {
    i += 1;
    continue;
  }

  if (line.startsWith("|")) {
    const tableLines = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) {
      tableLines.push(lines[i]);
      i += 1;
    }
    table(tableLines);
    continue;
  }

  if (line.startsWith("# ")) {
    ensureSpace(48);
    paragraph(line.replace(/^#\s+/, ""), { bold: true, size: 17, gap: 8 });
  } else if (line.startsWith("## ")) {
    ensureSpace(34);
    paragraph(line.replace(/^##\s+/, ""), { bold: true, size: 14, gap: 7 });
  } else if (line.startsWith("### ")) {
    ensureSpace(28);
    paragraph(line.replace(/^###\s+/, ""), { bold: true, size: 11.5, gap: 5 });
  } else if (/^- /.test(line)) {
    paragraph("- " + line.replace(/^- /, ""), { indent: 14, size: 10, gap: 4 });
  } else if (/^\d+\.\s+/.test(line)) {
    paragraph(line, { indent: 14, size: 10, gap: 4 });
  } else if (/^\*\*.+\*\*$/.test(line)) {
    paragraph(line.replace(/\*\*/g, ""), { bold: true, size: 10, gap: 5 });
  } else {
    paragraph(line.replace(/\*\*/g, ""), { size: 10, gap: 5 });
  }

  i += 1;
}

doc.end();
