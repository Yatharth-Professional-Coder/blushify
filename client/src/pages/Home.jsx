import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Skin Care', image: 'https://blushify.infinityfree.me/wp-content/uploads/2023/07/cat-1.jpg' },
    { name: 'Bridal', image: 'https://blushify.infinityfree.me/wp-content/uploads/2023/07/cat-2.jpg' },
    { name: 'Makeup', image: 'https://blushify.infinityfree.me/wp-content/uploads/2023/07/cat-3.jpg' },
    { name: 'Lips', image: 'https://blushify.infinityfree.me/wp-content/uploads/2023/07/cat-4.jpg' },
    { name: 'Eyes', image: 'https://blushify.infinityfree.me/wp-content/uploads/2023/07/cat-5.jpg' },
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[600px] bg-gray-100 flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="https://blushify.infinityfree.me/wp-content/uploads/2023/07/slider-1.jpg"
                        alt="Hero Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <div className="container-custom relative z-10 text-center md:text-left">
                    <span className="block text-white uppercase tracking-[0.2em] mb-4 text-sm font-bold">New Collection</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Natural Beauty <br /> Reinvented
                    </h1>
                    <Link to="/shop" className="inline-block bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Categories */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                        {categories.map((cat, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-primary transition-all">
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-wider">{cat.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Daily Deals */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs">Don't Miss Out</span>
                        <h2 className="text-3xl font-bold mt-2 mb-4">Daily Deals</h2>
                        <div className="w-16 h-1 bg-black mx-auto"></div>
                    </div>

                    {loading ? (
                        <p className="text-center">Loading products...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.slice(0, 4).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/shop" className="inline-block border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-widest hover:text-primary hover:border-primary transition-colors">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
