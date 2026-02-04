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
  const renderValue = (value: string | boolean, highlight = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check
          className={`mx-auto h-5 w-5 ${
            highlight ? "text-primary" : "text-green-500"
          }`}
        />
      ) : (
        <X className="mx-auto h-5 w-5 text-neutral-400" />
      );
    }
    return (
      <span className={`text-sm ${highlight ? "font-semibold" : ""}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[720px] border-separate border-spacing-y-3">
        {/* HEADER */}
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3} className="rounded-2xl bg-white dark:bg-neutral-900 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Feature Comparison</h2>
                  <p className="text-xs text-neutral-500">
                    SkillHigh vs typical EdTech platforms
                  </p>
                </div>
                <img src={Logo} alt="SkillHigh" className="h-8 opacity-80" />
              </div>
            </TableHead>
          </TableRow>

          <TableRow className="text-xs uppercase tracking-wider text-neutral-500">
            <TableHead className="px-6">Feature</TableHead>
            <TableHead className="text-center">Typical EdTech</TableHead>
            <TableHead className="text-center text-primary font-semibold">
              SkillHigh
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.feature}
              className="
                bg-white dark:bg-neutral-900
                rounded-2xl
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* Feature */}
              <TableCell className="px-6 py-5 font-medium rounded-l-2xl">
                {item.feature}
              </TableCell>

              {/* Typical */}
              <TableCell className="text-center text-neutral-500">
                {renderValue(item.others)}
              </TableCell>

              {/* SkillHigh */}
              <TableCell
                className="
                  text-center
                  rounded-r-2xl
                  bg-primary/10
                  text-primary
                  font-semibold
                  ring-1 ring-primary/30
                "
              >
                {renderValue(item.skillhigh, true)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
