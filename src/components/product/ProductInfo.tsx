import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { currentPriceVnd, formatVnd, type Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

interface ProductInfoProps {
  product: Product;
  breadcrumb: ReactNode;
}

const ProductInfo = ({ product, breadcrumb }: ProductInfoProps) => {
  const hasSale = product.sale_vnd != null && product.price_vnd != null;
  const inStock = product.stock !== "Hết hàng";

  const contactMessage = [
    `Xin chào Lily Jewelry, tôi quan tâm sản phẩm:`,
    `• ${product.name}`,
    `• SKU: ${product.sku}`,
    `• Giá: ${formatVnd(currentPriceVnd(product))}`,
    typeof window !== "undefined" ? window.location.href : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-6">
      {/* Breadcrumb - Show only on desktop */}
      <div className="hidden lg:block">{breadcrumb}</div>

      {/* Product title and price */}
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-6">
          <div>
            <p className="text-sm font-light text-muted-foreground mb-1">
              {product.brand ?? product.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-light text-foreground">{product.name}</h1>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-light text-foreground">
              {formatVnd(currentPriceVnd(product))}
            </p>
            {hasSale && (
              <p className="text-sm font-light text-muted-foreground line-through">
                {formatVnd(product.price_vnd)}
              </p>
            )}
            {product.on_sale && (
              <p className="text-xs font-medium text-foreground mt-1">{product.on_sale}</p>
            )}
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="space-y-4 py-4 border-b border-border">
        {product.material && (
          <div className="space-y-2 flex items-center justify-between">
            <h3 className="text-sm font-light text-foreground">Chất liệu</h3>
            <p className="text-sm font-light text-muted-foreground">{product.material}</p>
          </div>
        )}

        {product.category && (
          <div className="space-y-2 flex items-center justify-between">
            <h3 className="text-sm font-light text-foreground">Danh mục</h3>
            <p className="text-sm font-light text-muted-foreground">{product.category}</p>
          </div>
        )}

        <div className="space-y-2 flex items-center justify-between">
          <h3 className="text-sm font-light text-foreground">Tình trạng</h3>
          <p className="text-sm font-light text-muted-foreground">
            {product.stock ?? "Liên hệ"}
          </p>
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="space-y-2 flex items-center justify-between">
            <h3 className="text-sm font-light text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2 justify-end">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-light text-muted-foreground border border-border px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact via WhatsApp */}
      <div className="space-y-3">
        <Button
          asChild
          className="w-full h-12 bg-[#25D366] text-white hover:bg-[#1fb857] font-light rounded-none"
        >
          <a href={whatsappLink(contactMessage)} target="_blank" rel="noreferrer">
            <WhatsAppIcon className="w-5 h-5 mr-2" />
            {inStock ? "Liên hệ mua hàng qua WhatsApp" : "Hỏi hàng về qua WhatsApp"}
          </a>
        </Button>
        <p className="text-xs font-light text-muted-foreground text-center">
          Nhấn để chat trực tiếp với tư vấn viên — thông tin sản phẩm được đính kèm sẵn.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
