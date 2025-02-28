import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';

// Interface for the Cart state
interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

// Interface for the Wishlist state
interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

// Interface for the Recently Viewed state
interface RecentlyViewedState {
  items: Product[];
  addItem: (product: Product) => void;
  clearItems: () => void;
}

// Interface for the Auth state
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: 'customer' | 'vendor' | 'admin';
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: { firstName: string; lastName: string; email: string; password: string; }) => Promise<boolean>;
}

// Create Cart store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { ...product, quantity }]
        };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === productId 
            ? { ...item, quantity } 
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = item.price;
          const discountedPrice = item.discount 
            ? itemPrice * (1 - item.discount / 100) 
            : itemPrice;
          return total + (discountedPrice * item.quantity);
        }, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'enzobay-cart-storage'
    }
  )
);

// Create Wishlist store
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        if (state.items.some(item => item.id === product.id)) {
          return state;
        }
        return { items: [...state.items, product] };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },
      
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'enzobay-wishlist-storage'
    }
  )
);

// Create Recently Viewed store
export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        // Remove the product if it already exists (to move it to the front)
        const filteredItems = state.items.filter(item => item.id !== product.id);
        
        // Add the product to the beginning of the array
        const newItems = [product, ...filteredItems];
        
        // Keep only the 10 most recent items
        return { items: newItems.slice(0, 10) };
      }),
      
      clearItems: () => set({ items: [] })
    }),
    {
      name: 'enzobay-recently-viewed-storage'
    }
  )
);

// Create Auth store with mock authentication
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      
      login: async (email, password) => {
        // This would be replaced with a real API call
        return new Promise<boolean>(resolve => {
          setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
              set({
                isAuthenticated: true,
                user: {
                  id: '1',
                  firstName: 'Test',
                  lastName: 'User',
                  email: 'test@example.com',
                  role: 'customer'
                }
              });
              resolve(true);
            } else {
              resolve(false);
            }
          }, 1000);
        });
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          user: null
        });
      },
      
      register: async (userData) => {
        // This would be replaced with a real API call
        return new Promise<boolean>(resolve => {
          setTimeout(() => {
            set({
              isAuthenticated: true,
              user: {
                id: Math.random().toString(36).substring(2, 9),
                ...userData,
                role: 'customer'
              }
            });
            resolve(true);
          }, 1000);
        });
      }
    }),
    {
      name: 'enzobay-auth-storage'
    }
  )
);
