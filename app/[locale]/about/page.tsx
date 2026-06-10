"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Award, Factory } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="pt-20 bg-offWhite overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brandBlue/5 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-navy leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-slate max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-heading font-bold text-navy">
              The Printing Powerhouse of Kangra
            </h2>
            <p className="text-lg text-slate leading-relaxed">
              {t('story')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-white border border-navy/5 rounded-2xl premium-shadow">
                <Zap className="w-8 h-8 text-brandBlue mb-4" />
                <h3 className="font-bold text-navy mb-2">{t('quality_title')}</h3>
                <p className="text-sm text-slate">{t('quality_desc')}</p>
              </div>
              <div className="p-6 bg-white border border-navy/5 rounded-2xl premium-shadow">
                <Award className="w-8 h-8 text-brandBlue mb-4" />
                <h3 className="font-bold text-navy mb-2">Industry Standard</h3>
                <p className="text-sm text-slate">Using the finest grade papers and ink for long-lasting, vivid prints.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-navy rounded-3xl overflow-hidden premium-shadow relative">
              {/* Placeholder for high-quality print facility image */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy to-brandBlue opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-heading text-4xl font-bold italic">
                PRINT ORBIT FACILITY
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 bg-white border border-navy/5 rounded-2xl premium-shadow max-w-xs">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-brandBlue/10 rounded-lg text-brandBlue">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-bold text-navy">Certified Quality</span>
              </div>
              <p className="text-sm text-slate">Consistent color fidelity and sharp edges on every page.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-24 bg-navy text-offWhite">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="aspect-video bg-white/10 rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white/10 font-heading text-4xl font-bold italic">
                    TECH SHOWCASE
                  </div>
               </div>
               <div className="absolute -top-6 -right-6 p-6 bg-brandBlue rounded-2xl premium-shadow text-white font-bold">
                  High-Speed Offset
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandBlue/20 text-brandBlue rounded-full text-sm font-bold uppercase tracking-wider">
                <Factory className="w-4 h-4" />
                Infrastructure
              </div>
              <h2 className="text-4xl font-heading font-bold leading-tight">
                {t('infrastructure_title')}
              </h2>
              <p className="text-lg text-slate leading-relaxed">
                {t('infrastructure_desc')}
              </p>
              <ul className="space-y-4">
                {[
                  "Precision Color Matching System",
                  "Ultra-fast Digital Press for short runs",
                  "Heavy-duty Offset for bulk magazines",
                  "Premium Binding & Finishing options"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate">
                    <div className="w-1.5 h-1.5 bg-brandBlue rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Client Section */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-heading font-bold text-navy mb-4">
            {t('trust_title')}
          </h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            {t('trust_desc')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          {['Govt Hospitals', 'Kashmiri Org', 'Regional Banks', 'Local Enterprises'].map((client) => (
            <div key={client} className="p-8 bg-white border border-navy/5 rounded-2xl flex items-center justify-center font-heading font-bold text-navy">
              {client}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
