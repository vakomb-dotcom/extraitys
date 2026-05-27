import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';
import { allProducts } from '@/mocks/products';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, totalPrice, clearCart } = useCart();

  const getProduct = (id: number) => allProducts.find((p) => p.id === id);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className="fixed top-0 right-0 h-full z-[70] w-full sm:w-[420px] transition-transform duration-500 ease-out flex flex-col"
        style={{
          background: '#FAF8F5',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.15)' }}>
              <i className="ri-shopping-bag-line text-lg" style={{ color: '#C9A84C' }} />
            </div>
            <div>
              <h2 className="serif text-[#1A1A1A] text-lg italic tracking-wide font-semibold leading-none">Your Bag</h2>
              {items.length > 0 && (
                <p className="text-[#1A1A1A]/35 text-xs mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-black/5 cursor-pointer"
            aria-label="Close cart"
          >
            <i className="ri-close-line text-[#1A1A1A]/40 text-xl hover:text-[#1A1A1A]/70" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(201,168,76,0.1)' }}>
                <i className="ri-shopping-bag-3-line text-3xl" style={{ color: '#C9A84C' }} />
              </div>
              <p className="serif text-[#1A1A1A]/40 text-xl italic mb-2">Your bag is empty</p>
              <p className="text-[#1A1A1A]/25 text-sm mb-7">Discover our artisan fragrances</p>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="px-8 py-3.5 rounded-full text-sm tracking-[0.12em] text-white transition-all duration-400 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer font-semibold"
                style={{ background: '#9B2226', textDecoration: 'none' }}
              >
                EXPLORE SHOP
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => {
                const product = getProduct(item.id);
                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="rounded-xl p-3.5 group"
                    style={{ background: 'white', border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div className="flex gap-3.5">
                      {/* Product image */}
                      <div className="w-14 h-18 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: '#FCF9F5' }}>
                        <img src={item.img} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="serif text-[#1A1A1A] text-sm italic font-medium truncate">{item.name}</p>
                            <p className="text-[#1A1A1A]/30 text-xs mt-0.5">{item.size}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer flex-shrink-0 opacity-0 group-hover:opacity-100"
                            aria-label="Remove item"
                            style={{ transition: 'opacity 0.2s, background 0.2s' }}
                          >
                            <i className="ri-close-line text-[#1A1A1A]/30 text-sm" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          <div
                            className="flex items-center rounded-full overflow-hidden"
                            style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                          >
                            <button
                              onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors cursor-pointer"
                            >
                              <i className="ri-subtract-line text-xs" />
                            </button>
                            <span className="text-[#1A1A1A]/70 text-xs px-2 tabular-nums" style={{ minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors cursor-pointer"
                            >
                              <i className="ri-add-line text-xs" />
                            </button>
                          </div>
                          <p className="text-[#1A1A1A] text-sm font-bold">€{item.price * item.qty}</p>
                        </div>

                        {/* Inspired by */}
                        {product && (
                          <div
                            className="mt-2.5 pt-2.5 flex items-center gap-2.5 rounded-lg px-2 py-1.5"
                            style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)' }}
                          >
                            <div className="w-9 h-12 rounded overflow-hidden flex-shrink-0" style={{ background: '#FCF9F5', border: '1px solid rgba(0,0,0,0.04)' }}>
                              <img src={product.inspiredBy.img} alt={product.inspiredBy.name} className="w-full h-full object-cover object-top" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[#1A1A1A]/55 text-[11px] leading-tight font-medium truncate">{product.inspiredBy.name}</p>
                              <p className="text-[#1A1A1A]/30 text-[9px] truncate">{product.inspiredBy.designer}</p>
                            </div>
                            <p className="text-[#9B2226] text-xs font-semibold whitespace-nowrap">€{product.inspiredBy.price}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between mb-5">
              <span className="text-[#1A1A1A]/40 text-sm">Subtotal</span>
              <span className="text-[#1A1A1A] text-xl font-bold">€{totalPrice}</span>
            </div>
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 rounded-full text-sm tracking-[0.1em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer text-center block mb-3 font-semibold"
              style={{ background: '#9B2226', textDecoration: 'none' }}
            >
              CHECKOUT
            </Link>
            <button
              onClick={clearCart}
              className="w-full py-3 rounded-full text-xs tracking-[0.1em] text-[#1A1A1A]/35 hover:text-[#1A1A1A]/60 transition-all whitespace-nowrap cursor-pointer"
            >
              Clear bag
            </button>
          </div>
        )}
      </div>
    </>
  );
}