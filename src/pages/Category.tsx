import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import FilterSortBar from "../components/category/FilterSortBar";
import ProductGrid from "../components/category/ProductGrid";
import { categoryNameFromSlug, getProductsByCategory } from "@/lib/products";
import {
  applyFilters,
  applySort,
  deriveOptions,
  EMPTY_FILTERS,
  type ProductFilters,
  type SortOption,
} from "@/lib/filters";

const PAGE_SIZE = 24;

const Category = () => {
  const { category } = useParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [page, setPage] = useState(0);

  const categoryName = categoryNameFromSlug(category); // null → all products
  const title = categoryName ?? "Tất cả sản phẩm";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "category", categoryName ?? "all"],
    queryFn: () => getProductsByCategory(categoryName),
    staleTime: 60_000,
  });

  // reset filters/page when switching category
  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setPage(0);
  }, [category]);

  const options = useMemo(() => deriveOptions(products), [products]);

  const visibleProducts = useMemo(
    () => applySort(applyFilters(products, filters), sortBy),
    [products, filters, sortBy],
  );

  // back to first page whenever the result set changes
  useEffect(() => setPage(0), [filters, sortBy]);

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / PAGE_SIZE));
  const pageProducts = useMemo(
    () => visibleProducts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [visibleProducts, page],
  );

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <CategoryHeader category={title} />

        <FilterSortBar
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          itemCount={visibleProducts.length}
          categoryOptions={categoryName ? [] : options.categories}
          brandOptions={options.brands}
          materialOptions={options.materials}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <ProductGrid
          products={pageProducts}
          page={page}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Category;
