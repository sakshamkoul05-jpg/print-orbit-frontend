"use client";
import { useTranslations } from 'next-intl';
import { useCart } from '@/store/cart';
import { CreditCard, MapPin, User, Phone, Package } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/lib/api-config';

export default function CheckoutPage({ params }: { params: { locale: string } }) {
  const tCommon = useTranslations('Common');
  const { items, getTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // 1. Create Razorpay Order on separate backend
      const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(getTotal() * 1.18) * 100, // paise
          currency: 'INR',
          items: items,
        }),
      });
      const orderData = await response.json();

      // 2. Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummy',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Print Orbit',
          description: 'Payment for Custom Print Order',
          order_id: orderData.id,
          handler: async function (response: any) {
            // 3. Verify payment and create order in separate backend
            const verifyRes = await fetch(`${API_BASE_URL}/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                customer: {
                  email: 'customer@example.com', // should come from form
                  street: 'Main Street',
                  city: 'Kangra',
                  state: 'HP',
                  pincode: '176001',
                  phone: '9876543210'
                },
                amount: Math.round(getTotal() * 1.18) * 100,
                items: items
              }),
            });
            if (verifyRes.ok) {
              window.location.href = `/${params.locale}/account/orders`;
            }
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          theme: { color: '#2563EB' },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-20 pb-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <h1 className="text-4xl font-heading font-bold text-navy mb-12">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePayment} className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] border border-navy/5 premium-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-brandBlue/10 text-brandBlue rounded-lg">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy">Personal Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate ml-1">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate ml-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                    <input required type="tel" className="w-full pl-10 pr-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate ml-1">GST Number (Optional)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] border border-navy/5 premium-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-brandBlue/10 text-brandBlue rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-navy">Shipping Address</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate ml-1">Street Address</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate ml-1">City</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate ml-1">State</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate ml-1">Pincode</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors" />
                  </div>
                </div>
              </div>
            </section>

            <button 
              disabled={isProcessing}
              className="w-full py-5 bg-navy text-white rounded-[2rem] font-bold text-xl hover:bg-brandBlue transition-all flex items-center justify-center gap-3 shadow-xl shadow-navy/20 disabled:opacity-70"
            >
              {isProcessing ? 'Processing...' : (
                <>
                  <CreditCard className="w-6 h-6" /> Pay Now ₹{Math.round(getTotal() * 1.18)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-navy/5 premium-shadow sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brandBlue/10 text-brandBlue rounded-lg">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-navy">Order Summary</h2>
            </div>
            
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-navy/5">
                  <div>
                    <p className="font-bold text-navy">{item.name}</p>
                    <p className="text-xs text-slate">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-navy">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-navy/10">
              <div className="flex justify-between text-slate">
                <span>Subtotal</span>
                <span>₹{getTotal()}</span>
              </div>
              <div className="flex justify-between text-slate">
                <span>GST (18%)</span>
                <span>₹{Math.round(getTotal() * 0.18)}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold text-navy">Total</span>
                <span className="text-3xl font-bold text-brandBlue">₹{Math.round(getTotal() * 1.18)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
