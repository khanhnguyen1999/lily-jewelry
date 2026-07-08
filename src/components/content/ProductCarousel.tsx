import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  currentPriceVnd,
  formatVnd,
  getNewestProducts,
  imageUrl,
  type Product,
} from "@/lib/products";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

interface ProductCarouselProps {
  /** Products to display; when omitted the newest products are fetched. */
  products?: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const { data: fallback, isLoading } = useQuery({
    queryKey: ["products", "newest"],
    queryFn: () => getNewestProducts(8),
    enabled: !products,
    staleTime: 60_000,
  });

  // Only the self-fetching variant can be in a loading state.
  if (!products && isLoading) {
    return (
      <section className="w-full mb-16 px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  const items = products ?? fallback ?? [];
  if (!items.length) return null;

  return (
    <section className="w-full mb-16 px-6">
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent className="">
          {items.map((product) => {
            const mainImage = imageUrl(product.images?.[0], { width: 500 });
            const hoverImage = imageUrl(product.images?.[1] ?? product.images?.[0], { width: 500 });
            return (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
              >
                <Link to={`/product/${product.id}`}>
                  <Card className="border-none shadow-none bg-transparent group">
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
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;
