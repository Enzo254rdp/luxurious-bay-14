
export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Mock data
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Gold Diamond Watch",
    price: 249999,
    currency: "KSH",
    description: "Exquisite 18k gold watch with diamond embellishments. A statement piece for the discerning collector.",
    images: [
      "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1942&auto=format&fit=crop"
    ],
    category: "watches",
    tags: ["luxury", "gold", "diamond"],
    rating: 4.9,
    reviews: 52,
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: "2",
    name: "Premium Leather Bag",
    price: 68999,
    currency: "KSH",
    description: "Handcrafted from the finest Italian leather. Elegant, spacious, and built to last a lifetime.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2036&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611010344445-5f28fb815dd8?q=80&w=1964&auto=format&fit=crop"
    ],
    category: "bags",
    tags: ["leather", "handcrafted", "designer"],
    rating: 4.7,
    reviews: 36,
    inStock: true,
    isFeatured: true
  },
  {
    id: "3",
    name: "Designer Sunglasses",
    price: 36500,
    currency: "KSH",
    description: "Ultra-lightweight titanium frame with polarized lenses. Protection meets high fashion.",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625591342274-013866180476?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "accessories",
    tags: ["designer", "polarized", "titanium"],
    rating: 4.8,
    reviews: 24,
    inStock: true,
    isFeatured: true,
    discount: 10
  },
  {
    id: "4",
    name: "Silk Evening Dress",
    price: 98900,
    currency: "KSH",
    description: "The epitome of elegance. This flowing silk gown features hand-embroidered details.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1770&auto=format&fit=crop"
    ],
    category: "clothing",
    tags: ["silk", "evening", "gown"],
    rating: 4.9,
    reviews: 19,
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: "5",
    name: "Marble Fountain Pen",
    price: 24500,
    currency: "KSH",
    description: "Each piece uniquely crafted from Italian marble. Writes with exceptional smoothness and precision.",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1925&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528111029373-08f86825e103?q=80&w=1287&auto=format&fit=crop"
    ],
    category: "stationery",
    tags: ["pen", "marble", "luxury"],
    rating: 4.6,
    reviews: 14,
    inStock: true,
    isFeatured: true
  },
  {
    id: "6",
    name: "Crystal Whiskey Set",
    price: 45999,
    currency: "KSH",
    description: "Hand-cut crystal decanter and matching glasses. The ultimate gift for whiskey connoisseurs.",
    images: [
      "https://images.unsplash.com/photo-1557666316-c0fc53ff7ddf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621472124503-a760c1146f60?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "home",
    tags: ["crystal", "whiskey", "barware"],
    rating: 4.8,
    reviews: 28,
    inStock: true,
    isFeatured: false
  }
];

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Watches",
    description: "Luxury timepieces crafted with precision",
    image: "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Bags",
    description: "Handcrafted leather and designer bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2036&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Accessories",
    description: "Statement pieces to complete your look",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1740&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Clothing",
    description: "Premium fabrics and exclusive designs",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"
  }
];
