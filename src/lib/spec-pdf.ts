import type { Product } from "@/lib/data";

function ascii(value: string) {
  return value
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/\u2014/g, "-")
    .replace(/–/g, "-")
    .replace(/₂/g, "2")
    .replace(/[^\x20-\x7E]/g, "");
}

function pdfEscape(value: string) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildStream(lines: string[]) {
  const body = ["BT", "/F1 15 Tf", "48 760 Td", `(${pdfEscape(lines[0] ?? "")}) Tj`, "/F1 10 Tf"];
  lines.slice(1, 40).forEach((line) => {
    body.push("0 -16 Td", `(${pdfEscape(line)}) Tj`);
  });
  body.push("ET");
  return body.join("\n");
}

function assemble(stream: string) {
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.forEach((offset) => {
    pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

function save(filename: string, lines: string[]) {
  const blob = new Blob([assemble(buildStream(lines))], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadDatasheet(product: Product, kind: "tds" | "msds") {
  const shared = [
    kind === "tds" ? "Indicative technical data sheet" : "Indicative safety summary",
    "Alternate Chemical Industry Ltd. (ACIL)",
    "Habiganj factory - Satian Road, Ratanpur, Madhobpur",
    "This file is a discussion draft. The lot TDS, COA, and SDS control.",
    "",
    `${product.code}  ${product.name}`,
    `Design yield: ${product.yieldKg.toLocaleString("en-US")} kg/day`,
    product.line,
    "",
  ];

  const lines =
    kind === "tds"
      ? [
          ...shared,
          "Indicative purity targets",
          ...product.purity.map((row) => `${row.label}: ${row.value}`),
          "",
          "Functional properties",
          ...product.properties.map((row) => `${row.label}: ${row.value}`),
          "",
          "Applications",
          ...product.applications.map((row) => `- ${row}`),
        ]
      : [
          ...shared,
          "Handling summary",
          "Store cool and dry. Keep packages closed.",
          "Starch and gluten dust can ignite when airborne.",
          "Control dust and keep ignition sources out of the packing area.",
          "Steep liquor is acidic. Avoid eye and prolonged skin contact.",
          "A formal SDS is issued with each commercial lot.",
          "",
          "Design yield and form",
          ...product.purity.map((row) => `${row.label}: ${row.value}`),
        ];

  save(`ACIL-${product.code}-${kind.toUpperCase()}-indicative.pdf`, lines);
}
