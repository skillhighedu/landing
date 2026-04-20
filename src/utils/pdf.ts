import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

import type { ResumeFormValues } from "@/types/resume";

const stripBulletPrefix = (value: string) => value.replace(/^\s*[-•]\s*/, "");

const sanitizeFileNamePart = (value: string) =>
  value
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "");

export function generatePDF(data: ResumeFormValues): void {
  const doc = new jsPDF();

  const MARGIN_X = 18;
  const MARGIN_Y = 18;
  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const CONTENT_W = PAGE_W - MARGIN_X * 2;

  const LH_BODY = 5.6;
  const LH_TIGHT = 5.2;

  doc.setLineHeightFactor(1.15);

  const ensureSpace = (y: number, need: number) => {
    if (y + need > PAGE_H - MARGIN_Y) {
      doc.addPage();
      return MARGIN_Y;
    }

    return y;
  };

  const hr = (y: number) => {
    doc.setDrawColor(0);
    doc.setLineWidth(0.25);
    doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
  };

  const underline = (
    text: string,
    x: number,
    y: number,
    link?: string,
  ) => {
    doc.textWithLink(text, x, y, { url: link ?? text });
    const width = doc.getTextWidth(text);
    doc.setLineWidth(0.25);
    doc.line(x, y + 0.8, x + width, y + 0.8);
  };

  const section = (title: string, y: number) => {
    y = ensureSpace(y, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.text(title.toUpperCase(), MARGIN_X, y);
    return y + 6;
  };

  const labeledRow = (label: string, value: string, y: number) => {
    const labelWidth = 40;
    const xText = MARGIN_X + labelWidth + 2;
    const maxWidth = PAGE_W - xText - MARGIN_X;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(label, MARGIN_X, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(value || "-", maxWidth);
    doc.text(lines, xText, y);

    const usedHeight = Math.max(6, lines.length * LH_BODY);
    return y + usedHeight;
  };

  const bulletBlock = (bullets: string[], y: number) => {
    const maxWidth = PAGE_W - MARGIN_X * 2 - 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    bullets.forEach((raw) => {
      const text = stripBulletPrefix(raw);
      const wrapped = doc.splitTextToSize(text, maxWidth);
      y = ensureSpace(y, wrapped.length * LH_TIGHT + 2);
      doc.text("•", MARGIN_X + 2, y);
      doc.text(wrapped, MARGIN_X + 8, y);
      y += wrapped.length * LH_TIGHT;
    });

    return y + 1.5;
  };

  const drawContactLinks = (items: Array<{ label: string; href?: string }>, y: number) => {
    const visible = items.filter((item) => item.label);
    if (!visible.length) {
      return;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 255);

    const separator = "  •  ";
    const widths = visible.map((item) => doc.getTextWidth(item.label));
    const separatorWidth = doc.getTextWidth(separator);
    const totalWidth =
      widths.reduce((sum, width) => sum + width, 0) +
      separatorWidth * (visible.length - 1);

    let x = MARGIN_X;
    if (totalWidth < CONTENT_W) {
      x += (CONTENT_W - totalWidth) / 2;
    }

    visible.forEach((item, index) => {
      underline(item.label, x, y, item.href);
      x += doc.getTextWidth(item.label);

      if (index !== visible.length - 1) {
        doc.setTextColor(0, 0, 0);
        doc.text(separator, x, y);
        x += separatorWidth;
        doc.setTextColor(0, 0, 255);
      }
    });

    doc.setTextColor(0, 0, 0);
  };

  const parseProject = (line: string) => {
    const match = line.match(/^(.+?)\s*[-–—:]\s+(.*)$/);
    if (match) {
      return {
        title: match[1]?.trim() ?? "",
        desc: match[2]?.trim() ?? "",
      };
    }

    return { title: line.trim(), desc: "" };
  };

  let y = MARGIN_Y;
  const imageSize = data.profileImage ? 32 : 0;
  const imageX = PAGE_W - MARGIN_X - imageSize;
  const textWidth = imageSize ? CONTENT_W - imageSize - 8 : CONTENT_W;

  if (data.profileImage) {
    try {
      doc.addImage(data.profileImage, imageX, y, imageSize, imageSize);
    } catch {
      // If the image format is unsupported, keep generating the resume without it.
    }
  }

  doc.setFont("times", "bold");
  doc.setFontSize(21.5);
  const fullName =
    `${(data.firstname || "").toUpperCase()} ${(data.lastname || "").toUpperCase()}`.trim() ||
    "YOUR NAME";
  const nameLines = doc.splitTextToSize(fullName, textWidth);
  doc.text(nameLines, MARGIN_X, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  y += Math.max(imageSize, nameLines.length * 9);

  const phone = (data.mobnum || "").trim();
  if (phone) {
    y += 2;
    doc.text(phone, MARGIN_X, y);
  }

  y += 7;
  drawContactLinks(
    [
      {
        label: (data.email || "").trim(),
        href: data.email ? `mailto:${data.email.trim()}` : undefined,
      },
      {
        label: (data.linkedin || "").trim(),
        href: (data.linkedin || "").trim() || undefined,
      },
      {
        label: (data.github || "").trim(),
        href: (data.github || "").trim() || undefined,
      },
    ],
    y,
  );

  y += 8;
  hr(y);
  y += 8;

  if ((data.obj || "").trim()) {
    y = section("Objective", y);
    const objectiveLines = doc.splitTextToSize((data.obj || "").trim(), CONTENT_W);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(objectiveLines, MARGIN_X, y + 2);
    y += objectiveLines.length * LH_BODY + 6;
    hr(y);
    y += 8;
  }

  y = section("Skills", y);
  const skillsText =
    (data.skills || "")
      .split(/[,|\n]/)
      .map((value) => value.trim())
      .filter(Boolean)
      .join(", ") || "-";
  y = labeledRow("Technical Skills", skillsText, y + 2);

  y += 4;
  hr(y);
  y += 8;

  const expRaw = (data.experience || "").trim();
  if (expRaw) {
    y = section("Experience", y);
    const blocks = expRaw
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean);

    blocks.forEach((block, index) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (!lines.length) {
        return;
      }

      const heading = lines[0] ?? "";
      const [left, right] = heading.split("|").map((value) => value.trim());

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
      y = bullets.length ? bulletBlock(bullets, y + 4) : y + 4;

      if (index < blocks.length - 1) {
        y += 6;
      }
    });

    y += 2;
    hr(y);
    y += 8;
  }

  y = section("Projects", y);
  const projectLines = (data.projects || "")
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);

  const normalizedProjects = projectLines.length
    ? projectLines
    : [
        "Smart RAG Assistant - Built a Bedrock-powered RAG chatbot that reduced ticket resolution time by 38%.",
        "E-commerce Analytics - Designed ELT pipelines and dashboards that reduced churn by 12%.",
      ];

  const projectWidth = PAGE_W - MARGIN_X * 2 - 8;
  normalizedProjects.forEach((line, index) => {
    const { title, desc } = parseProject(line);

    y = ensureSpace(y, 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("•", MARGIN_X + 2, y);

    doc.setFont("helvetica", "bold");
    doc.text(title || "Project", MARGIN_X + 8, y);

    if (desc) {
      const wrapped = doc.splitTextToSize(desc, projectWidth);
      y = ensureSpace(y, wrapped.length * LH_TIGHT + 6);
      doc.setFont("helvetica", "normal");
      doc.text(wrapped, MARGIN_X + 8, y + 4);
      y += 4 + wrapped.length * LH_TIGHT;
    } else {
      y += LH_TIGHT;
    }

    if (index < normalizedProjects.length - 1) {
      y += 3;
    }
  });

  y += 4;
  hr(y);
  y += 8;

  y = section("Extra-Curricular Activities", y);
  const extraLines = (data.extracurricular || "")
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
  const extras = extraLines.length
    ? extraLines
    : [
        "Organized monthly tech meetups with 150+ attendees and weekly coding circles.",
        "Published 12 blog posts on JavaScript and GenAI with 30k total reads.",
      ];
  y = bulletBlock(extras, y + 2);

  const firstNamePart = sanitizeFileNamePart(data.firstname || "Resume");
  const lastNamePart = sanitizeFileNamePart(data.lastname || "Template");
  const fileName = `${firstNamePart || "Resume"}_${lastNamePart || "Template"}_Resume.pdf`;

  saveAs(doc.output("blob"), fileName);
}
