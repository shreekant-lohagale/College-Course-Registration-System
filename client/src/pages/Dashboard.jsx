import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  BookOpen, 
  User as UserIcon, 
  Plus, 
  LayoutGrid, 
  List, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  GraduationCap, 
  Activity, 
  ChevronRight,
  TrendingUp,
  Loader2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import AddCourseModal from '../components/AddCourseModal';
import InsuranceTable from '../components/InsuranceTable';
import SettingsModal from '../components/SettingsModal';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [insuranceRecords, setInsuranceRecords] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    setFetching(true);
    try {
      const [coursesRes, insuranceRes] = await Promise.all([
        axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:5000/api/insurance', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      setCourses(coursesRes.data);
      setInsuranceRecords(insuranceRes.data);
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setFetching(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Remove this course from your registration?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.filter(c => c._id !== id));
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  const handleDeleteInsurance = async (id) => {
    if (!window.confirm("Remove this insurance record?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/insurance/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsuranceRecords(insuranceRecords.filter(r => r._id !== id));
    } catch (err) {
      alert("Failed to delete record");
    }
  };

  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-blue-500/30">
      <Navbar onSettingsClick={() => setIsSettingsOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* ... existing header and main content ... */}
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 px-2">
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-500 fill-blue-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Command Center</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              Hello, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{user?.displayName?.split(' ')[0] || 'Explorer'}.</span>
            </h2>
            <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-2xl border border-slate-800/50 w-fit">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center border-2 border-indigo-400/30">
                 <UserIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Authenticated ID</span>
                <span className="text-xs font-mono text-indigo-300">{user?.id?.slice(0, 8)}...</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
             <div className="glass-card p-6 rounded-[2rem] min-w-[160px] flex flex-col items-center justify-center text-center group hover:border-blue-500/50 transition-all">
                <TrendingUp className="h-4 w-4 text-blue-500 mb-2 opacity-50" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Credits</span>
                <span className="text-4xl font-black text-blue-500 group-hover:scale-110 transition-transform">{totalCredits}</span>
             </div>
             <div className="glass-card p-6 rounded-[2rem] min-w-[160px] flex flex-col items-center justify-center text-center border-indigo-500/20 group hover:border-indigo-500/50 transition-all">
                <Activity className="h-4 w-4 text-indigo-500 mb-2 opacity-50" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Data Points</span>
                <span className="text-4xl font-black text-indigo-500 group-hover:scale-110 transition-transform">{courses.length + insuranceRecords.length}</span>
             </div>
             <button 
                onClick={() => activeTab === 'courses' ? setIsModalOpen(true) : setActiveTab('courses')}
                className="col-span-2 lg:h-full px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] flex flex-col items-center justify-center shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 group overflow-hidden relative"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Plus className="h-8 w-8 mb-2 group-hover:rotate-90 transition-transform duration-500 relative z-10" />
                <span className="text-[10px] font-black uppercase tracking-widest relative z-10">Add Entry</span>
             </button>
          </div>
        </div>

        {/* Tab Switcher & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-slate-800/50 gap-6">
           <div className="flex items-center gap-1 p-1.5 bg-slate-900/50 rounded-2xl border border-slate-800/50 backdrop-blur-xl">
              <button 
                onClick={() => setActiveTab('courses')}
                className={`flex items-center gap-2 px-6 py-3 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all ${activeTab === 'courses' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <GraduationCap className="h-4 w-4" />
                Academic Courses
              </button>
              <button 
                onClick={() => setActiveTab('insurance')}
                className={`flex items-center gap-2 px-6 py-3 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all ${activeTab === 'insurance' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <ShieldCheck className="h-4 w-4" />
                Insurance Model
              </button>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex items-center shadow-inner">
                <button className="p-2 bg-slate-800 rounded-lg text-blue-400 shadow-sm">
                   <LayoutGrid className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-500 hover:text-white transition-colors">
                   <List className="h-4 w-4" />
                </button>
              </div>
              <button className="p-3 bg-slate-900 text-slate-500 rounded-xl hover:text-blue-500 transition-colors border border-slate-800 active:scale-90">
                 <Filter className="h-4 w-4" />
              </button>
           </div>
        </div>

        {/* Content Area */}
        <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          {fetching ? (
            <div className="flex flex-col items-center justify-center py-48 glass-card rounded-[4rem] border-dashed relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/5 animate-pulse"></div>
              <div className="relative">
                <div className="h-20 w-20 bg-blue-600/20 rounded-full animate-ping absolute top-0 left-0"></div>
                <div className="h-20 w-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10 rotate-12">
                   <Loader2 className="h-10 w-10 text-white animate-spin" />
                </div>
              </div>
              <h3 className="mt-10 text-xl font-black text-white tracking-widest uppercase">Synchronizing</h3>
              <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-2">Connecting to Data Node...</p>
            </div>
          ) : activeTab === 'courses' ? (
            courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <CourseCard 
                    key={course._id} 
                    course={course} 
                    onCourseDeleted={handleDeleteCourse} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 glass-card rounded-[4rem] border-dashed border-2 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent"></div>
                <BookOpen className="mx-auto h-24 w-24 text-slate-800 mb-8 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-700" />
                <h4 className="text-3xl font-black mb-3">Your Journey Starts here.</h4>
                <p className="text-slate-500 mb-10 max-w-sm mx-auto font-bold text-sm tracking-tight leading-relaxed">
                  Unlock your academic future by registering for your first course today.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all hover:scale-110 active:scale-95"
                >
                  Take the First Step →
                </button>
              </div>
            )
          ) : (
            <InsuranceTable 
              records={insuranceRecords}
              onRecordAdded={(record) => setInsuranceRecords([record, ...insuranceRecords])}
              onRecordDeleted={handleDeleteInsurance}
              token={token}
            />
          )}
        </section>

        {/* Footer Accent */}
        <div className="mt-32 pb-12 flex items-center justify-center opacity-10 hover:opacity-40 transition-opacity cursor-default">
           <div className="h-px w-20 bg-gradient-to-r from-transparent to-slate-500"></div>
           <Sparkles className="h-6 w-6 mx-8 text-slate-500" />
           <div className="h-px w-20 bg-gradient-to-l from-transparent to-slate-500"></div>
        </div>
      </main>

      {/* Modals */}
      <AddCourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        token={token}
        onCourseAdded={(newCourse) => setCourses([newCourse, ...courses])}
      />
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        logout={logout}
      />
    </div>
  );
};

export default Dashboard;
