import type { ResumeFormValues } from "@/types/resume";
import { jsPDF } from "jspdf";


export function generatePDF(data: ResumeFormValues): void {
  const doc = new jsPDF();

  // page + margins
  const MARGIN_X = 18;
  const MARGIN_Y = 18;
  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();

  const LH_BODY = 5.6;
  const LH_TIGHT = 5.2;

  doc.setLineHeightFactor(1.15);

  const ensureSpace = (y: number, need: number): number => {
    if (y + need > PAGE_H - MARGIN_Y) {
      doc.addPage();
      return MARGIN_Y;
    }
    return y;
  };

  const hr = (y: number): void => {
    doc.setDrawColor(0);
    doc.setLineWidth(0.25);
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
  };

  const underline = (text: string, x: number, y: number): void => {
    doc.text(text, x, y);
    const w = doc.getTextWidth(text);
    doc.setLineWidth(0.25);
    doc.line(x, y + 0.8, x + w, y + 0.8);
  };

  const section = (title: string, y: number): number => {
    y = ensureSpace(y, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.text(title.toUpperCase(), MARGIN_X, y);
    return y + 6;
  };

  const labeledRow = (label: string, value: string, y: number): number => {
    const LABEL_W = 40;
    const xText = MARGIN_X + LABEL_W + 2;
    const maxW = PAGE_W - xText - MARGIN_X;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(label, MARGIN_X, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(value || "—", maxW);
    doc.text(lines, xText, y);
    const used = Math.max(6, lines.length * LH_BODY);
    return y + used;
  };

  const bulletBlock = (bullets: string[], y: number): number => {
    const maxW = PAGE_W - MARGIN_X * 2 - 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    bullets.forEach((raw) => {
      const text = raw.replace(/^\s*[-•]\s*/, "");
      const wrapped = doc.splitTextToSize(text, maxW);
      y = ensureSpace(y, wrapped.length * LH_TIGHT + 2);
      doc.text("•", MARGIN_X + 2, y);
      doc.text(wrapped, MARGIN_X + 8, y);
      y += wrapped.length * LH_TIGHT;
    });
    return y + 1.5;
  };

  const drawContactLinks = (items: string[], y: number): void => {
    const visible = items.filter(Boolean);
    if (!visible.length) return;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 255);

    const sep = "  .  ";
    const widths = visible.map((t) => doc.getTextWidth(t));
    const sepW = doc.getTextWidth(sep);
    const totalW =
      widths.reduce((a, b) => a + b, 0) + sepW * (visible.length - 1);

    let x = (PAGE_W - totalW) / 2;
    visible.forEach((t, i) => {
      underline(t, x, y);
      x += doc.getTextWidth(t);
      if (i !== visible.length - 1) {
        doc.setTextColor(0, 0, 0);
        doc.text(sep, x, y);
        x += sepW;
        doc.setTextColor(0, 0, 255);
      }
    });
    doc.setTextColor(0, 0, 0);
  };

  // small helper to parse "Title - desc"
  const parseProject = (line: string) => {
    const m = line.match(/^(.+?)\s*[-–—:]\s+(.*)$/);
    if (m) return { title: m[1]?.trim() ?? "", desc: m[2]?.trim() ?? "" };
    return { title: line.trim(), desc: "" };
  };

  // ---------- HEADER ----------
  let y = MARGIN_Y;

  doc.setFont("times", "bold");
  doc.setFontSize(21.5);
  const fullName =
    `${(data.firstname || "").toUpperCase()} ${(data.lastname || "").toUpperCase()}`.trim() ||
    "YOUR NAME";
  doc.text(fullName, PAGE_W / 2, y, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y += 8;
  const phone = data.mobnum || "Phone";
  doc.text(phone, PAGE_W / 2, y, { align: "center" });

  y += 7;
  drawContactLinks(
    [
      (data.email || "").trim(),
      (data.linkedin || "").trim(),
      (data.github || "").trim(),
    ],
    y,
  );

  y += 8;
  hr(y);
  y += 8;

  // ---------- SKILLS ----------
  y = section("SKILLS", y);
  const skillsText =
    (data.skills || "")
      .split(/[,|\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .join(", ") || "—";
  y = labeledRow("Technical Skills", skillsText, y + 2);

  y += 4;
  hr(y);
  y += 8;

  // ---------- EXPERIENCE (optional) ----------
  const expRaw = (data.experience || "").trim();
  if (expRaw) {
    y = section("EXPERIENCE", y);
    const blocks = expRaw
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .filter(Boolean);
    const HEADING_GAP = 4;
    const BLOCK_GAP = 6;

    blocks.forEach((block, idx) => {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (!lines.length) return;

      const heading = lines[0] ?? "";
      const [left, right] = heading.split("|").map((s) => s.trim());

      y = ensureSpace(y, 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(left ?? "", MARGIN_X, y);
      if (right) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text(right, PAGE_W - MARGIN_X, y, { align: "right" });
      }

      const bullets = lines.slice(1);
      y = bullets.length
        ? bulletBlock(bullets, y + HEADING_GAP)
        : y + HEADING_GAP;

      if (idx < blocks.length - 1) y += BLOCK_GAP;
    });

    y += 2;
    hr(y);
    y += 8;
  }

  // ---------- PROJECTS ----------
  y = section("PROJECTS", y);

  const projectLines = (data.projects || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  // If empty, show two tasteful samples
  const normalized = projectLines.length
    ? projectLines
    : [
        "Smart RAG Assistant - Built a Bedrock-powered RAG chatbot that reduced ticket resolution time by 38%.",
        "E-commerce Analytics - Designed ELT + dashboards; reduced churn by 12%.",
      ];

  const MAX_W = PAGE_W - MARGIN_X * 2 - 8;
  const ITEM_GAP = 3; // small vertical gap between items

  normalized.forEach((line, idx) => {
    const { title, desc } = parseProject(line);

    // bullet + bold title on first line
    y = ensureSpace(y, 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("•", MARGIN_X + 2, y);

    doc.setFont("helvetica", "bold");
    doc.text(title || "Project", MARGIN_X + 8, y);

    // description wrapped on the next line(s)
    if (desc) {
      const wrapped = doc.splitTextToSize(desc, MAX_W);
      y = ensureSpace(y, wrapped.length * LH_TIGHT + 6);
      doc.setFont("helvetica", "normal");
      doc.text(wrapped, MARGIN_X + 8, y + 4); // slight offset below title line
      y += 4 + wrapped.length * LH_TIGHT;
    } else {
      y += LH_TIGHT;
    }

    if (idx < normalized.length - 1) y += ITEM_GAP;
  });

  y += 4;
  hr(y);
  y += 8;

  // ---------- EXTRA-CURRICULAR ----------
  y = section("EXTRA-CURRICULAR ACTIVITIES", y);
  const extraLines = (data.extracurricular || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const extras = extraLines.length
    ? extraLines
    : [
        "Organized monthly tech meetups (150+ attendees) and weekly coding circles.",
        "Published 12 blog posts on JS and GenAI; 30k total reads.",
      ];
  y = bulletBlock(extras, y + 2);

  const baseName =
    (data.firstname || "Resume") + "_" + (data.lastname || "Template");
  doc.save(`${baseName}_ImageStyle.pdf`);
}