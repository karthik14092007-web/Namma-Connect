import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Circle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useFounder } from '../context/FounderContext';

export default function RoadmapPage({ setCurrentView }) {
  const { activeFounder, roadmapTasks, toggleRoadmapTask } = useFounder();
  const [activeWeekFilter, setActiveWeekFilter] = useState('all'); // 'all', 1, 2, 3, 4

  const weeks = [
    { num: 1, title: 'Week 1: Fix Brand Positioning', goal: 'Define customer persona, rewrite value proposition, and audit packaging.' },
    { num: 2, title: 'Week 2: Build Marketing Engine', goal: 'Establish 3 content pillars, run first targeted test ad, and setup re-order automation.' },
    { num: 3, title: 'Week 3: Increase Customer Acquisition', goal: 'Test 2 distinct audiences, launch referral perk, and streamline mobile checkout.' },
    { num: 4, title: 'Week 4: Prepare for Scale & Funding', goal: 'Lock in unit economics, assemble grant dossiers, and review strategy with mentor.' }
  ];

  const totalTasks = roadmapTasks.length;
  const completedTasks = roadmapTasks.filter((t) => t.status === 'Completed').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = activeWeekFilter === 'all'
    ? roadmapTasks
    : roadmapTasks.filter((t) => t.week === Number(activeWeekFilter));

  const handleActionClick = (task) => {
    if (task.dimension === 'Marketing') {
      setCurrentView('marketing');
    } else if (task.dimension === 'Funding Readiness') {
      setCurrentView('funding');
    } else if (task.actionLabel?.toLowerCase().includes('mentor')) {
      setCurrentView('mentors');
    } else {
      // Toggle task status
      toggleRoadmapTask(task.id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
            Action Operating System (What Should I Do?)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Your 30-Day Growth Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A step-by-step sprint customized for <strong className="text-slate-800">{activeFounder.brandName}</strong> to fix top growth gaps.
          </p>
        </div>

        {/* Plan Completion Widget */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 self-start md:self-auto min-w-[220px]">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center font-extrabold text-brand-700 text-base font-sans">
            {progressPercent}%
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Plan Completion
            </span>
            <span className="text-xs font-bold text-slate-900">
              {completedTasks} of {totalTasks} Tasks Done
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- Week Filter Tabs ---------------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveWeekFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeWeekFilter === 'all'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All 4 Weeks
        </button>
        {weeks.map((w) => (
          <button
            key={w.num}
            onClick={() => setActiveWeekFilter(w.num)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeWeekFilter === w.num
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Week {w.num}
          </button>
        ))}
      </div>

      {/* ---------------- 4 Weeks Timeline Section ---------------- */}
      <div className="space-y-8">
        {weeks
          .filter((w) => activeWeekFilter === 'all' || activeWeekFilter === w.num)
          .map((week) => {
            const weekTasks = roadmapTasks.filter((t) => t.week === week.num);
            const weekDone = weekTasks.filter((t) => t.status === 'Completed').length;
            const weekPercent = weekTasks.length > 0 ? Math.round((weekDone / weekTasks.length) * 100) : 0;

            return (
              <div
                key={week.num}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden"
              >
                {/* Week Header */}
                <div className="bg-slate-50/80 p-5 sm:px-6 border-b border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center font-sans">
                        {week.num}
                      </span>
                      <h2 className="text-base font-bold text-slate-900">
                        {week.title}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {week.goal}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">
                      {weekDone} / {weekTasks.length} Completed
                    </span>
                    <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${weekPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Task Checklist Cards */}
                <div className="divide-y divide-slate-100 p-2 sm:p-4 space-y-2">
                  {weekTasks.map((task) => {
                    const isDone = task.status === 'Completed';

                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isDone
                            ? 'bg-slate-50/70 border-slate-200/60 opacity-80'
                            : 'bg-white border-slate-200/80 hover:border-brand-300 hover:shadow-xs'
                        }`}
                      >
                        {/* Task info with toggle button */}
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            type="button"
                            onClick={() => toggleRoadmapTask(task.id)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 mt-0.5 cursor-pointer ${
                              isDone
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-brand-500 bg-white'
                            }`}
                            title={isDone ? 'Mark as Pending' : 'Mark as Completed'}
                          >
                            {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`text-sm font-bold ${
                                  isDone ? 'line-through text-slate-400' : 'text-slate-900'
                                }`}
                              >
                                {task.title}
                              </h3>

                              {/* Priority badge */}
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  task.priority === 'High'
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                                }`}
                              >
                                {task.priority} Priority
                              </span>

                              {/* Effort Tag */}
                              <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.estimatedEffort}
                              </span>

                              {/* Dimension Tag */}
                              <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">
                                {task.dimension}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {task.description}
                            </p>
                          </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleActionClick(task)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isDone
                                ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
                            }`}
                          >
                            <span>{task.actionLabel || 'View Task'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
