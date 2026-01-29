import { Link } from 'react-router-dom';
import { FaShoppingBag, FaUser, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { items: cartItems } = useSelector((state) => state.cart);
    const { theme, toggleTheme } = useTheme();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="container-custom flex items-center justify-between h-20">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-widest uppercase dark:text-white">
                    Blushify
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                    <Link to="/shop" className="hover:text-black dark:hover:text-white transition-colors">Shop</Link>
                    <Link to="/category/skin-care" className="hover:text-black dark:hover:text-white transition-colors">Skin Care</Link>
                    <Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300">
                    <button onClick={toggleTheme} className="hover:text-black dark:hover:text-white transition-colors">
                        {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>

                    <button className="hover:text-black dark:hover:text-white transition-colors">
                        <FaSearch size={20} />
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase hidden md:inline">{user.name.split(' ')[0]}</span>
                            <button onClick={handleLogout} className="text-xs uppercase hover:underline">Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-black dark:hover:text-white transition-colors">
                            <FaUser size={20} />
                        </Link>
                    )}

                    <Link to="/cart" className="relative hover:text-black dark:hover:text-white transition-colors">
                        <FaShoppingBag size={20} />
                        <span className="absolute -top-1 -right-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            {cartItems.length}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
