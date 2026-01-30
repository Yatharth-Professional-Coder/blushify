import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaBox, FaClipboardList, FaEdit, FaTrash, FaCheck, FaTimes, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            toast.error('Access denied');
            navigate('/');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, orderRes] = await Promise.all([
                api.get('/products'),
                api.get('/orders')
            ]);
            setProducts(prodRes.data);
            setOrders(orderRes.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch data');
        }
        setLoading(false);
    };

    const handleUpdateProduct = async (id, data) => {
        try {
            await api.put(`/products/${id}`, data);
            toast.success('Product updated');
            fetchData();
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success('Product deleted');
            fetchData();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const handleUpdateOrderStatus = async (id, status) => {
        try {
            await api.put(`/orders/${id}`, { status });
            toast.success('Order status updated');
            fetchData();
        } catch (err) {
            toast.error('Status update failed');
        }
    };

    if (loading) return <div className="text-center py-20">Loading Admin Dashboard...</div>;

    return (
        <div className="container-custom py-12">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="flex border-b border-gray-200 mb-8">
                <button
                    className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'products' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-black'
                        }`}
                    onClick={() => setActiveTab('products')}
                >
                    <FaBox className="inline mr-2" /> Products
                </button>
                <button
                    className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'orders' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-black'
                        }`}
                    onClick={() => setActiveTab('orders')}
                >
                    <FaClipboardList className="inline mr-2" /> Orders
                </button>
            </div>

            {activeTab === 'products' ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Product</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Price</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Stock</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Daily Deal</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={product.images[0]} alt="" className="w-10 h-10 object-cover rounded" />
                                            <span className="font-medium">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span>${product.price.toFixed(2)}</span>
                                            {product.salePrice && (
                                                <span className="text-xs text-red-500">Sale: ${product.salePrice.toFixed(2)}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleUpdateProduct(product._id, { inStock: !product.inStock })}
                                            className={`px-2 py-1 rounded text-xs font-bold uppercase ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleUpdateProduct(product._id, { isDailyDeal: !product.isDailyDeal })}
                                            className={`p-2 rounded-full transition-colors ${product.isDailyDeal ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 bg-gray-50'
                                                }`}
                                            title="Toggle Daily Deal"
                                        >
                                            <FaStar />
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    const newPrice = prompt('Enter new price:', product.price);
                                                    if (newPrice) handleUpdateProduct(product._id, { price: Number(newPrice) });
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Order ID</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Customer</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Total</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Status</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-mono text-xs">{order._id.slice(-8).toUpperCase()}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{order.user?.name || 'Guest'}</span>
                                            <span className="text-xs text-gray-500">{order.user?.email || ''}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold">${order.totalAmount.toFixed(2)}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                            className="text-sm border border-gray-200 rounded p-1"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
