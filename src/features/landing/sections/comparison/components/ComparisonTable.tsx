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
          <div className="rounded border border-green-500 bg-green-500/10 p-1.5">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="rounded border border-red-500 bg-red-500/10 p-1.5">
            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
        </div>
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="relative w-full overflow-x-auto font-sans">
      <Table className="min-w-[720px] border-separate border-spacing-y-3">
        {/* ================= HEADER ================= */}
        <TableHeader>
          <TableRow className="border-none">
            <TableHead
              colSpan={3}
              className="
                py-6 px-6 pixel-border-header

                /* Light */
                bg-white text-neutral-900 border border-neutral-200

                /* Dark */
                dark:bg-neutral-900 dark:text-white dark:border-neutral-800
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold mb-1">
                    Feature Comparison
                  </h2>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
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

          <TableRow className="border-none h-16">
            <TableHead
              className="
                pixel-border py-4 px-6 text-xs font-bold uppercase tracking-widest text-center

                bg-neutral-100 text-neutral-700
                dark:bg-neutral-800 dark:text-neutral-300
              "
            >
              Feature
            </TableHead>

            <TableHead
              className="
                pixel-border py-4 px-6 text-xs font-bold uppercase tracking-widest text-center

                bg-neutral-100 text-neutral-600
                dark:bg-neutral-800 dark:text-neutral-400
              "
            >
              Typical EdTech
            </TableHead>

            <TableHead
              className="
                pixel-border py-4 px-6 text-xs font-bold uppercase tracking-widest text-center

                bg-primary/15 text-primary
                border-2 border-primary/40
              "
            >
              SkillHigh
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ================= BODY ================= */}
        <TableBody>
          {items.map((item, idx) => {
            const baseBg =
              idx % 2 === 0
                ? "bg-neutral-50 dark:bg-neutral-900/30"
                : "bg-neutral-100 dark:bg-neutral-900/10";

            return (
              <TableRow key={item.feature} className="border-none group">
                {/* Feature */}
                <TableCell
                  className={`
                    pixel-border py-6 px-6 font-semibold transition-all
                    ${baseBg}
                    group-hover:bg-neutral-200/60 dark:group-hover:bg-neutral-800/40
                  `}
                >
                  <div className="text-sm">{item.feature}</div>
                </TableCell>

                {/* Typical EdTech */}
                <TableCell
                  className={`
                    pixel-border py-6 px-6 text-center transition-all
                    ${baseBg}
                    text-neutral-600 dark:text-neutral-400
                    group-hover:bg-neutral-200/60 dark:group-hover:bg-neutral-800/40
                  `}
                >
                  {renderValue(item.others)}
                </TableCell>

                {/* SkillHigh */}
                <TableCell
                  className={`
                    pixel-border py-6 px-6 text-center font-bold transition-all

                    ${
                      item.highlight
                        ? `
                          bg-primary/20 text-primary
                          border-2 border-primary/50
                          group-hover:bg-primary/30
                          group-hover:shadow-[0_0_18px_rgba(var(--primary-rgb),0.25)]
                        `
                        : `
                          ${baseBg}
                          text-neutral-900 dark:text-neutral-100
                          group-hover:bg-neutral-200/60 dark:group-hover:bg-neutral-800/40
                        `
                    }
                  `}
                >
                  {renderValue(item.skillhigh)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
