import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        salePrice: '',
        category: 'Skin Care',
        images: [''],
        inStock: true,
        isDailyDeal: false
    });

    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                price: product.price.toString(),
                salePrice: product.salePrice ? product.salePrice.toString() : '',
                images: product.images && product.images.length > 0 ? product.images : ['']
            });
        } else {
            setFormData({
                title: '',
                description: '',
                price: '',
                salePrice: '',
                category: 'Skin Care',
                images: [''],
                inStock: true,
                isDailyDeal: false
            });
        }
    }, [product, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const removeImageField = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, images: newImages.length > 0 ? newImages : [''] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            price: Number(formData.price),
            salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
            images: formData.images.filter(img => img.trim() !== '')
        };
        onSave(dataToSave);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-colors duration-300">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900 dark:text-white">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <FaTimes className="text-gray-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block tracking-widest">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block tracking-widest">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block tracking-widest">Sale Price (₹) - Optional</label>
                            <input
                                type="number"
                                name="salePrice"
                                step="0.01"
                                value={formData.salePrice}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block tracking-widest">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            >
                                <option value="Skin Care">Skin Care</option>
                                <option value="Makeup">Makeup</option>
                                <option value="Lips">Lips</option>
                                <option value="Eyes">Eyes</option>
                                <option value="Bridal">Bridal</option>
                                <option value="Face">Face</option>
                            </select>
                        </div>

                        <div className="flex gap-6 items-end h-full pt-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    checked={formData.inStock}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <span className="text-xs font-bold uppercase text-gray-500 group-hover:text-black">In Stock</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="isDailyDeal"
                                    checked={formData.isDailyDeal}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                                />
                                <span className="text-xs font-bold uppercase text-gray-500 group-hover:text-yellow-600">Daily Deal</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold uppercase text-gray-400 mb-1 block tracking-widest">Description</label>
                        <textarea
                            name="description"
                            required
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your product..."
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Image URLs</label>
                            <button
                                type="button"
                                onClick={addImageField}
                                className="text-[10px] font-bold uppercase text-blue-600 hover:underline flex items-center gap-1"
                            >
                                <FaPlus size={8} /> Add Image
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.images.map((url, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="url"
                                        required
                                        value={url}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-white bg-black dark:bg-white dark:text-black hover:opacity-90 rounded-xl transition-all shadow-lg"
                        >
                            {product ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
