import { supabase } from "./supabase";

export interface Product {
  id: string;
  url: string;
  name: string;
  sku: string;
  description: string | null;
  stock: string | null;
  price_usd: number | null;
  sale_usd: number | null;
  price_vnd: number | null;
  sale_vnd: number | null;
  category: string | null;
  images: string[] | null;
  tags: string[] | null;
  additional_info: Record<string, string> | null;
  brand: string | null;
  material: string | null;
  on_sale: string | null;
  created_at: string;
  updated_at: string;
}

/** URL slug ⇄ category name in the database */
export const CATEGORIES = [
  { slug: "day-chuyen", name: "Dây chuyền" },
  { slug: "khuyen-tai", name: "Khuyên tai" },
  { slug: "lac-tay", name: "Lắc tay" },
  { slug: "nhan", name: "Nhẫn" },
] as const;

export function categoryNameFromSlug(slug: string | undefined): string | null {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? null;
}

export function categorySlugFromName(name: string | null | undefined): string {
  return CATEGORIES.find((c) => c.name === name)?.slug ?? "all";
}

export function formatVnd(v: number | null | undefined): string {
  if (v == null) return "";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(v);
}

/** Current selling price in VND (sale price when discounted). */
export function currentPriceVnd(p: Product): number | null {
  return p.sale_vnd ?? p.price_vnd;
}

export async function getProduct(id: string): Promise<Product> {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data as Product;
}

export async function getProductsByCategory(
  categoryName: string | null,
): Promise<Product[]> {
  let q = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (categoryName) q = q.eq("category", categoryName);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}

export async function getRelatedProducts(product: Product, limit = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category ?? "")
    .neq("id", product.id)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}

export async function getProductsByBrand(
  brand: string | null,
  excludeId: string,
  limit = 8,
): Promise<Product[]> {
  if (!brand) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("brand", brand)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}

/** Lightweight product row used by the instant-search overlay. */
export interface SearchProduct {
  id: string;
  name: string;
  sku: string;
  brand: string | null;
  category: string | null;
  images: string[] | null;
  price_vnd: number | null;
  sale_vnd: number | null;
  on_sale: string | null;
  tags: string[] | null;
}

/** Fetch a slim search index once; filtering happens client-side (diacritic-insensitive). */
export async function getSearchIndex(): Promise<SearchProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,sku,brand,category,images,price_vnd,sale_vnd,on_sale,tags")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as SearchProduct[];
}

/** Lowercase + strip Vietnamese diacritics so "day chuyen" matches "Dây chuyền". */
export function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

/** Every whitespace-separated term must match name/sku/brand/category/tags. */
export function searchProducts(
  index: SearchProduct[],
  query: string,
  limit = 8,
): { items: SearchProduct[]; total: number } {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return { items: [], total: 0 };
  const matches = index.filter((p) => {
    const haystack = normalizeText(
      [p.name, p.sku, p.brand ?? "", p.category ?? "", ...(p.tags ?? [])].join(" "),
    );
    return terms.every((t) => haystack.includes(t));
  });
  return { items: matches.slice(0, limit), total: matches.length };
}

export async function getNewestProducts(limit = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as Product[];
}
