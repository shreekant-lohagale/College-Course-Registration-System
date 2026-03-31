import React, { useState } from 'react';
import { X, BookPlus, Loader2 } from 'lucide-react';
import axios from 'axios';

const AddCourseModal = ({ isOpen, onClose, onCourseAdded, token }) => {
  const [formData, setFormData] = useState({
    course_id: '',
    course_name: '',
    credits: '',
    faculty: '',
    semester: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/courses', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onCourseAdded(res.data);
      onClose();
      setFormData({ course_id: '', course_name: '', credits: '', faculty: '', semester: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add course. Check if Course ID is unique.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="glass-card w-full max-w-lg rounded-[2.5rem] relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <BookPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">Enroll New</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Course Registration</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Course ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS101"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                  value={formData.course_id}
                  onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Semester</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="1"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Course Name</label>
              <input
                type="text"
                required
                placeholder="Introduction to Programming"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                value={formData.course_name}
                onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Credits</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="3"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Faculty</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Smith"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirm Registration →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
