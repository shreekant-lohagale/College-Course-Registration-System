import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { BookOpen, LogOut, User as UserIcon, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
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

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Course Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-slate-300">Authenticated</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 rounded-lg transition-all duration-200 border border-slate-700 hover:border-red-900/50 group"
          >
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold mb-2 tracking-tight">Welcome Back!</h2>
            <p className="text-slate-400 flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              User ID: <span className="font-mono text-blue-400 bg-blue-900/20 px-2 rounded">{user?.id}</span>
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5" />
            Enroll in New Course
          </button>
        </header>

        {/* Course Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold border-l-4 border-blue-600 pl-4">Your Courses</h3>
            <span className="bg-slate-800 text-slate-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-700 uppercase tracking-widest">
              Total: {courses.length}
            </span>
          </div>

          {fetching ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-slate-500 font-medium">Fetching registered courses...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <BookOpen className="h-20 w-20" />
                   </div>
                   <div className="flex justify-between items-start mb-4">
                     <span className="bg-blue-900/30 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-900/50 uppercase">
                       {course.course_id}
                     </span>
                     <span className="text-slate-500 text-xs font-semibold">Sem {course.semester}</span>
                   </div>
                   <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">{course.course_name}</h4>
                   <p className="text-slate-400 text-sm mb-4">Instructor: {course.faculty}</p>
                   <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                     <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Credits</span>
                     <span className="text-2xl font-black text-blue-500">{course.credits}</span>
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
              <BookOpen className="mx-auto h-16 w-16 text-slate-700 mb-6" />
              <h4 className="text-xl font-bold mb-2 text-slate-300">No courses registered yet</h4>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Start your academic journey by enrolling in your first course.</p>
              <button className="text-blue-500 hover:text-blue-400 font-bold flex items-center gap-2 mx-auto transition-colors group">
                Browse available courses 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
