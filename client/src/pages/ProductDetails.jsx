import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { FaHeart, FaShare } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="bg-white py-12">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Product Image */}
                    <div className="md:w-1/2">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={product.images[0] || 'https://via.placeholder.com/600'}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2">
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.title}</h1>

                        <div className="flex items-center mb-6">
                            <div className="text-2xl font-bold">
                                {product.salePrice ? (
                                    <>
                                        <span className="text-gray-400 line-through mr-3 text-xl">${product.price.toFixed(2)}</span>
                                        <span className="text-red-500">${product.salePrice.toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span>${product.price.toFixed(2)}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border border-gray-300">
                                <button
                                    className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                >
                                    -
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    className="px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white px-8 py-3 uppercase tracking-widest font-bold text-sm hover:bg-gray-800 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <button className="flex items-center gap-2 hover:text-black">
                                <FaHeart /> Add to Wishlist
                            </button>
                            <button className="flex items-center gap-2 hover:text-black">
                                <FaShare /> Share
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 text-xs text-gray-500 uppercase tracking-wider space-y-2">
                            <p>SKU: {product._id.slice(-6)}</p>
                            <p>Category: {product.category}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
