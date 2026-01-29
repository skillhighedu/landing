import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ComparisonItem } from "../types";
import { Check, X } from "lucide-react";
import Logo from "@/assets/logo.png";

type Props = {
  items: ComparisonItem[];
};

export default function ComparisonTable({ items }: Props) {
  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex items-center justify-center">
          <div className="bg-green-500/20 border-2 border-green-500 rounded p-1.5">
            <Check className="w-4 h-4 text-green-500" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-red-500/20 border-2 border-red-500 rounded p-1.5">
            <X className="w-4 h-4 text-red-500" />
          </div>
        </div>
      );
    }
    return value;
  };

  return (
    <div className="relative w-full overflow-x-auto font-sans">
      <Table className="min-w-[720px] border-separate border-spacing-y-3">
        {/* ================= HEADER ================= */}
        <TableHeader>
          {/* Title row */}
          <TableRow className="border-none">
            <TableHead
              colSpan={3}
              className="
                py-6 px-6
                bg-card text-card-foreground
                border border-border
                rounded-xl
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-card-foreground mb-1">
                    Feature Comparison
                  </h2>
                  <p className="text-xs text-card-foreground/70">
                    See how SkillHigh compares to typical EdTech platforms
                  </p>
                </div>
                <img
                  src={Logo}
                  alt="SkillHigh"
                  className="h-8 w-auto opacity-80"
                />
              </div>
            </TableHead>
          </TableRow>

          {/* Column headers */}
          <TableRow className="border-none h-16">
            <TableHead
              className="
                py-4 px-6 text-center
                text-xs font-bold uppercase tracking-widest
                bg-muted text-foreground/80
                border border-border rounded-xl
              "
            >
              Feature
            </TableHead>

            <TableHead
              className="
                py-4 px-6 text-center
                text-xs font-bold uppercase tracking-widest
                bg-muted text-foreground/70
                border border-border rounded-xl
              "
            >
              Typical EdTech
            </TableHead>

            <TableHead
              className="
                py-4 px-6 text-center
                text-xs font-bold uppercase tracking-widest
                bg-primary/15 text-primary
                border border-primary/40 rounded-xl
              "
            >
              SkillHigh
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ================= BODY ================= */}
        <TableBody>
          {items.map((item, idx) => {
            const zebra = idx % 2 === 0 ? "bg-card" : "bg-muted/40";

            return (
              <TableRow key={item.feature} className="border-none group">
                {/* Feature */}
                <TableCell
                  className={`
                    py-6 px-6 font-semibold
                    border border-border rounded-xl
                    ${zebra}
                    group-hover:bg-muted/70 transition-all duration-300
                  `}
                >
                  <div className="text-sm text-foreground">{item.feature}</div>
                </TableCell>

                {/* Typical EdTech */}
                <TableCell
                  className={`
                    py-6 px-6 text-center
                    border border-border rounded-xl
                    ${zebra}
                    group-hover:bg-muted/70 transition-all duration-300
                  `}
                >
                  <div className="text-sm font-medium text-foreground/70">
                    {renderValue(item.others)}
                  </div>
                </TableCell>

                {/* SkillHigh */}
                <TableCell
                  className={cnSkillCell(item.highlight, zebra)}
                >
                  <div className="text-sm">
                    {renderValue(item.skillhigh)}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function cnSkillCell(highlight: boolean | undefined, zebra: string) {
  if (highlight) {
    return `
      py-6 px-6 text-center font-bold
      border border-primary/50 rounded-xl
      bg-primary/20 text-primary
      group-hover:bg-primary/25 transition-all duration-300
      shadow-sm
    `;
  }

  return `
    py-6 px-6 text-center font-bold
    border border-border rounded-xl
    ${zebra}
    text-foreground/90
    group-hover:bg-muted/70 transition-all duration-300
  `;
}
