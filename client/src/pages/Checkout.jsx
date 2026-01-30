import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import api from '../api/axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { items, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'cod' // For now, only COD or Dummy Payment
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            products: items.map(item => ({
                product: item._id,
                quantity: item.quantity,
                price: item.salePrice || item.price
            })),
            totalAmount: total,
            shippingAddress: {
                street: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country
            },
            guestInfo: {
                name: formData.name,
                email: formData.email
            },
            paymentStatus: 'Pending'
        };

        try {
            await api.post('/orders', orderData);
            dispatch(clearCart());
            toast.success('Order placed successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <button
                    onClick={() => navigate('/shop')}
                    className="bg-black text-white px-6 py-3 uppercase text-sm font-bold tracking-widest hover:bg-gray-800"
                >
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest text-center">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Shipping Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-8 rounded-sm shadow-sm">
                            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">Billing Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-none focus:outline-none focus:border-black transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-none focus:outline-none focus:border-black transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 rounded-none focus:outline-none focus:border-black transition-colors"
                                        placeholder="123 Main St"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-none focus:outline-none focus:border-black transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-none focus:outline-none focus:border-black transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Zip Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            required
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 rounded-none focus:outline-none focus:border-black transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 rounded-none focus:outline-none focus:border-black transition-colors"
                                        placeholder="Country"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-sm shadow-sm sticky top-4">
                            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">Your Order</h2>

                            <div className="mb-6 space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item._id} className="flex justify-between items-center text-sm">
                                        <div className="flex gap-3">
                                            <span className="text-gray-500">{item.quantity}x</span>
                                            <span className="font-medium line-clamp-1 w-40">{item.title}</span>
                                        </div>
                                        <span className="font-bold">₹{((item.salePrice || item.price) * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-4">
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-bold">₹{total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-8 text-xl font-bold border-t border-gray-100 pt-4">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold uppercase mb-3">Payment Method</h3>
                                <div className="flex items-center gap-2 p-3 border border-black bg-gray-50">
                                    <input type="radio" checked readOnly className="accent-black" />
                                    <span className="text-sm font-medium">Cash on Delivery / Pay Later</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all disabled:opacity-70 flex justify-center items-center"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
