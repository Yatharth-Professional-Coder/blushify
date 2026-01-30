import { Link } from 'react-router-dom';

const Footer = () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isAdmin = user && user.role === 'admin';

    return (
        <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
            <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand */}
                <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Blushify</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Your destination for premium beauty and skincare. Enhancing your natural glow with clean, effective products.
                    </p>
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors"
                        >
                            Admin Panel
                        </Link>
                    )}
                </div>

                {/* Shop */}
                <div>
                    <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Shop</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Best Sellers</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Skin Care</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Makeup</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Stay in the loop</h4>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
                        />
                        <button className="bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="container-custom border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} Blushify. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <span>Instagram</span>
                    <span>Facebook</span>
                    <span>Twitter</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
