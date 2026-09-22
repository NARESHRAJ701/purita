import React, { createContext, useContext, useState } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    // Seed initial sample luxury items to make the drawer lively immediately
    {
      product: {
        id: 'sandal',
        name: 'Sandal',
        variant: 'Pure Mysore Sandalwood',
        subtitle: 'Calming. Refreshing. Timeless.',
        tagline: 'With pure sandalwood oil | Rejuvenates Skin',
        description: 'Warm, grounding. Softens skin and locks moisture through the day.',
        longDescription: '',
        price: 185,
        weight: '125g',
        rating: 4.9,
        reviewCount: 342,
        theme: {
          bg: '#F5EBE1',
          border: 'rgba(168, 121, 69, 0.22)',
          badge: '',
          text: '#764F25',
          accent: '#A87945',
        },
        image: '/images/product_sandal.png',
        keyBotanicals: [],
        specifications: { tfm: '76%', grade: 'Grade 1', shelfLife: '36 Mo', origin: 'Karnataka' },
      },
      quantity: 1,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const freeShippingThreshold = 500;

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
        freeShippingThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
