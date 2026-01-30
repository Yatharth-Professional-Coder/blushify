import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Skin Care', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&h=300&fit=crop', path: '/category/skin-care' },
    { name: 'Bridal', image: 'https://swissbeauty.in/cdn/shop/files/bridal_section_Thumbnail_1_1080x.jpg?v=1736341692', path: '/category/bridal' },
    { name: 'Makeup', image: 'https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg', path: '/category/makeup' },
    { name: 'Lips', image: 'https://swissbeauty.in/cdn/shop/files/3_1-LIPS_140x140.png?v=1747133814', path: '/category/lips' },
    { name: 'Eyes', image: 'https://swissbeauty.in/cdn/shop/files/2a_b0e928b4-c1b1-4e4f-9a11-4c32c8c984f6_140x140.png?v=1663159924', path: '/category/eyes' },
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load seasonal deals.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative h-[600px] bg-gray-100 dark:bg-gray-800 flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="http://blushify.infinityfree.me/wp-content/uploads/2025/12/ChatGPT-Image-Dec-23-2025-11_08_22-PM-1.png"
                        alt="Hero Banner"
                        className="w-full h-full object-cover opacity-80 dark:opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
                </div>
                <div className="container-custom relative z-10 text-center md:text-left">
                    <span className="block text-white uppercase tracking-[0.2em] mb-4 text-sm font-bold shadow-black drop-shadow-md">New Collection</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        Natural Beauty <br /> Reinvented
                    </h1>
                    <Link to="/shop" className="inline-block bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Categories */}
            <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                        {categories.map((cat, index) => (
                            <Link to={cat.path} key={index} className="group cursor-pointer block">
                                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-primary transition-all">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white group-hover:text-primary transition-colors">{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Daily Deals */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs">Don't Miss Out</span>
                        <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">Daily Deals</h2>
                        <div className="w-16 h-1 bg-black dark:bg-white mx-auto"></div>
                    </div>

                    {error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : loading ? (
                        <p className="text-center text-gray-500 dark:text-gray-300">Loading products...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.filter(p => p.isDailyDeal).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                    pocket

                    <div className="text-center mt-12">
                        <Link to="/shop" className="inline-block border-b-2 border-black dark:border-white pb-1 text-sm font-bold uppercase tracking-widest text-black dark:text-white hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-colors">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
