"use client";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ArrowUpDown, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

// Mock Data for initial build (will be replaced by API/Prisma later)
const MOCK_PRODUCTS = [
  {
    id: 'bc-premium',
    name: 'Premium Business Cards',
    category: 'business_cards',
    price: 499,
    image: 'https://images.unsplash.com/photo-1589483232748-51575797f73f?q=80&w=400&h=400&fit=crop',
    tag: 'Popular',
    description: 'Ultra-thick 400gsm cardstock with soft-touch finish.'
  },
  {
    id: 'mag-classic',
    name: 'Classic Magazine Layout',
    category: 'magazines',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&h=400&fit=crop',
    tag: 'Premium',
    description: 'High-gloss covers with precision offset interior pages.'
  },
  {
    id: 'bro-tri-fold',
    name: 'Corporate Tri-Fold Brochure',
    category: 'brochures',
    price: 899,
    image: 'https://images.unsplash.com/photo-1586075014628-7f1ebd7d2726?q=80&w=400&h=400&fit=crop',
    tag: 'Professional',
    description: 'Professional fold with vibrant colors for corporate identity.'
  },
  {
    id: 'ban-vinyl',
    name: 'Outdoor Vinyl Banner',
    category: 'banners',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1562654501-a055bc675686?q=80&w=400&h=400&fit=crop',
    tag: 'Durable',
    description: 'Waterproof, UV-resistant high-visibility vinyl.'
  },
  {
    id: 'pkg-luxury',
    name: 'Luxury Product Box',
    category: 'packaging',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1589939705384-518570676bc1?q=80&w=400&h=400&fit=crop',
    tag: 'Bespoke',
    description: 'Custom shaped rigid boxes with gold foil accents.'
  },
  {
    id: 'stk-vinyl',
    name: 'Die-Cut Vinyl Stickers',
    category: 'custom',
    price: 299,
    image: 'https://images.unsplash.com/photo-1572375498518-717457777582?q=80&w=400&h=400&fit=crop',
    tag: 'Versatile',
    description: 'Precision cut stickers for branding and merchandise.'
  },
];

export default function CataloguePage() {
  const t = useTranslations('Catalogue');
  const tCommon = useTranslations('Common');
  
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('popular');

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    if (filter !== 'all') {
      result = result.filter(p => p.category === filter);
    }
    if (sort === 'price_low_high') result.sort((a, b) => a.price - b.price);
    if (sort === 'price_high_low') result.sort((a, b) => b.price - a.price);
    // popular is default mock order
    return result;
  }, [filter, sort]);

  const categories = [
    { id: 'all', name: t('all') },
    { id: 'business_cards', name: 'Business Cards' },
    { id: 'magazines', name: 'Magazines' },
    { id: 'brochures', name: 'Brochures' },
    { id: 'banners', name: 'Banners' },
    { id: 'packaging', name: 'Packaging' },
    { id: 'custom', name: 'Custom' },
  ];

  return (
    <div className="pt-20 bg-offWhite min-h-screen px-6 lg:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-6xl font-heading font-bold text-navy mb-4"
        >
          {t('title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-navy/10 rounded-xl text-navy font-medium shrink-0">
            <Filter className="w-4 h-4" />
            <span className="text-sm">{t('filter')}</span>
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat.id 
                    ? 'bg-brandBlue text-white shadow-lg shadow-brandBlue/30' 
                    : 'bg-white text-slate border border-navy/5 hover:border-brandBlue/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-navy/10 rounded-xl text-navy font-medium shrink-0">
            <ArrowUpDown className="w-4 h-4" />
            <span className="text-sm">{t('sort')}</span>
          </div>
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white border border-navy/10 text-slate text-sm font-medium outline-none focus:border-brandBlue transition-colors"
          >
            <option value="popular">{t('popular')}</option>
            <option value="newest">{t('newest')}</option>
            <option value="price_low_high">{t('price_low_high')}</option>
            <option value="price_high_low">{t('price_high_low')}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="group bg-white border border-navy/5 rounded-[2rem] overflow-hidden hover:border-brandBlue/30 transition-all hover:shadow-2xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-navy text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-accentGold" />
                    {product.tag}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-heading font-bold text-navy group-hover:text-brandBlue transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-lg font-bold text-navy">
                      ₹{product.price}
                    </span>
                  </div>
                  <p className="text-slate text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div className="flex gap-3">
                    <Link 
                      href={`/customize/${product.id}`} 
                      className="flex-1 py-3 bg-navy text-white rounded-2xl font-bold text-center hover:bg-brandBlue transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      {tCommon('customize')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate/10 rounded-full flex items-center justify-center mx-auto mb-4 text-slate">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <p className="text-xl text-slate font-medium">{t('no_products')}</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
