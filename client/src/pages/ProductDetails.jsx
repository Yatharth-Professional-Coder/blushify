import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaHeart, FaShare, FaShoppingBag, FaBolt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Failed to load product');
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        toast.success(`${product.title} added to cart!`);
    };

    const handleBuyNow = () => {
        dispatch(addToCart({ ...product, quantity }));
        navigate('/cart');
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
    );

    if (!product) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <button
                onClick={() => navigate('/shop')}
                className="text-black underline underline-offset-4 font-medium"
            >
                Back to Shop
            </button>
        </div>
    );

    const images = product.images && product.images.length > 0
        ? product.images
        : ['https://via.placeholder.com/600'];

    return (
        <div className="bg-white dark:bg-gray-900 py-12 transition-colors duration-300">
            <div className="container-custom px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Product Image Gallery */}
                    <div className="lg:w-3/5">
                        <div className="flex flex-col-reverse md:flex-row gap-4">
                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] no-scrollbar">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(index)}
                                            className={`flex-shrink-0 w-20 h-24 rounded-md overflow-hidden border-2 transition-all ${activeImage === index ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="flex-1 aspect-[4/5] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden group relative">
                                <img
                                    src={images[activeImage]}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {product.salePrice && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                        Sale
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-2/5 flex flex-col">
                        <div className="mb-6">
                            <span className="inline-block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                                {product.category}
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-baseline gap-3">
                                    {product.salePrice ? (
                                        <>
                                            <span className="text-3xl font-bold text-red-600">₹{product.salePrice.toFixed(2)}</span>
                                            <span className="text-xl text-gray-400 line-through">₹{product.price.toFixed(2)}</span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-gray-800 dark:text-white">₹{product.price.toFixed(2)}</span>
                                    )}
                                </div>
                                {product.inStock ? (
                                    <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded tracking-wide uppercase">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded tracking-wide uppercase">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Quantity Selector */}
                            <div className="space-y-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Quantity</span>
                                <div className="flex items-center w-32 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden h-12">
                                    <button
                                        className="flex-1 h-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="flex-1 text-center font-bold">{quantity}</span>
                                    <button
                                        className="flex-1 h-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        onClick={() => setQuantity(q => q + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white px-8 py-4 uppercase tracking-widest font-bold text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                                >
                                    <FaShoppingBag size={18} /> Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white px-8 py-4 uppercase tracking-widest font-bold text-sm hover:opacity-90 transition-all duration-300 shadow-lg shadow-black/10"
                                >
                                    <FaBolt size={18} /> Buy it Now
                                </button>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                                    <FaHeart size={16} /> Add to Wishlist
                                </button>
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                                    <FaShare size={16} /> Share
                                </button>
                            </div>
                        </div>

                        {/* Extra Details */}
                        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                            <ul className="space-y-4 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-gray-500">SKU:</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-300">{product._id.slice(-8).toUpperCase()}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Category:</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-300 hover:underline cursor-pointer">{product.category}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-500">Shipping:</span>
                                    <span className="font-medium text-gray-900 dark:text-gray-300">Free International Shipping</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
