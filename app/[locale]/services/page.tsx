import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Printer, Palette, Layers, Zap, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const t = useTranslations('Services');

  const services = [
    { 
      id: 'magazines', 
      icon: <Layers className="w-8 h-8" />, 
      title: t('magazines'), 
      desc: t('magazines_desc'),
      color: 'bg-blue-50 text-brandBlue'
    },
    { 
      id: 'business_cards', 
      icon: <Printer className="w-8 h-8" />, 
      title: t('business_cards'), 
      desc: t('business_cards_desc'),
      color: 'bg-navy/5 text-navy'
    },
    { 
      id: 'brochures', 
      icon: <Palette className="w-8 h-8" />, 
      title: t('brochures'), 
      desc: t('brochures_desc'),
      color: 'bg-accentGold/10 text-accentGold'
    },
    { 
      id: 'banners', 
      icon: <Zap className="w-8 h-8" />, 
      title: t('banners'), 
      desc: t('banners_desc'),
      color: 'bg-brandBlue/10 text-brandBlue'
    },
    { 
      id: 'packaging', 
      icon: <ShieldCheck className="w-8 h-8" />, 
      title: t('packaging'), 
      desc: t('packaging_desc'),
      color: 'bg-green-50 text-success'
    },
    { 
      id: 'custom', 
      icon: <Star className="w-8 h-8" />, 
      title: t('custom'), 
      desc: t('custom_desc'),
      color: 'bg-slate/10 text-slate'
    },
  ];

  return (
    <div className="pt-20 bg-offWhite min-h-screen">
      {/* Header Section */}
      <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-navy mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-slate max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-10 bg-white border border-navy/5 rounded-[2.5rem] hover:border-brandBlue/30 transition-all hover:shadow-2xl relative overflow-hidden"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">
                {service.title}
              </h3>
              <p className="text-slate leading-relaxed mb-8 min-h-[80px]">
                {service.desc}
              </p>
              <Link 
                href={`/catalogue?category=${service.id}`} 
                className="inline-flex items-center gap-2 text-brandBlue font-bold group-hover:gap-3 transition-all"
              >
                Explore Options <ArrowRight className="w-5 h-5" />
              </Link>
              
              {/* Background Accent */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brandBlue/5 rounded-full transition-all group-hover:scale-150 duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-navy text-offWhite relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brandBlue rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accentGold rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-6xl font-heading font-bold mb-8">
            Have a unique project?
          </h2>
          <p className="text-xl text-slate mb-12 leading-relaxed">
            Whether it&apos;s an oversized industrial banner or a limited edition luxury art book, 
            our master printers can bring any vision to life.
          </p>
          <Link 
            href="/contact" 
            className="px-10 py-5 bg-brandBlue text-white rounded-full font-bold text-xl hover:bg-brandBlue-light transition-all hover:scale-105 premium-shadow inline-block"
          >
            {t('cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}
