import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');
        if (tokenParam) {
            login(tokenParam);
            navigate('/dashboard');
        } else if (token) {
            navigate('/dashboard');
        }
    }, [location, login, navigate, token]);

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="max-w-md w-full space-y-8 p-10 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 backdrop-blur-xl bg-opacity-50">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <LogIn className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">
                        Course Registration
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to access your dashboard
                    </p>
                </div>
                <div className="mt-8">
                    <button
                        onClick={handleGoogleLogin}
                        className="group relative w-full flex justify-center py-3 px-4 border border-slate-700 text-sm font-medium rounded-xl text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out shadow-lg"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <img 
                                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                                className="h-5 w-5" 
                                alt="Google Logo" 
                            />
                        </span>
                        Continue with Google
                    </button>
                </div>
                <div className="pt-6 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                        Secure JWT Authentication
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
