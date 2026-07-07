import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PRICE_RANGES, type ProductFilters, type SortOption } from "@/lib/filters";

interface FilterSortBarProps {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  itemCount: number;
  /** Dynamic options derived from the loaded products */
  categoryOptions: string[];
  brandOptions: string[];
  materialOptions: string[];
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const FilterSortBar = ({
  filtersOpen,
  setFiltersOpen,
  itemCount,
  categoryOptions,
  brandOptions,
  materialOptions,
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
}: FilterSortBarProps) => {
  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.priceRanges.length +
    filters.materials.length;

  const clearAll = () =>
    onFiltersChange({ categories: [], brands: [], priceRanges: [], materials: [] });

  const checkboxGroup = (
    title: string,
    options: string[],
    selected: string[],
    onToggle: (value: string) => void,
  ) =>
    options.length > 0 && (
      <>
        <div>
          <h3 className="text-sm font-light mb-4 text-foreground">{title}</h3>
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <Checkbox
                  id={`${title}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={() => onToggle(option)}
                  className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                />
                <Label
                  htmlFor={`${title}-${option}`}
                  className="text-sm font-light text-foreground cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator className="border-border" />
      </>
    );

  return (
    <>
      <section className="w-full px-6 mb-8 border-b border-border pb-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-light text-muted-foreground">{itemCount} sản phẩm</p>

          <div className="flex items-center gap-4">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="font-light hover:bg-transparent">
                  Bộ lọc{activeCount > 0 ? ` (${activeCount})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-background border-none shadow-none overflow-y-auto"
              >
                <SheetHeader className="mb-6 border-b border-border pb-4">
                  <SheetTitle className="text-lg font-light">Bộ lọc</SheetTitle>
                </SheetHeader>

                <div className="space-y-8 pb-8">
                  {checkboxGroup("Danh mục", categoryOptions, filters.categories, (v) =>
                    onFiltersChange({ ...filters, categories: toggle(filters.categories, v) }),
                  )}
                  {checkboxGroup("Thương hiệu", brandOptions, filters.brands, (v) =>
                    onFiltersChange({ ...filters, brands: toggle(filters.brands, v) }),
                  )}
                  {checkboxGroup(
                    "Khoảng giá",
                    PRICE_RANGES.map((r) => r.label),
                    filters.priceRanges,
                    (v) =>
                      onFiltersChange({ ...filters, priceRanges: toggle(filters.priceRanges, v) }),
                  )}
                  {checkboxGroup("Chất liệu", materialOptions, filters.materials, (v) =>
                    onFiltersChange({ ...filters, materials: toggle(filters.materials, v) }),
                  )}

                  <div className="flex flex-col gap-2 pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full border-none hover:bg-transparent hover:underline font-normal text-left justify-start"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Xem {itemCount} sản phẩm
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full border-none hover:bg-transparent hover:underline font-light text-left justify-start"
                      onClick={clearAll}
                      disabled={activeCount === 0}
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
              <SelectTrigger className="w-auto border-none bg-transparent text-sm font-light shadow-none rounded-none pr-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="shadow-none border-none rounded-none bg-background">
                <SelectItem value="featured" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pl-2 [&>span:first-child]:hidden">Nổi bật</SelectItem>
                <SelectItem value="price-low" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pl-2 [&>span:first-child]:hidden">Giá: thấp đến cao</SelectItem>
                <SelectItem value="price-high" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pl-2 [&>span:first-child]:hidden">Giá: cao đến thấp</SelectItem>
                <SelectItem value="newest" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pl-2 [&>span:first-child]:hidden">Mới nhất</SelectItem>
                <SelectItem value="name" className="hover:bg-transparent hover:underline data-[state=checked]:bg-transparent data-[state=checked]:underline pl-2 [&>span:first-child]:hidden">Tên A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterSortBar;
