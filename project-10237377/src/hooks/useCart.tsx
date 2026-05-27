import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/mocks/products';

export interface CartItem {
  id: number;
  name: string;
  slug: string;
  img: string;
  size: string;
  price: number;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: number, size: string) => void;
  updateQty: (id: number, size: string, qty: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('noir-cart') || '[]');
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('noir-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((newItem: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.size === newItem.size,
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.size === newItem.size
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const updateQty = useCallback((id: number, size: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) =>
        prev.filter((i) => !(i.id === id && i.size === size)),
      );
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id && i.size === size ? { ...i, qty } : i,
        ),
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalCount,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function addProductToCart(
  product: Product,
  sizeLabel: string,
  price: number,
  addItem: (item: Omit<CartItem, 'qty'>) => void,
) {
  addItem({
    id: product.id,
    name: product.name,
    slug: product.slug,
    img: product.img,
    size: sizeLabel,
    price,
  });
}