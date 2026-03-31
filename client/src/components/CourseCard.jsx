import React from 'react';
import { BookOpen, MapPin, Layers, Hash } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="glass-card p-6 rounded-3xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <BookOpen className="h-20 w-20" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-900/30 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full border border-blue-900/50 uppercase tracking-widest">
          {course.course_id}
        </span>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950/50 rounded-full border border-slate-800">
          <Layers className="h-3 w-3 text-slate-500" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Semester {course.semester}</span>
        </div>
      </div>

      <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-1 leading-tight tracking-tight">
        {course.course_name}
      </h4>

      <div className="flex items-center gap-2 mb-6 group-hover:translate-x-1 transition-transform">
        <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
          <UserIcon className="h-3 w-3 text-blue-500" />
        </div>
        <p className="text-slate-400 text-xs font-semibold">{course.faculty}</p>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-slate-800/50">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Credits Units</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-blue-500">{course.credits}</span>
            <div className="h-4 w-1 bg-blue-600 rounded-full opacity-50"></div>
          </div>
        </div>
        <button className="h-10 w-10 flex items-center justify-center bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-2xl transition-all border border-blue-900/50 active:scale-90">
             <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// Internal import helper since I can't easily export multiple from here
import { User as UserIcon, Plus } from 'lucide-react';

export default CourseCard;
