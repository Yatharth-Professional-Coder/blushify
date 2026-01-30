import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    const { items, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/shop" className="bg-black text-white px-6 py-3 uppercase text-sm font-bold tracking-widest hover:bg-gray-800">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-200">
                                    <tr className="uppercase text-xs text-gray-500 tracking-wider">
                                        <th className="pb-4 pl-0">Product</th>
                                        <th className="pb-4">Price</th>
                                        <th className="pb-4">Quantity</th>
                                        <th className="pb-4">Total</th>
                                        <th className="pb-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {items.map((item) => (
                                        <tr key={item._id}>
                                            <td className="py-6 pl-0">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded bg-gray-100" />
                                                    <div>
                                                        <p className="font-bold text-sm">{item.title}</p>
                                                        <p className="text-xs text-gray-500">{item.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 text-sm">
                                                ₹{(item.salePrice || item.price).toFixed(2)}
                                            </td>
                                            <td className="py-6">
                                                <div className="flex items-center border border-gray-300 w-24">
                                                    <button
                                                        className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                                                        onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: Math.max(1, item.quantity - 1) }))}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center text-sm">{item.quantity}</span>
                                                    <button
                                                        className="px-2 py-1 hover:bg-gray-100"
                                                        onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-6 font-bold text-sm">
                                                ₹{((item.salePrice || item.price) * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="py-6 text-right">
                                                <button
                                                    onClick={() => dispatch(removeFromCart(item._id))}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Cart Totals */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 p-8 rounded-sm">
                            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">Cart Totals</h2>
                            <div className="flex justify-between mb-4 text-sm">
                                <span>Subtotal</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-6 text-sm">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between mb-8 text-lg font-bold border-t border-gray-200 pt-4">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
