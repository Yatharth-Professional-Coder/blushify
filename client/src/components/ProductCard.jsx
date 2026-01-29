import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative">
            <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                <img
                    src={product.images[0] || 'https://via.placeholder.com/300'}
                    alt={product.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                {product.salePrice && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 uppercase">
                        Sale
                    </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
                    <button className="w-full bg-black text-white py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <FaShoppingBag /> Add to Cart
                    </button>
                </div>
            </div>

            <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                    <Link to={`/product/${product._id}`}>
                        {product.title}
                    </Link>
                </h3>
                <div className="flex justify-center items-center space-x-2 text-sm">
                    {product.salePrice ? (
                        <>
                            <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
                            <span className="text-red-500 font-bold">${product.salePrice.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="font-bold">${product.price.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
