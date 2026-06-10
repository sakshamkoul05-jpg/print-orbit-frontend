import { prisma } from '@/lib/prisma';
import { Package, Search, Filter, ChevronRight, LayoutDashboard, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-navy text-white p-6 hidden lg:flex flex-col">
        <div className="text-2xl font-heading font-bold mb-10 px-2">
          Admin<span className="text-brandBlue">Orbit</span>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 bg-brandBlue rounded-xl font-bold">
            <ShoppingCart className="w-5 h-5" /> Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-heading font-bold text-navy">Order Management</h1>
            <p className="text-slate">Manage and track all incoming print jobs.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
              <input 
                type="text" 
                placeholder="Search order ID..." 
                className="pl-10 pr-4 py-2 rounded-xl border border-navy/10 outline-none focus:border-brandBlue transition-colors"
              />
            </div>
            <button className="p-2 bg-white border border-navy/10 rounded-xl text-navy hover:bg-slate-100 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="bg-white rounded-3xl border border-navy/5 premium-shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-navy">{order.orderNumber}</p>
                      <p className="text-xs text-slate">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-navy">{order.email}</p>
                      <p className="text-xs text-slate">{order.shippingCity}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-navy">
                      ₹{order.total}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                        order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link 
                        href={`/admin/orders/${order.id}`} 
                        className="inline-flex items-center gap-1 text-brandBlue font-bold text-sm hover:underline"
                      >
                        Manage <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate italic">
                    No orders found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

