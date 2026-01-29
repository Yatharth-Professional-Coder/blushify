import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper to map URL slug to DB Category Name
    const getCategoryName = (slug) => {
        const map = {
            'skin-care': 'Skin Care',
            'bridal': 'Bridal Bundle',
            'makeup': 'Face', // Assuming 'Makeup' in Home maps to 'Face' in DB
            'lips': 'Lips',
            'eyes': 'Eyes'
        };
        return map[slug] || slug; // Fallback to slug if not found
    };

    const dbCategoryName = getCategoryName(categoryName);
    const displayCategoryName = dbCategoryName === 'Bridal Bundle' ? 'Bridal' : dbCategoryName;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                // Client-side filtering for simplicity given the small dataset
                const filtered = data.filter(p => p.category === dbCategoryName);
                setProducts(filtered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [dbCategoryName]);

    return (
        <div className="bg-white dark:bg-gray-900 pt-10 pb-20 transition-colors duration-300 min-h-screen">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white capitalize">
                        {displayCategoryName}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore our exclusive collection of {displayCategoryName.toLowerCase()} products.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500 dark:text-gray-400">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
