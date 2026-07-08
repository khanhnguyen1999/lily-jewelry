import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductDescription from "../components/product/ProductDescription";
import ProductCarousel from "../components/content/ProductCarousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  categorySlugFromName,
  getProduct,
  getProductsByBrand,
  getRelatedProducts,
} from "@/lib/products";

const ProductDetail = () => {
  const { productId } = useParams();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["products", "detail", productId],
    queryFn: () => getProduct(productId!),
    enabled: !!productId,
  });

  const { data: related = [] } = useQuery({
    queryKey: ["products", "related", product?.id],
    queryFn: () => getRelatedProducts(product!),
    enabled: !!product,
    staleTime: 60_000,
  });

  const { data: sameBrand = [] } = useQuery({
    queryKey: ["products", "brand", product?.brand, product?.id],
    queryFn: () => getProductsByBrand(product!.brand, product!.id),
    enabled: !!product?.brand,
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 animate-pulse">
            {/* Gallery */}
            <div className="aspect-square bg-muted/40" />

            {/* Info column */}
            <div className="lg:pl-12 mt-8 lg:mt-0 space-y-6">
              <div className="h-3 w-32 bg-muted/40" />
              <div className="flex justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-24 bg-muted/40" />
                  <div className="h-7 w-3/4 bg-muted/40" />
                </div>
                <div className="h-6 w-28 bg-muted/40" />
              </div>

              {/* Detail rows */}
              <div className="space-y-4 py-4 border-b border-border">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-20 bg-muted/40" />
                    <div className="h-4 w-40 bg-muted/40" />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="h-12 w-full bg-muted/40" />

              {/* Accordion rows */}
              <div className="border-t border-border">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-14 border-b border-border flex items-center">
                    <div className="h-4 w-32 bg-muted/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6 py-32 text-center">
          <h1 className="text-2xl font-light text-foreground mb-3">Không tìm thấy sản phẩm</h1>
          <Link to="/category/all" className="text-sm font-light underline">
            Xem tất cả sản phẩm
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const categorySlug = categorySlugFromName(product.category);
  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={`/category/${categorySlug}`}>{product.category ?? "Cửa hàng"}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 max-w-64">{product.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <section className="w-full px-6">
          {/* Breadcrumb - Show above image on smaller screens */}
          <div className="lg:hidden mb-6">{breadcrumb}</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ProductImageGallery images={product.images ?? []} alt={product.name} />

            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo product={product} breadcrumb={breadcrumb} />
              <ProductDescription product={product} />
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="w-full mt-16 lg:mt-24">
            <div className="mb-4 px-6">
              <h2 className="text-sm font-light text-foreground">
                Có thể bạn cũng thích — {product.category}
              </h2>
            </div>
            <ProductCarousel products={related} />
          </section>
        )}

        {sameBrand.length > 0 && (
          <section className="w-full">
            <div className="mb-4 px-6">
              <h2 className="text-sm font-light text-foreground">
                Sản phẩm khác của {product.brand}
              </h2>
            </div>
            <ProductCarousel products={sameBrand} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
