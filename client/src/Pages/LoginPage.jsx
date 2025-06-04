import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { toast, Toaster } from "react-hot-toast";

const SERVERURL = 'https://smallgpt-6oon.onrender.com/';

const LoginPage = () => {
    const [email, setEmail] = useState('test123@mail.com');
    const [password, setPassword] = useState('test123@mail.com');
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const saveCookies = () => {
        Cookies.set('user', userDetails.user._id);
    };

    const saveToken = () => {
        Cookies.set('token', userDetails.token);
        dispatch(login(userDetails.user._id));
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(SERVERURL + 'login', { email, password });
            setUserDetails(response.data);
            toast.success('Login successful! Redirecting...');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userDetails) {
            saveCookies();
            saveToken();
            dispatch(login(userDetails.token));
        }
    }, [userDetails]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <Toaster 
                position="top-center"
                toastOptions={{
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
            
            {isLoading ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Authenticating...</p>
                </div>
            ) : (
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-center">
                            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                            <p className="text-cyan-100 mt-1">Sign in to your account</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    Sign In
                                </button>
                            </div>
                            
                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a 
                                    href="/register" 
                                    className="text-cyan-600 hover:text-cyan-700 font-medium hover:underline"
                                >
                                    Sign up
                                </a>
                            </div>
                        </form>
                    </div>
                    
                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>By signing in, you agree to our Terms and Privacy Policy</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;