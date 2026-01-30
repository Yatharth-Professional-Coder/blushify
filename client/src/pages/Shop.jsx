import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Shop = () => {
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
                setError('Failed to load products. Please check if the API is running.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 pt-10 pb-20 transition-colors duration-300">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Shop All</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore our collection of premium beauty products designed to enhance your natural glow.
                    </p>
                </div>

                {error ? (
                    <div className="text-center py-20 text-red-500">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-primary underline">Try Again</button>
                    </div>
                ) : loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
