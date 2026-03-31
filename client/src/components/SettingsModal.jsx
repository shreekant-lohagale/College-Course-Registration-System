import React from 'react';
import { X, User, Mail, Shield, BadgeCheck, LogOut, Settings as SettingsIcon } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, user, logout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="glass-card w-full max-w-md rounded-[2.5rem] relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300 border-white/5">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-xl shadow-black/20">
                <SettingsIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Account Settings</h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Portal Preferences</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="h-10 w-10 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* User Info */}
            <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800/50">
               <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-1">
                     <div className="h-full w-full rounded-xl bg-slate-950 flex items-center justify-center">
                        <User className="h-8 w-8 text-white" />
                     </div>
                  </div>
                  <div>
                     <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-white">{user?.displayName}</h4>
                        <BadgeCheck className="h-4 w-4 text-emerald-400 fill-emerald-400/10" />
                     </div>
                     <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                        <Shield className="h-3 w-3" /> Standard Student Acc.
                     </p>
                  </div>
               </div>

               <div className="space-y-3 pt-4 border-t border-slate-800/50">
                  <div className="flex items-center justify-between text-xs font-bold">
                     <span className="text-slate-600 uppercase tracking-widest">Email Address</span>
                     <span className="text-slate-400">{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                     <span className="text-slate-600 uppercase tracking-widest">User ID</span>
                     <span className="text-indigo-400/50 font-mono">{user?.id?.slice(0, 12)}...</span>
                  </div>
               </div>
            </div>

            {/* Logout button in settings for convenience */}
            <button
               onClick={() => { logout(); onClose(); }}
               className="w-full py-4 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 active:scale-95 border border-red-500/20"
            >
               <LogOut className="h-4 w-4" /> Sign Out from This Device
            </button>
          </div>

          <p className="text-center mt-12 text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">
             System Version 4.0.1 (Stable)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
