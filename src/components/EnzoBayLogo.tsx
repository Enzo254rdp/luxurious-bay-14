
import { Link } from "react-router-dom";

interface EnzoBayLogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function EnzoBayLogo({
  variant = "default",
  size = "md",
  className = "",
}: EnzoBayLogoProps) {
  // Define colors based on variant
  const colors = {
    default: {
      enzo: "text-enzobay-brown",
      bay: "text-enzobay-orange"
    },
    light: {
      enzo: "text-white",
      bay: "text-enzobay-orange-light"
    },
    dark: {
      enzo: "text-enzobay-brown-dark",
      bay: "text-enzobay-orange-dark"
    }
  };
  
  // Define sizing
  const sizing = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl"
  };
  
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <div className="font-bold tracking-tight relative inline-flex items-baseline leading-none">
        <span className={`${colors[variant].enzo} ${sizing[size]} font-serif italic`}>
          Enzo
        </span>
        <span 
          className={`${colors[variant].bay} ${sizing[size]} font-sans not-italic font-black`}
          style={{ letterSpacing: '-0.02em' }}
        >
          Bay
        </span>
        <span className="absolute -top-1 -right-2 w-2 h-2 bg-enzobay-orange rounded-full opacity-90 animate-pulse"></span>
      </div>
    </Link>
  );
}
