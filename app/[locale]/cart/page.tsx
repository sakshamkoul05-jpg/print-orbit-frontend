"use client";
import { useTranslations } from 'next-intl';
import { useCart } from '@/store/cart';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage({ params }: { params: { locale: string } }) {
  const tCommon = useTranslations('Common');
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 lg:px-20 max-w-7xl mx-auto text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-navy mb-4">Your cart is empty</h1>
        <p className="text-slate mb-12 max-w-md mx-auto">Looks like you haven't added any designs yet. Let's create something amazing!</p>
        <Link 
          href={`/${params.locale}/catalogue`} 
          className="px-10 py-4 bg-brandBlue text-white rounded-full font-bold text-lg hover:bg-brandBlue-light transition-all hover:scale-105 premium-shadow inline-block"
        >
          Explore Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <h1 className="text-4xl lg:text-5xl font-heading font-bold text-navy mb-12">{tCommon('cart')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key={item.id}
                className="bg-white p-6 rounded-3xl border border-navy/5 flex items-center gap-6 premium-shadow group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy mb-1">{item.name}</h3>
                  <p className="text-slate text-sm mb-4">Unit Price: ₹{item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-offWhite rounded-xl border border-navy/10 p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4 text-navy" />
                      </button>
                      <span className="px-4 text-sm font-bold text-navy">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-navy" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-slate hover:text-error transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-slate mb-1">Subtotal</p>
                  <p className="text-2xl font-bold text-navy">₹{item.price * item.quantity}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-navy/5 premium-shadow sticky top-24">
            <h2 className="text-2xl font-heading font-bold text-navy mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate">
                <span>Subtotal</span>
                <span className="font-medium text-navy">₹{getTotal()}</span>
              </div>
              <div className="flex justify-between text-slate">
                <span>Shipping</span>
                <span className="font-medium text-success">Free</span>
              </div>
              <div className="flex justify-between text-slate">
                <span>Tax (GST)</span>
                <span className="font-medium text-navy">₹{Math.round(getTotal() * 0.18)}</span>
              </div>
              <div className="pt-4 border-t border-navy/10 flex justify-between items-center">
                <span className="text-xl font-bold text-navy">Total</span>
                <span className="text-3xl font-bold text-brandBlue">₹{Math.round(getTotal() * 1.18)}</span>
              </div>
            </div>

            <Link 
              href={`/${params.locale}/checkout`} 
              className="w-full py-4 bg-navy text-white rounded-2xl font-bold text-lg hover:bg-brandBlue transition-all flex items-center justify-center gap-3 group"
            >
              {tCommon('checkout')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button 
              onClick={clearCart}
              className="w-full mt-4 py-2 text-sm text-slate hover:text-error transition-colors font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
