"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-20 bg-offWhite min-h-screen px-6 lg:px-20 max-w-7xl mx-auto">
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
          className="text-xl text-slate max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-navy/5 premium-shadow"
        >
          <h2 className="text-3xl font-heading font-bold text-navy mb-8">
            {t('form_title')}
          </h2>
          
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10" />
              </div>
              <p className="text-xl font-bold text-navy mb-2">Thank You!</p>
              <p className="text-slate">{t('success')}</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-brandBlue font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">{t('name')}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">{t('email')}</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">{t('phone')}</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy ml-1">{t('subject')}</label>
                  <select className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors text-slate">
                    <option>Business Cards</option>
                    <option>Magazine Design</option>
                    <option>Corporate Brochure</option>
                    <option>Banners & Signage</option>
                    <option>Custom Request</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-navy ml-1">{t('message')}</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl bg-offWhite border border-navy/10 outline-none focus:border-brandBlue transition-colors resize-none"
                  placeholder="Tell us about your project requirements, quantity, and timeline..."
                />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-4 bg-navy text-white rounded-2xl font-bold text-lg hover:bg-brandBlue transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    {t('send')} <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div className="bg-navy text-offWhite p-8 lg:p-12 rounded-[2.5rem] premium-shadow">
            <h2 className="text-3xl font-heading font-bold mb-8">
              {t('details_title')}
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-3 bg-white/10 rounded-2xl text-brandBlue">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('address')}</p>
                  <p className="text-slate">Main Market, Kangra, Himachal Pradesh, 176001</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-3 bg-white/10 rounded-2xl text-brandBlue">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('phone_label')}</p>
                  <p className="text-slate">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-3 bg-white/10 rounded-2xl text-brandBlue">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('email_label')}</p>
                  <p className="text-slate">hello@printorbit.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-3 bg-white/10 rounded-2xl text-brandBlue">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('hours')}</p>
                  <p className="text-slate">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-slate">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <Link 
              href="https://wa.me/919876543210" 
              className="mt-12 w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-center hover:bg-green-700 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Link>
          </div>

          {/* Map Embed Placeholder */}
          <div className="h-64 bg-slate/20 rounded-[2.5rem] border border-navy/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 font-medium italic">
              Google Maps Integration
            </div>
            {/* 
            <iframe 
              src="https://www.google.com/maps/embed?..." 
              className="w-full h-full grayscale"
              loading="lazy"
            /> 
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
