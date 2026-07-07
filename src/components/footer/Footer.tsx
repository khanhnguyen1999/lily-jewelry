const Footer = () => {
  return (
    <footer className="w-full bg-white text-black pt-8 pb-2 px-6 border-t border-[#e5e5e5] mt-48">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Brand - Left side */}
          <div>
            <img 
              src="/lily-jewelry.svg" 
              alt="Lily Jewelry" 
              className="mb-4 h-6 w-auto"
            />
            <p className="text-sm font-light text-black/70 leading-relaxed max-w-md mb-6">
              Trang sức tối giản dành cho người hiện đại
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2 text-sm font-light text-black/70">
              <div>
                <p className="font-normal text-black mb-1">Ghé thăm</p>
                <p>Hồ Chí Minh, Việt Nam</p>
              </div>
              <div>
                <p className="font-normal text-black mb-1 mt-3">Liên hệ</p>
                <p>hello@lilyjewelry.com</p>
              </div>
            </div>
          </div>

          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h4 className="text-sm font-normal mb-4">Cửa hàng</h4>
              <ul className="space-y-2">
                <li><a href="/category/all" className="text-sm font-light text-black/70 hover:text-black transition-colors">Hàng mới về</a></li>
                <li><a href="/category/nhan" className="text-sm font-light text-black/70 hover:text-black transition-colors">Nhẫn</a></li>
                <li><a href="/category/khuyen-tai" className="text-sm font-light text-black/70 hover:text-black transition-colors">Khuyên tai</a></li>
                <li><a href="/category/lac-tay" className="text-sm font-light text-black/70 hover:text-black transition-colors">Lắc tay</a></li>
                <li><a href="/category/day-chuyen" className="text-sm font-light text-black/70 hover:text-black transition-colors">Dây chuyền</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-normal mb-4">Hỗ trợ</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Hướng dẫn chọn size</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Hướng dẫn bảo quản</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Đổi trả</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Vận chuyển</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Liên hệ</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-normal mb-4">Kết nối</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Pinterest</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Bản tin</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - edge to edge separator */}
      <div className="border-t border-[#e5e5e5] -mx-6 px-6 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-black mb-1 md:mb-0">
            © 2026 Lily Jewelry. Bảo lưu mọi quyền.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="/terms-of-service" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;