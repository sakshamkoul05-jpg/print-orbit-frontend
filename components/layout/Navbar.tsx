"use client";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const locales = ['en', 'hi'];
  const currentLocale = pathname.split('/')[1] || 'en';

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  const navLinks = [
    { name: t('home'), href: `/${currentLocale}` },
    { name: t('about'), href: `/${currentLocale}/about` },
    { name: t('services'), href: `/${currentLocale}/services` },
    { name: t('catalogue'), href: `/${currentLocale}/catalogue` },
    { name: t('customPrint'), href: `/${currentLocale}/custom-print` },
    { name: t('portfolio'), href: `/${currentLocale}/portfolio` },
    { name: t('contact'), href: `/${currentLocale}/contact` },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-offWhite/80 backdrop-blur-md border-b border-navy/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
        <Link href={`/${currentLocale}`} className="text-2xl font-heading font-bold text-navy">
          Print<span className="text-brandBlue">Orbit</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 text-slate font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="hover:text-brandBlue transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brandBlue transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4 pl-6 border-l border-navy/10">
            <button 
              onClick={() => switchLocale(currentLocale === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-navy/10 text-sm font-medium hover:bg-navy/5 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {currentLocale === 'en' ? 'हिन्दी' : 'English'}
            </button>
            <Link 
              href={`/${currentLocale}/cart`} 
              className="p-2 bg-navy text-white rounded-full hover:bg-brandBlue transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brandBlue text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button 
            onClick={() => switchLocale(currentLocale === 'en' ? 'hi' : 'en')}
            className="p-2 text-navy"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-navy"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-offWhite border-b border-navy/5 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate hover:text-brandBlue py-2 border-b border-navy/5"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href={`/${currentLocale}/cart`} 
            className="flex items-center justify-center gap-2 p-4 bg-navy text-white rounded-2xl font-bold mt-4"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
}
