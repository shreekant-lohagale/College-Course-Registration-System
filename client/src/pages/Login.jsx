import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, GraduationCap, ChevronRight } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full"></div>
            
            <div className="max-w-md w-full z-10">
                <div className="glass-card p-10 rounded-[2.5rem] relative group border-white/5">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-600/40 border-4 border-slate-950 group-hover:scale-110 transition-transform duration-500">
                        <GraduationCap className="h-10 w-10 text-white" />
                    </div>

                    <div className="text-center pt-8 mb-10">
                        <h2 className="text-4xl font-black tracking-tighter text-white mb-3">
                            CCRS<span className="text-blue-500">.</span>
                        </h2>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-relaxed">
                            College Course <br /> Registration System
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="group relative w-full flex items-center justify-between py-4 px-6 border border-slate-700/50 text-sm font-bold rounded-2xl text-white bg-slate-800/40 hover:bg-slate-800 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-xl overflow-hidden active:scale-95"
                        >
                            <span className="flex items-center gap-4">
                                <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:rotate-12 transition-transform">
                                    <img 
                                        src="https://www.svgrepo.com/show/475656/google-color.svg" 
                                        className="h-5 w-5" 
                                        alt="Google Logo" 
                                    />
                                </div>
                                <span className="text-base">Login with Google</span>
                            </span>
                            <ChevronRight className="h-5 w-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-800/50">
                        <div className="flex items-center justify-center gap-3 text-slate-500">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                                Secure OAuth 2.0 Encryption
                            </p>
                        </div>
                    </div>
                </div>
                
                <p className="text-center mt-8 text-slate-600 text-xs font-bold tracking-widest uppercase">
                    © 2026 Admin Panel • v2.0
                </p>
            </div>
        </div>
    );
};

export default Login;
