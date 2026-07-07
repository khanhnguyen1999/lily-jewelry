import { currentPriceVnd, type Product } from "./products";

export interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRanges: string[];
  materials: string[];
}

export const EMPTY_FILTERS: ProductFilters = {
  categories: [],
  brands: [],
  priceRanges: [],
  materials: [],
};

export type SortOption = "featured" | "price-low" | "price-high" | "newest" | "name";

export const PRICE_RANGES: { label: string; test: (vnd: number) => boolean }[] = [
  { label: "Dưới 30 triệu", test: (v) => v < 30_000_000 },
  { label: "30 - 60 triệu", test: (v) => v >= 30_000_000 && v < 60_000_000 },
  { label: "60 - 100 triệu", test: (v) => v >= 60_000_000 && v < 100_000_000 },
  { label: "Trên 100 triệu", test: (v) => v >= 100_000_000 },
];

/** Distinct, sorted option lists derived from the loaded products. */
export function deriveOptions(products: Product[]) {
  const uniq = (values: (string | null)[]) =>
    [...new Set(values.filter((v): v is string => !!v))].sort((a, b) =>
      a.localeCompare(b, "vi"),
    );
  return {
    categories: uniq(products.map((p) => p.category)),
    brands: uniq(products.map((p) => p.brand)),
    materials: uniq(products.map((p) => p.material)),
  };
}

export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((p) => {
    if (filters.categories.length && !filters.categories.includes(p.category ?? "")) return false;
    if (filters.brands.length && !filters.brands.includes(p.brand ?? "")) return false;
    if (filters.materials.length && !filters.materials.includes(p.material ?? "")) return false;
    if (filters.priceRanges.length) {
      const price = currentPriceVnd(p);
      if (price == null) return false;
      const ranges = PRICE_RANGES.filter((r) => filters.priceRanges.includes(r.label));
      if (!ranges.some((r) => r.test(price))) return false;
    }
    return true;
  });
}

export function applySort(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => (currentPriceVnd(a) ?? Infinity) - (currentPriceVnd(b) ?? Infinity));
      break;
    case "price-high":
      sorted.sort((a, b) => (currentPriceVnd(b) ?? -Infinity) - (currentPriceVnd(a) ?? -Infinity));
      break;
    case "newest":
      sorted.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      break;
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      break;
    case "featured":
    default:
      // keep fetch order (newest first) but surface on-sale items
      sorted.sort((a, b) => Number(!!b.on_sale) - Number(!!a.on_sale));
      break;
  }
  return sorted;
}
