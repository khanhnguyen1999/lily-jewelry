/** Skeleton placeholder matching the product card layout (grid + carousel). */
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-square mb-3 bg-muted/40" />
    <div className="space-y-2">
      <div className="h-3 w-1/3 bg-muted/40" />
      <div className="flex justify-between items-center gap-3">
        <div className="h-4 w-2/3 bg-muted/40" />
        <div className="h-4 w-14 bg-muted/40 shrink-0" />
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;
