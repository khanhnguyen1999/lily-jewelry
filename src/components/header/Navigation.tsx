import { ArrowRight, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  formatVnd,
  getSearchIndex,
  searchProducts,
  type SearchProduct,
} from "@/lib/products";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // slim search index, fetched once when the overlay first opens
  const { data: searchIndex = [], isLoading: isIndexLoading } = useQuery({
    queryKey: ["products", "search-index"],
    queryFn: getSearchIndex,
    enabled: isSearchOpen,
    staleTime: 5 * 60_000,
  });

  const searchResult = useMemo(
    () => searchProducts(searchIndex, searchQuery),
    [searchIndex, searchQuery],
  );

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Preload dropdown images for faster display
  useEffect(() => {
    const imagesToPreload = [
      "/rings-collection.png",
      "/earrings-collection.png", 
      "/arcus-bracelet.png",
      "/span-bracelet.png",
      "/founders.png"
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const popularSearches = [
    "Dây chuyền Cartier",
    "Vintage Alhambra",
    "Lắc tay Cartier Love",
    "Nhẫn kim cương",
    "Rose Gold",
    "Khuyên tai Tiffany"
  ];
  
  const navItems = [
    {
      name: "Cửa hàng",
      href: "/category/all",
      submenuItems: [
        { label: "Tất cả sản phẩm", href: "/category/all" },
        { label: "Dây chuyền", href: "/category/day-chuyen" },
        { label: "Khuyên tai", href: "/category/khuyen-tai" },
        { label: "Lắc tay", href: "/category/lac-tay" },
        { label: "Nhẫn", href: "/category/nhan" },
      ],
      images: [
        { src: "/rings-collection.png", alt: "Nhẫn", label: "Nhẫn", href: "/category/nhan" },
        { src: "/earrings-collection.png", alt: "Khuyên tai", label: "Khuyên tai", href: "/category/khuyen-tai" },
      ],
    },
    {
      name: "Hàng mới",
      href: "/category/all",
      submenuItems: [
        { label: "Hàng mới về", href: "/category/all" },
        { label: "Dây chuyền mới", href: "/category/day-chuyen" },
        { label: "Lắc tay mới", href: "/category/lac-tay" },
      ],
      images: [
        { src: "/arcus-bracelet.png", alt: "Lắc tay", label: "Lắc tay", href: "/category/lac-tay" },
        { src: "/span-bracelet.png", alt: "Dây chuyền", label: "Dây chuyền", href: "/category/day-chuyen" },
      ],
    },
    {
      name: "Giới thiệu",
      href: "/about/our-story",
      submenuItems: [
        { label: "Câu chuyện thương hiệu", href: "/about/our-story" },
        { label: "Phát triển bền vững", href: "/about/sustainability" },
        { label: "Hướng dẫn chọn size", href: "/about/size-guide" },
        { label: "Chăm sóc khách hàng", href: "/about/customer-care" },
        { label: "Hệ thống cửa hàng", href: "/about/store-locator" },
      ],
      images: [
        { src: "/founders.png", alt: "Về chúng tôi", label: "Đọc câu chuyện thương hiệu", href: "/about/our-story" },
      ],
    },
  ];

  return (
    <nav 
      className="relative" 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile hamburger button */}
        <button
          className="lg:hidden p-2 mt-0.5 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 relative">
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1.5'
            }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 top-2.5 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-3.5'
            }`}></span>
          </div>
        </button>

        {/* Left navigation - Hidden on tablets and mobile */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light py-6 block"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="block">
            <img 
              src="/lily-jewelry.svg" 
              alt="LILY JEWELRY" 
              className="h-6 w-auto"
            />
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Full width dropdown */}
      {activeDropdown && (
        <div 
          className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8">
            <div className="flex justify-between w-full">
              {/* Left side - Menu items */}
              <div className="flex-1">
                <ul className="space-y-2">
                   {navItems
                     .find(item => item.name === activeDropdown)
                     ?.submenuItems.map((subItem, index) => (
                      <li key={index}>
                        <Link
                          to={subItem.href}
                          className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-light block py-2"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                   ))}
                </ul>
              </div>

              {/* Right side - Images */}
              <div className="flex space-x-6">
                {navItems
                  .find(item => item.name === activeDropdown)
                  ?.images.map((image, index) => {
                    return (
                      <Link key={index} to={image.href} className="w-[400px] h-[280px] cursor-pointer group relative overflow-hidden block">
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                        />
                        <div className="absolute bottom-2 left-2 text-white text-xs font-light flex items-center gap-1">
                          <span>{image.label}</span>
                          <ArrowRight size={12} />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div 
          className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50"
        >
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Search input */}
              <div className="relative mb-8">
                <div className="flex items-center border-b border-border pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-nav-foreground mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Tìm kiếm trang sức..."
                    className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 text-nav-foreground/60 hover:text-nav-foreground"
                      aria-label="Xóa từ khóa"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {searchQuery.trim() ? (
                /* Search results */
                <div>
                  {isIndexLoading ? (
                    <p className="text-nav-foreground/60 text-sm font-light">Đang tải…</p>
                  ) : searchResult.items.length === 0 ? (
                    <p className="text-nav-foreground/60 text-sm font-light">
                      Không tìm thấy sản phẩm nào cho "{searchQuery}".
                    </p>
                  ) : (
                    <div>
                      <h3 className="text-nav-foreground text-sm font-light mb-4">
                        {searchResult.total} sản phẩm
                        {searchResult.total > searchResult.items.length
                          ? ` — hiển thị ${searchResult.items.length} kết quả đầu`
                          : ""}
                      </h3>
                      <ul className="divide-y divide-border">
                        {searchResult.items.map((p: SearchProduct) => (
                          <li key={p.id}>
                            <Link
                              to={`/product/${p.id}`}
                              onClick={closeSearch}
                              className="flex items-center gap-4 py-3 group"
                            >
                              <div className="w-14 h-14 bg-muted/10 overflow-hidden shrink-0">
                                {p.images?.[0] && (
                                  <img
                                    src={p.images[0]}
                                    alt={p.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-light text-nav-foreground/60">
                                  {p.brand ?? p.category}
                                </p>
                                <p className="text-sm font-medium text-nav-foreground truncate group-hover:text-nav-hover transition-colors">
                                  {p.name}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-sm font-light text-nav-foreground whitespace-nowrap">
                                  {formatVnd(p.sale_vnd ?? p.price_vnd)}
                                </p>
                                {p.on_sale && (
                                  <p className="text-xs font-light text-nav-foreground/60">{p.on_sale}</p>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Popular searches */
                <div>
                  <h3 className="text-nav-foreground text-sm font-light mb-4">Tìm kiếm phổ biến</h3>
                  <div className="flex flex-wrap gap-3">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="text-nav-foreground hover:text-nav-hover text-sm font-light py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-nav-hover"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-lg font-light block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                   <div className="mt-3 pl-4 space-y-2">
                     {item.submenuItems.map((subItem, subIndex) => (
                       <Link
                         key={subIndex}
                         to={subItem.href}
                         className="text-nav-foreground/70 hover:text-nav-hover text-sm font-light block py-1"
                         onClick={() => setIsMobileMenuOpen(false)}
                       >
                         {subItem.label}
                       </Link>
                     ))}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
    </nav>
  );
};

export default Navigation;