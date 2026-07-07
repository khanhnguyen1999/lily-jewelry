import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewProduct from "./ReviewProduct";
import type { Product } from "@/lib/products";

const CustomStar = ({ filled, className }: { filled: boolean; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-3 h-3 ${filled ? "text-foreground" : "text-muted-foreground/30"} ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
      clipRule="evenodd"
    />
  </svg>
);

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const detailRows: [string, string][] = [
    ["SKU", product.sku],
    ...(product.brand ? ([["Thương hiệu", product.brand]] as [string, string][]) : []),
    ...(product.material ? ([["Chất liệu", product.material]] as [string, string][]) : []),
    ...Object.entries(product.additional_info ?? {}).filter(
      ([k]) => !["Brands", "Chất liệu"].includes(k),
    ),
  ];

  // paragraphs split on blank-ish separators for nicer typography
  const paragraphs = (product.description ?? "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-0 mt-8 border-t border-border">
      {/* Description */}
      {paragraphs.length > 0 && (
        <div className="border-b border-border">
          <Button
            variant="ghost"
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
          >
            <span>Mô tả</span>
            {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {isDescriptionOpen && (
            <div className="pb-6 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm font-light text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Details */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Thông tin chi tiết</span>
          {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDetailsOpen && (
          <div className="pb-6 space-y-3">
            {detailRows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6">
                <span className="text-sm font-light text-muted-foreground">{label}</span>
                <span className="text-sm font-light text-foreground text-right">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Care Instructions */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsCareOpen(!isCareOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Bảo quản & Vệ sinh</span>
          {isCareOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isCareOpen && (
          <div className="pb-6 space-y-4">
            <ul className="space-y-2">
              <li className="text-sm font-light text-muted-foreground">• Lau bằng khăn mềm, khô sau mỗi lần đeo</li>
              <li className="text-sm font-light text-muted-foreground">• Tránh tiếp xúc nước hoa, mỹ phẩm và hóa chất tẩy rửa</li>
              <li className="text-sm font-light text-muted-foreground">• Cất trong hộp/túi đựng trang sức khi không sử dụng</li>
              <li className="text-sm font-light text-muted-foreground">• Tháo ra trước khi bơi, tập thể thao hoặc tắm</li>
            </ul>
            <p className="text-sm font-light text-muted-foreground">
              Để vệ sinh chuyên sâu, vui lòng liên hệ đội ngũ chăm sóc khách hàng của chúng tôi.
            </p>
          </div>
        )}
      </div>

      {/* Customer Reviews */}
      <div className="border-b border-border lg:mb-16">
        <Button
          variant="ghost"
          onClick={() => setIsReviewsOpen(!isReviewsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <div className="flex items-center gap-3">
            <span>Đánh giá</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <CustomStar key={star} filled={star <= 4.8} />
              ))}
              <span className="text-sm font-light text-muted-foreground ml-1">4.8</span>
            </div>
          </div>
          {isReviewsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isReviewsOpen && (
          <div className="pb-6 space-y-6">
            <ReviewProduct />
            <p className="text-sm font-light text-muted-foreground">
              Chưa có đánh giá cho sản phẩm này. Hãy là người đầu tiên đánh giá!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
