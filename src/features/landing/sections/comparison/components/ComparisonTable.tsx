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
import Logo from "@/assets/logo.png"

type Props = {
  items: ComparisonItem[];
};

export default function ComparisonTable({ items }: Props) {
  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex items-center justify-center">
          <div className="bg-green-500/20 border-2 border-green-500 rounded p-1.5">
            <Check className="w-4 h-4 text-green-400" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-red-500/20 border-2 border-red-500 rounded p-1.5">
            <X className="w-4 h-4 text-red-400" />
          </div>
        </div>
      );
    }
    return value;
  };

  return (
    <div className="relative w-full overflow-x-auto font-sans">
   
      <Table className="min-w-[720px] border-separate border-spacing-y-3">

        <TableHeader className="hover:bg-neutral-900">
          <TableRow className="border-none">
            <TableHead
              colSpan={3}
              className="pixel-border-header py-6 px-6 rounded-none"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">
                    Feature Comparison
                  </h2>
                  <p className="text-xs text-neutral-400">
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
            <TableHead className="pixel-border py-4 px-6 bg-gradient-to-br from-neutral-800 to-neutral-900 text-xs font-bold uppercase tracking-widest text-neutral-300 text-center">
              Feature
            </TableHead>

            <TableHead className="pixel-border py-4 px-6 bg-gradient-to-br from-neutral-800 to-neutral-900 text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">
              Typical EdTech
            </TableHead>

            <TableHead className="pixel-border py-4 px-6 bg-gradient-to-br from-primary/30 to-primary/10 text-xs font-bold uppercase tracking-widest text-primary text-center border-2 border-primary/50">
              SkillHigh
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ================= BODY ================= */}
        <TableBody>
          {items.map((item, idx) => (
            <TableRow
              key={item.feature}
              className="border-none group"
            >
              {/* Feature */}
              <TableCell className={`pixel-border py-6 px-6 font-semibold text-white group-hover:bg-neutral-800/50 transition-all duration-300 ${idx % 2 === 0 ? 'bg-neutral-950/40' : 'bg-neutral-900/20'}`}>
                <div className="text-sm">{item.feature}</div>
              </TableCell>

              {/* Typical EdTech */}
              <TableCell className={`pixel-border py-6 px-6 text-neutral-400 text-center group-hover:bg-neutral-800/50 transition-all duration-300 ${idx % 2 === 0 ? 'bg-neutral-950/40' : 'bg-neutral-900/20'}`}>
                <div className="text-sm font-medium">
                  {renderValue(item.others)}
                </div>
              </TableCell>

              {/* SkillHigh */}
              <TableCell
                className={`pixel-border py-6 px-6 text-center font-bold transition-all duration-300 ${
                  item.highlight
                    ? 'bg-primary/20 text-primary border-2 border-primary/60 group-hover:bg-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]'
                    : `${idx % 2 === 0 ? 'bg-neutral-950/40' : 'bg-neutral-900/20'} text-neutral-100 group-hover:bg-neutral-800/50`
                }`}
              >
                <div className="text-sm">
                  {renderValue(item.skillhigh)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
