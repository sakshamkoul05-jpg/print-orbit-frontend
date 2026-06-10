"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, Users, FileText, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const STATS_DATA: StatItem[] = [
  { label: 'Total Orders', value: '1,284', icon: <ShoppingCart className="w-6 h-6" />, color: 'bg-blue-500' },
  { label: 'Revenue', value: '₹4,52,000', icon: <LayoutDashboard className="w-6 h-6" />, color: 'bg-green-500' },
  { label: 'Active Customers', value: '842', icon: <Users className="w-6 h-6" />, color: 'bg-purple-500' },
  { label: 'Pending Reviews', value: '12', icon: <FileText className="w-6 h-6" />, color: 'bg-orange-500' },
];

export default function AdminDashboard() {
  const t = useTranslations('Navbar');

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-navy text-white p-6 flex flex-col">
        <div className="text-2xl font-heading font-bold mb-10 px-2">
          Admin<span className="text-brandBlue">Orbit</span>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 p-3 bg-brandBlue rounded-xl font-bold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
            <ShoppingCart className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 p-3 text-slate hover:text-white transition-colors">
            Return to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-heading font-bold text-navy">Dashboard Overview</h1>
            <p className="text-slate">Welcome back, Admin. Here is what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-navy">Admin User</p>
              <p className="text-xs text-slate">Super Administrator</p>
            </div>
            <div className="w-10 h-10 bg-brandBlue rounded-full" />
          </div>
        </header>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS_DATA.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-navy/5 premium-shadow"
            >
              <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-slate text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-navy">{stat.value}</h3>
            </motion.div>
          ))}
        </div>
        
        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border border-navy/5 premium-shadow overflow-hidden">
          <div className="p-6 border-b border-navy/5 flex justify-between items-center">
            <h2 className="text-xl font-heading font-bold text-navy">Recent Orders</h2>
            <Link href="/admin/orders" className="text-brandBlue text-sm font-bold hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-navy">#PO-2024-0{i}</td>
                    <td className="px-6 py-4 text-sm text-navy">Customer {i}</td>
                    <td className="px-6 py-4 text-sm font-bold text-navy">₹{1200 + i * 100}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate">Jun 10, 2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
