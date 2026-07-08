import { useState, useRef } from "react";
import ImageZoom from "./ImageZoom";
import { imageUrl } from "@/lib/products";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

/** Image that shows a pulsing skeleton until it finishes loading. */
const GalleryImage = ({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <div className="absolute inset-0 bg-muted/40 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 select-none ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
};

const ProductImageGallery = ({ images, alt }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomInitialIndex, setZoomInitialIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!images.length) {
    return (
      <div className="w-full aspect-square bg-muted/20 flex items-center justify-center">
        <span className="text-sm font-light text-muted-foreground">Chưa có hình ảnh</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = (index: number) => {
    setZoomInitialIndex(index);
    setIsZoomOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(difference) > minSwipeDistance) {
      if (difference > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full">
      {/* Desktop: Vertical scrolling gallery (1024px and above) */}
      <div className="hidden lg:block">
        <div className="space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-square overflow-hidden cursor-pointer group bg-muted/20"
              onClick={() => handleImageClick(index)}
            >
              <GalleryImage
                src={imageUrl(image, { width: 900, quality: 75 })}
                alt={`${alt} — ảnh ${index + 1}`}
                eager={index <= 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet/Mobile: Image slider (below 1024px) */}
      <div className="lg:hidden">
        <div className="relative">
          <div
            className="relative w-full aspect-square overflow-hidden cursor-pointer group touch-pan-y bg-muted/20"
            onClick={() => handleImageClick(currentImageIndex)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <GalleryImage
              key={currentImageIndex}
              src={imageUrl(images[currentImageIndex], { width: 900, quality: 75 })}
              alt={`${alt} — ảnh ${currentImageIndex + 1}`}
              eager
            />
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-foreground" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Zoom Modal — larger transform for full-screen viewing */}
      <ImageZoom
        images={images.map((img) => imageUrl(img, { width: 1600, quality: 80 }))}
        initialIndex={zoomInitialIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
};

export default ProductImageGallery;
