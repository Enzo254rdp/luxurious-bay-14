
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  itemCount?: number;
  onClick?: () => void;
}

export function CartButton({ itemCount = 0, onClick }: CartButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="relative p-2 rounded-full transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart
        className={`h-6 w-6 transition-colors duration-300 ${
          isHovered ? "text-enzobay-orange" : "text-enzobay-brown"
        }`}
      />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-enzobay-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
