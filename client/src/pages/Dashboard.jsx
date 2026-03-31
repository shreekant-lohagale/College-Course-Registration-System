import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { BookOpen, User as UserIcon, Plus, LayoutGrid, List, Sparkles, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses', err);
      } finally {
        setFetching(false);
      }
    };

    if (token) {
      fetchCourses();
    }
  }, [token]);

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-500 fill-blue-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Student Portal</span>
            </div>
            <h2 className="text-5xl font-black tracking-tight text-white leading-tight">
              Control <br /><span className="text-blue-500 italic">Center.</span>
            </h2>
            <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-2xl border border-slate-800/50 w-fit">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center border-2 border-indigo-400/30">
                 <UserIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Authenticated ID</span>
                <span className="text-xs font-mono text-indigo-300">{user?.id}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:flex items-center gap-4">
             <div className="glass-card p-6 rounded-[2rem] min-w-[140px] flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Credits</span>
                <span className="text-4xl font-black text-blue-500">{totalCredits}</span>
             </div>
             <div className="glass-card p-6 rounded-[2rem] min-w-[140px] flex flex-col items-center justify-center text-center border-indigo-500/20">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">My Courses</span>
                <span className="text-4xl font-black text-indigo-500">{courses.length}</span>
             </div>
             <button className="col-span-2 lg:h-full px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] flex flex-col items-center justify-center shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 group">
                <Plus className="h-8 w-8 mb-2 group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Enroll New</span>
             </button>
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-800/50">
           <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm font-bold text-white border-b-2 border-blue-600 pb-2 transition-all">
                Active Courses
              </button>
              <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white pb-2 transition-all">
                History
              </button>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex items-center">
                <button className="p-2 bg-slate-800 rounded-lg text-blue-400">
                   <LayoutGrid className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                   <List className="h-4 w-4" />
                </button>
              </div>
              <button className="p-3 bg-slate-900 text-slate-500 rounded-xl hover:text-blue-500 transition-colors border border-slate-800">
                 <Filter className="h-4 w-4" />
              </button>
           </div>
        </div>

        {/* Content Area */}
        <section>
          {fetching ? (
            <div className="flex flex-col items-center justify-center py-32 glass-card rounded-[3rem] border-dashed">
              <div className="relative">
                <div className="h-16 w-16 bg-blue-600/20 rounded-full animate-ping absolute top-0 left-0"></div>
                <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg relative z-10">
                   <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <p className="mt-8 text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Records...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 glass-card rounded-[3rem] border-dashed border-2 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent"></div>
              <BookOpen className="mx-auto h-24 w-24 text-slate-800 mb-8 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-700" />
              <h4 className="text-3xl font-black mb-3">Your Journey Starts here.</h4>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto font-bold text-sm tracking-tight leading-relaxed">
                Unlock your academic future by registering for your first course today.
              </p>
              <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all hover:scale-110 active:scale-95">
                Take the First Step →
              </button>
            </div>
          )}
        </section>

        {/* Footer Accent */}
        <div className="mt-32 pb-12 flex items-center justify-center opacity-20 hover:opacity-50 transition-opacity">
           <div className="h-px w-20 bg-gradient-to-r from-transparent to-slate-500"></div>
           <BookOpen className="h-6 w-6 mx-8 text-slate-500" />
           <div className="h-px w-20 bg-gradient-to-l from-transparent to-slate-500"></div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
