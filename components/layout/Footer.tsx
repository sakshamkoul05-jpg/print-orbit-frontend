export default function Footer() {
  return (
    <footer className="bg-navy text-offWhite py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-heading font-bold mb-6">
            Print<span className="text-brandBlue">Orbit</span>
          </div>
          <p className="text-slate max-w-md leading-relaxed mb-8">
            The premium printing destination of Kangra. Specializing in high-fidelity print 
            and design for corporate, medical, and cultural organizations.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brandBlue transition-colors cursor-pointer">
              {/* Social Icons */}
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brandBlue transition-colors cursor-pointer">
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brandBlue transition-colors cursor-pointer">
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-slate">
            <li><a href="/about" className="hover:text-brandBlue transition-colors">About Us</a></li>
            <li><a href="/services" className="hover:text-brandBlue transition-colors">Services</a></li>
            <li><a href="/catalogue" className="hover:text-brandBlue transition-colors">Catalogue</a></li>
            <li><a href="/portfolio" className="hover:text-brandBlue transition-colors">Portfolio</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6">Contact</h4>
          <ul className="flex flex-col gap-4 text-slate">
            <li>Kangra, Himachal Pradesh, India</li>
            <li>hello@printorbit.com</li>
            <li>+91 98765 43210</li>
            <li>Mon - Sat: 9am - 8pm</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-slate text-sm">
        © {new Date().getFullYear()} Print Orbit. All rights reserved.
      </div>
    </footer>
  );
}
