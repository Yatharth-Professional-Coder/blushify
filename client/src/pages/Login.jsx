import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [loginMode, setLoginMode] = useState('customer'); // 'customer' or 'admin'
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ name: data.name, userId: data.userId, role: data.role }));

            if (loginMode === 'admin' && data.role !== 'admin') {
                setError('This account does not have administrator privileges.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return;
            }

            navigate(data.role === 'admin' ? '/admin' : '/');
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 shadow-sm rounded-xl">
                {/* Mode Switcher Tabs */}
                <div className="flex border-b border-gray-100 dark:border-gray-700 mb-8">
                    <button
                        onClick={() => { setLoginMode('customer'); setError(''); }}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${loginMode === 'customer'
                            ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                            : 'text-gray-400 hover:text-black dark:hover:text-white'
                            }`}
                    >
                        Customer
                    </button>
                    <button
                        onClick={() => { setLoginMode('admin'); setError(''); }}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${loginMode === 'admin'
                            ? 'border-b-2 border-red-600 text-red-600'
                            : 'text-gray-400 hover:text-red-600'
                            }`}
                    >
                        Admin
                    </button>
                </div>

                <div>
                    <h2 className={`mt-6 text-center text-3xl font-bold uppercase tracking-widest transition-colors ${loginMode === 'admin' ? 'text-red-600' : 'text-gray-900 dark:text-white'
                        }`}>
                        {loginMode === 'admin' ? 'Admin Portal' : 'Welcome Back'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        {loginMode === 'admin' ? 'Authorized access only' : 'Sign in to your account'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-xs p-4 text-center rounded-lg border border-red-100 dark:border-red-900/30 font-medium">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="text-[10px] font-bold uppercase text-gray-400 mb-1 block ml-1 tracking-widest">Email Address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-all"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-[10px] font-bold uppercase text-gray-400 mb-1 block ml-1 tracking-widest">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white sm:text-sm transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-xs font-bold uppercase tracking-[0.2em] text-white rounded-lg transition-all shadow-lg ${loginMode === 'admin'
                                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                                : 'bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-black/10'
                                }`}
                        >
                            {loginMode === 'admin' ? 'Authorize Login' : 'Sign in'}
                        </button>
                    </div>
                </form>

                {loginMode === 'customer' && (
                    <div className="text-center text-xs pt-4">
                        <p className="text-gray-500 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-black dark:text-white hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
