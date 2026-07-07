import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number; // 0-based
  pageCount: number;
  onPageChange: (page: number) => void;
}

/** Compact page list: 1 … around-current … last */
function pageItems(page: number, pageCount: number): (number | "…")[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i);
  const pages = new Set<number>([0, pageCount - 1, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 0 && p < pageCount).sort((a, b) => a - b);
  const items: (number | "…")[] = [];
  let prev = -1;
  for (const p of sorted) {
    if (prev !== -1 && p - prev > 1) items.push("…");
    items.push(p);
    prev = p;
  }
  return items;
}

const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <section className="w-full py-8">
      <div className="flex justify-start items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-transparent hover:opacity-50 disabled:opacity-30 -ml-2"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {pageItems(page, pageCount).map((item, i) =>
            item === "…" ? (
              <span key={`e${i}`} className="mx-2 text-sm font-light text-muted-foreground">
                …
              </span>
            ) : (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                className={`min-w-8 h-8 hover:bg-transparent hover:underline text-sm ${
                  item === page ? "underline font-normal" : "font-light"
                }`}
                onClick={() => onPageChange(item)}
              >
                {item + 1}
              </Button>
            ),
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-transparent hover:opacity-50 disabled:opacity-30"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default Pagination;
