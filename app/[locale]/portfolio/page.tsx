"use client";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const MOCK_WORK = [
  {
    id: 'hosp-annual',
    title: 'Regional Hospital Annual Report',
    category: 'medical',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5779687d?q=80&w=800&h=1000&fit=crop',
    client: 'City General Hospital',
    desc: 'A 120-page comprehensive annual report featuring high-resolution medical imagery and precise data visualization.'
  },
  {
    id: 'kash-culture',
    title: 'Cultural Heritage Magazine',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&h=600&fit=crop',
    client: 'Kashmiri Heritage Society',
    desc: 'A luxury coffee-table book showcasing the intricate patterns and history of Kashmiri art.'
  },
  {
    id: 'corp-brand',
    title: 'TechCorp Identity Suite',
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1586717791821-60ed375ec36b?q=80&w=800&h=800&fit=crop',
    client: 'TechCorp India',
    desc: 'Full brand collateral including embossed business cards, letterheads, and corporate brochures.'
  },
  {
    id: 'edu-yearbook',
    title: 'Academy Yearbook 2024',
    category: 'editorial',
    image: 'https://images.unsplash.com/photo-1513475382585-d065705607ed?q=80&w=800&h=1200&fit=crop',
    client: 'St. Xavier Academy',
    desc: 'Custom binding and high-gloss finish for the prestigious annual school yearbook.'
  },
  {
    id: 'gov-pamphlet',
    title: 'Healthcare Awareness Drive',
    category: 'medical',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba9//q=80&w=800&h=600&fit=crop',
    client: 'Department of Health',
    desc: 'Mass-produced tri-fold pamphlets with ultra-fast turnaround and vivid accessibility colors.'
  },
  {
    id: 'art-exhibition',
    title: 'Contemporary Art Catalogue',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&h=1000&fit=crop',
    client: 'Art Gallery Kangra',
    desc: 'Matte-finish exhibition catalogue with precise color calibration for fine art prints.'
  },
];

export default function PortfolioPage() {
  const t = useTranslations('Portfolio');
  const [filter, setFilter] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);

  const filteredWork = MOCK_WORK.filter(item => filter === 'all' || item.category === filter);

  const categories = [
    { id: 'all', name: t('all') },
    { id: 'corporate', name: t('corporate') },
    { id: 'medical', name: t('medical') },
    { id: 'cultural', name: t('cultural') },
    { id: 'editorial', name: t('editorial') },
  ];

  return (
    <div className="pt-20 bg-offWhite min-h-screen px-6 lg:px-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-7xl font-heading font-bold text-navy mb-6"
        >
          {t('title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate max-w-3xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-center gap-3 mb-16 overflow-x-auto py-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              filter === cat.id 
                ? 'bg-brandBlue text-white shadow-lg shadow-brandBlue/30' 
                : 'bg-white text-slate border border-navy/5 hover:border-brandBlue/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Masonry Gallery */}
      <motion.div 
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 pb-24"
      >
        <AnimatePresence mode="popLayout">
          {filteredWork.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => setSelectedWork(item)}
              className="relative group cursor-pointer break-inside-avoid rounded-3xl overflow-hidden border border-navy/5 hover:border-brandBlue/30 transition-all hover:shadow-2xl"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-brandBlue mb-2">{item.client}</p>
                  <h3 className="text-xl font-heading font-bold mb-4">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm font-medium opacity-80">
                    <Maximize2 className="w-4 h-4" />
                    View Case Study
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA */}
      <div className="py-20 text-center">
        <Link 
          href="/contact" 
          className="px-12 py-5 bg-navy text-white rounded-full font-bold text-xl hover:bg-brandBlue transition-all hover:scale-105 premium-shadow inline-flex items-center gap-3"
        >
          {t('cta')} <ArrowRight className="w-6 h-6" />
        </Link>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedWork && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWork(null)}
              className="absolute inset-0 bg-navy/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-offWhite w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="h-[400px] lg:h-full relative">
                <img src={selectedWork.image} alt={selectedWork.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-brandBlue font-bold uppercase tracking-widest text-sm mb-2">{selectedWork.client}</p>
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-navy">{selectedWork.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedWork(null)}
                    className="p-2 hover:bg-navy/5 rounded-full transition-colors text-navy"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-lg text-slate leading-relaxed mb-8">
                  {selectedWork.desc}
                </p>
                <div className="p-6 bg-navy/5 rounded-2xl border border-navy/10 italic text-slate mb-8">
                  "Print Orbit transformed our vision into a tactile masterpiece. The precision in color and the quality of paper exceeded our expectations."
                  <div className="mt-4 font-bold text-navy not-italic">— Project Lead, {selectedWork.client}</div>
                </div>
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-brandBlue text-white rounded-2xl font-bold text-center hover:bg-brandBlue-light transition-all inline-block"
                >
                  Request Similar Project
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Need to import X from lucide-react for the modal
import { X } from 'lucide-react';
