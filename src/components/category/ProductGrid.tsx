import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { currentPriceVnd, formatVnd, type Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const ProductGrid = ({ products, page, pageCount, onPageChange, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <section className="w-full px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-square mb-3 bg-muted/30 animate-pulse" />
              <div className="h-4 w-2/3 bg-muted/30 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="w-full px-6 mb-16">
        <p className="py-16 text-center text-sm font-light text-muted-foreground">
          Chưa có sản phẩm trong danh mục này.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full px-6 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const mainImage = product.images?.[0];
          const hoverImage = product.images?.[1] ?? mainImage;
          return (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="border-none shadow-none bg-transparent group cursor-pointer">
                <CardContent className="p-0">
                  <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                    {mainImage && (
                      <img
                        src={mainImage}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-0"
                      />
                    )}
                    {hoverImage && (
                      <img
                        src={hoverImage}
                        alt={`${product.name} - ảnh 2`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/[0.03]"></div>
                    {product.on_sale && (
                      <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-black bg-white/80">
                        {product.on_sale}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-light text-foreground">
                      {product.brand ?? product.category}
                    </p>
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-sm font-medium text-foreground line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm font-light text-foreground whitespace-nowrap">
                        {formatVnd(currentPriceVnd(product))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Pagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
    </section>
  );
};

export default ProductGrid;
