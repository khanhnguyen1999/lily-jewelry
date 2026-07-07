/** Cấu hình liên hệ của shop — thay số WhatsApp thật tại đây (định dạng quốc tế, không có dấu +). */
export const WHATSAPP_PHONE = "84901234567";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
