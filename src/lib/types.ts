
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
  },
  // Adding more affordable, everyday products
  {
    id: "7",
    name: "Wireless Bluetooth Earbuds",
    price: 3499,
    currency: "KSH",
    description: "High-quality sound with noise cancellation. Ergonomic design with long battery life.",
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608156639585-b3a032e88587?q=80&w=2067&auto=format&fit=crop"
    ],
    category: "electronics",
    tags: ["wireless", "bluetooth", "audio"],
    rating: 4.5,
    reviews: 312,
    inStock: true,
    isFeatured: true,
    discount: 15
  },
  {
    id: "8",
    name: "Cotton T-Shirt",
    price: 999,
    currency: "KSH",
    description: "Premium soft cotton t-shirt with comfortable fit. Available in multiple colors.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1854&auto=format&fit=crop"
    ],
    category: "clothing",
    tags: ["cotton", "casual", "t-shirt"],
    rating: 4.3,
    reviews: 185,
    inStock: true,
    isFeatured: false,
    discount: 5
  },
  {
    id: "9",
    name: "Running Shoes",
    price: 4999,
    currency: "KSH",
    description: "Lightweight shoes with superior cushioning for maximum comfort during your run.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop"
    ],
    category: "footwear",
    tags: ["sports", "running", "shoes"],
    rating: 4.7,
    reviews: 253,
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: "10",
    name: "Smart LED TV - 43 inch",
    price: 29999,
    currency: "KSH",
    description: "Full HD display with smart features. Connect to your favorite streaming services.",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "electronics",
    tags: ["tv", "smart", "led"],
    rating: 4.6,
    reviews: 128,
    inStock: true,
    isFeatured: true,
    discount: 8
  },
  {
    id: "11",
    name: "Kitchen Blender",
    price: 4299,
    currency: "KSH",
    description: "Powerful motor with multiple speed settings. Perfect for smoothies and food preparation.",
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578677972412-ffb5a35a4537?q=80&w=2069&auto=format&fit=crop"
    ],
    category: "kitchen",
    tags: ["appliance", "blender", "home"],
    rating: 4.2,
    reviews: 96,
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: "12",
    name: "Smartphone Case",
    price: 899,
    currency: "KSH",
    description: "Durable protection with slim design. Compatible with latest phone models.",
    images: [
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584435405303-fa1e9172a7b8?q=80&w=1824&auto=format&fit=crop"
    ],
    category: "mobile-accessories",
    tags: ["case", "protection", "smartphone"],
    rating: 4.4,
    reviews: 210,
    inStock: true,
    isFeatured: false,
    discount: 20
  },
  {
    id: "13",
    name: "Office Desk Chair",
    price: 11999,
    currency: "KSH",
    description: "Ergonomic design with adjustable height and lumbar support for all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1505843490701-5be5d76b3f09?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589364222378-4dc75a6dc0a7?q=80&w=1954&auto=format&fit=crop"
    ],
    category: "furniture",
    tags: ["office", "chair", "ergonomic"],
    rating: 4.5,
    reviews: 75,
    inStock: true,
    isFeatured: true
  },
  {
    id: "14",
    name: "Fitness Tracker",
    price: 3499,
    currency: "KSH",
    description: "Track your steps, heart rate, and sleep patterns. Waterproof with long battery life.",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614043599674-dafd63410d34?q=80&w=1770&auto=format&fit=crop"
    ],
    category: "electronics",
    tags: ["fitness", "tracker", "wearable"],
    rating: 4.3,
    reviews: 123,
    inStock: true,
    isFeatured: false,
    discount: 12
  },
  {
    id: "15",
    name: "Baby Stroller",
    price: 12599,
    currency: "KSH",
    description: "Lightweight and foldable design. Multiple position settings with ample storage space.",
    images: [
      "https://images.unsplash.com/photo-1586982643126-83f544ed6ed3?q=80&w=1889&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590895178913-ce1e241ec8ac?q=80&w=1965&auto=format&fit=crop"
    ],
    category: "baby",
    tags: ["stroller", "baby", "travel"],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: "16",
    name: "Laptop Backpack",
    price: 2999,
    currency: "KSH",
    description: "Waterproof with padded laptop compartment. Multiple pockets for organization.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1587&auto=format&fit=crop"
    ],
    category: "bags",
    tags: ["backpack", "laptop", "travel"],
    rating: 4.5,
    reviews: 142,
    inStock: true,
    isFeatured: true,
    discount: 10
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
  },
  {
    id: "5",
    name: "Electronics",
    description: "Latest gadgets and smart devices",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Footwear",
    description: "Comfortable and stylish shoes for all occasions",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Home & Kitchen",
    description: "Essentials for your living space",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "Furniture",
    description: "Quality furniture for home and office",
    image: "https://images.unsplash.com/photo-1505843490701-5be5d76b3f09?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "9",
    name: "Beauty & Personal Care",
    description: "Skincare, makeup and personal grooming",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: "10",
    name: "Baby Products",
    description: "Everything you need for your little ones",
    image: "https://images.unsplash.com/photo-1586982643126-83f544ed6ed3?q=80&w=1889&auto=format&fit=crop"
  },
  {
    id: "11",
    name: "Mobile Accessories",
    description: "Enhance your smartphone experience",
    image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "12",
    name: "Sports & Fitness",
    description: "Equipment and gear for active lifestyles",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop"
  }
];
