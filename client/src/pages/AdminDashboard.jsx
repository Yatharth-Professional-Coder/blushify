import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FaBox, FaClipboardList, FaEdit, FaTrash, FaStar, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ProductModal from '../components/ProductModal';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const handleCreateProduct = async (data) => {
        try {
            await api.post('/products', data);
            toast.success('Product created successfully');
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Creation failed');
        }
    };

    const handleUpdateProduct = async (id, data) => {
        try {
            await api.put(`/products/${id}`, data);
            toast.success('Product updated');
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success('Product deleted');
            fetchData();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Delete failed');
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

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
    );

    return (
        <div className="container-custom py-12 px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900 dark:text-white">Admin Dashboard</h1>
                {activeTab === 'products' && (
                    <button
                        onClick={openAddModal}
                        className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-lg"
                    >
                        <FaPlus /> Add New Product
                    </button>
                )}
            </div>

            <div className="flex border-b border-gray-100 dark:border-gray-800 mb-8 overflow-x-auto no-scrollbar">
                <button
                    className={`px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'products'
                        ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                        : 'text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                    onClick={() => setActiveTab('products')}
                >
                    <FaBox size={14} /> Product Management
                </button>
                <button
                    className={`px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'orders'
                        ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                        : 'text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                    onClick={() => setActiveTab('orders')}
                >
                    <FaClipboardList size={14} /> Order Management
                </button>
            </div>

            {activeTab === 'products' ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Product</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Category</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Price</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Stock</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Daily Deal</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-14 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{product.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{product.category}</span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">₹{product.price.toFixed(2)}</span>
                                                {product.salePrice && (
                                                    <span className="text-[10px] font-bold text-red-500 uppercase">Sale: ₹{product.salePrice.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <button
                                                onClick={() => handleUpdateProduct(product._id, { inStock: !product.inStock })}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border tracking-widest transition-all ${product.inStock
                                                    ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                                                    : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
                                                    }`}
                                            >
                                                {product.inStock ? 'Available' : 'Out of Stock'}
                                            </button>
                                        </td>
                                        <td className="p-5">
                                            <button
                                                onClick={() => handleUpdateProduct(product._id, { isDailyDeal: !product.isDailyDeal })}
                                                className={`p-2 rounded-lg transition-all ${product.isDailyDeal
                                                    ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                                                    : 'text-gray-300 hover:text-gray-400 bg-gray-50 dark:bg-gray-900/50'
                                                    }`}
                                                title="Toggle Daily Deal"
                                            >
                                                <FaStar size={16} />
                                            </button>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete Product"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Order ID</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Customer</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Total</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Status</th>
                                    <th className="p-5 font-bold uppercase text-[10px] text-gray-400 tracking-[0.2em]">Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                                        <td className="p-5 font-mono text-[10px] font-bold text-gray-400 uppercase">{order._id.slice(-8)}</td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">{order.user?.name || 'Guest'}</span>
                                                <span className="text-[10px] text-gray-500 font-medium">{order.user?.email || ''}</span>
                                            </div>
                                        </td>
                                        <td className="p-5 font-bold text-sm tracking-widest">₹{order.totalAmount.toFixed(2)}</td>
                                        <td className="p-5">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase border tracking-widest ${order.status === 'Delivered'
                                                ? 'bg-green-50 text-green-600 border-green-100'
                                                : order.status === 'Cancelled'
                                                    ? 'bg-red-50 text-red-600 border-red-100'
                                                    : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                                className="text-[10px] font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900 outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all ml-4"
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
                </div>
            )}

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={selectedProduct ? (data) => handleUpdateProduct(selectedProduct._id, data) : handleCreateProduct}
                product={selectedProduct}
            />
        </div>
    );
};

export default AdminDashboard;
