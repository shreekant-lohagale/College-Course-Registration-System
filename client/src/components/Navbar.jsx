import React from 'react';
import { BookOpen, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onSettingsClick }) => {
  const { logout } = useAuth();

  return (
    <nav className="glass-navbar px-6 py-4 flex justify-between items-center shadow-2xl">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/30">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-gradient uppercase">
          CCRS <span className="text-slate-500 font-medium">Portal</span>
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-bold text-blue-400 hover:text-white transition-colors flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </a>
          <button 
            onClick={onSettingsClick}
            className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
        <div className="h-6 w-px bg-slate-800 hidden md:block"></div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-950/20 hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-lg transition-all border border-red-900/30 hover:border-red-500/50 group"
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
