"use client";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Printer, Palette, Layers, Zap, ShieldCheck, Star } from 'lucide-react';

export default function Home() {
  const t = useTranslations('Hero');
  const tServices = useTranslations('Services');
  const tCommon = useTranslations('Common');

  const services = [
    { id: 'magazines', icon: <Layers className="w-6 h-6" />, title: tServices('magazines') },
    { id: 'business_cards', icon: <Printer className="w-6 h-6" />, title: tServices('business_cards') },
    { id: 'brochures', icon: <Palette className="w-6 h-6" />, title: tServices('brochures') },
    { id: 'banners', icon: <Zap className="w-6 h-6" />, title: tServices('banners') },
    { id: 'packaging', icon: <ShieldCheck className="w-6 h-6" />, title: tServices('packaging') },
    { id: 'custom', icon: <Star className="w-6 h-6" />, title: tServices('custom') },
  ];

  return (
    <main className="relative min-h-screen bg-offWhite overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 lg:px-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brandBlue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accentGold/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-8xl font-heading font-bold text-navy leading-tight tracking-tighter mb-6"
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-slate max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/customize/new" 
              className="px-8 py-4 bg-brandBlue text-white rounded-full font-semibold text-lg hover:bg-brandBlue-light transition-all hover:scale-105 premium-shadow"
            >
              {t('cta_customizer')}
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-navy border border-navy/10 rounded-full font-semibold text-lg hover:bg-navy hover:text-white transition-all"
            >
              {t('cta_quote')}
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 inline-flex items-center gap-3 px-4 py-2 bg-navy/5 rounded-full text-navy/60 text-sm font-medium border border-navy/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandBlue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandBlue"></span>
            </span>
            {t('trusted')}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy mb-4">
            {tServices('title')}
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            {tServices('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white border border-navy/5 rounded-3xl hover:border-brandBlue/30 transition-all hover:shadow-xl group"
            >
              <div className="w-12 h-12 bg-brandBlue/10 text-brandBlue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandBlue group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-navy mb-3">
                {service.title}
              </h3>
              <p className="text-slate mb-6 leading-relaxed">
                Premium quality prints with precision and speed. Perfect for your business needs.
              </p>
              <Link 
                href={`/services/${service.id}`} 
                className="text-brandBlue font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Learn More <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Trust Section */}
      <section className="py-20 bg-navy text-offWhite">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-heading font-bold text-brandBlue mb-2">10k+</div>
            <div className="text-slate">Orders Delivered</div>
          </div>
          <div>
            <div className="text-5xl font-heading font-bold text-brandBlue mb-2">24hr</div>
            <div className="text-slate">Turnaround Time</div>
          </div>
          <div>
            <div className="text-5xl font-heading font-bold text-brandBlue mb-2">100%</div>
            <div className="text-slate">Quality Satisfaction</div>
          </div>
        </div>
      </section>
    </main>
  );
}
