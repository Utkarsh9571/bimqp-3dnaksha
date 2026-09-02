import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '8233520124',
  message = 'Hello 3D Naksha, I would like to inquire about your architectural visualization and BIM services.',
  className = ''
}) => {
  // Strip all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  // Append 91 India country code if 10 digits provided
  const formattedPhone = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;
  
  const encodedMessage = encodeURIComponent(message);
  // Universal WhatsApp API URL works seamlessly on both Mobile WhatsApp App & Desktop Web
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;

  return (
    <div className={`fixed bottom-6 right-6 z-40 flex items-center group ${className}`}>
      {/* Left Tooltip Label on Hover */}
      <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 mr-3 px-3 py-1.5 rounded-md bg-gray-900/90 text-white font-mono-tech text-xs font-semibold whitespace-nowrap shadow-lg backdrop-blur-xs border border-white/10 hidden sm:flex items-center gap-1.5">
        <span>Chat on WhatsApp</span>
        <span className="text-emerald-400 font-bold">(+91 82335 20124)</span>
      </div>

      {/* Circular WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with 3D Naksha"
        className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5c] text-white shadow-xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 shrink-0"
      >
        {/* Subtle Ambient Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* Crisp Official WhatsApp Vector Logo */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 2.159.684 4.159 1.849 5.804L2.5 21.5l3.856-1.282A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.745 0-3.376-.506-4.757-1.383l-.341-.218-2.287.76.772-2.235-.238-.352A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
