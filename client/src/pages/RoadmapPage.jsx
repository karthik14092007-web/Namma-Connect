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
import { useToast } from '../context/ToastContext';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function RoadmapPage({ setCurrentView }) {
  const { activeFounder, roadmapTasks, toggleRoadmapTask } = useFounder();
  const { addToast } = useToast();
  const [activeWeekFilter, setActiveWeekFilter] = useState('all'); // 'all', 1, 2, 3, 4

  const weeks = [
    {
      num: 1,
      theme: 'FIX BRAND POSITIONING',
      goal: 'Define target customer, improve value proposition, and refine brand messaging.'
    },
    {
      num: 2,
      theme: 'BUILD MARKETING ENGINE',
      goal: 'Create content pillars, launch targeted campaign, and improve product creatives.'
    },
    {
      num: 3,
      theme: 'IMPROVE CUSTOMER ACQUISITION',
      goal: 'Test two audiences, improve product page, and launch referral campaign.'
    },
    {
      num: 4,
      theme: 'PREPARE FOR SCALE',
      goal: 'Track CAC, track conversion rate, and prepare investor metrics.'
    }
  ];

  const totalTasks = roadmapTasks.length || 12;
  const completedTasks = roadmapTasks.filter((t) => t.status === 'Completed').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleTaskToggle = (task) => {
    toggleRoadmapTask(task.id);
    if (task.status !== 'Completed') {
      addToast(`🎉 Task completed: "${task.title}"`);
    }
  };

  const handleActionClick = (task) => {
    if (task.dimension?.toLowerCase().includes('marketing')) {
      setCurrentView('marketing');
    } else if (task.dimension?.toLowerCase().includes('funding')) {
      setCurrentView('funding');
    } else if (task.actionLabel?.toLowerCase().includes('mentor')) {
      setCurrentView('mentors');
    } else {
      handleTaskToggle(task);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <Badge variant="brand" size="md" className="mb-1.5">
            Action Roadmap (What should I do next?)
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your 30-Day Growth Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Structured 4-week sprint prioritized to eliminate growth bottlenecks for <strong className="text-slate-800">{activeFounder.brandName}</strong>.
          </p>
        </div>

        {/* Plan Completion Widget */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 self-start md:self-auto min-w-[230px]">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center font-black text-brand-700 text-base font-sans shrink-0">
            {progressPercent}%
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Plan Progress
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {completedTasks} of {totalTasks} tasks completed
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- Week Filter Tabs ---------------- */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveWeekFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeWeekFilter === w.num
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Week {w.num}: {w.theme}
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
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-brand-600 text-white font-black text-xs flex items-center justify-center font-sans">
                        W{week.num}
                      </span>
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                        Week {week.num} — {week.theme}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {week.goal}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-slate-600">
                      {weekDone} / {weekTasks.length} Done
                    </span>
                    <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${weekPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Task Checklist Items */}
                <div className="divide-y divide-slate-100 p-2 sm:p-4 space-y-2">
                  {weekTasks.map((task) => {
                    const isDone = task.status === 'Completed';

                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isDone
                            ? 'bg-slate-50/60 border-slate-200/60 opacity-80'
                            : 'bg-white border-slate-200/80 hover:border-brand-300 hover:shadow-2xs'
                        }`}
                      >
                        {/* Task Information & Completion Checkbox */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <button
                            type="button"
                            onClick={() => handleTaskToggle(task)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 mt-0.5 cursor-pointer ${
                              isDone
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-brand-500 bg-white'
                            }`}
                            title={isDone ? 'Mark as Pending' : 'Mark as Completed'}
                          >
                            {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>

                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`text-xs sm:text-sm font-bold ${
                                  isDone ? 'line-through text-slate-400' : 'text-slate-900'
                                }`}
                              >
                                {task.title}
                              </h3>

                              <Badge
                                variant={task.priority === 'High' ? 'rose' : 'neutral'}
                                size="sm"
                              >
                                {task.priority} Priority
                              </Badge>

                              <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.estimatedEffort}
                              </span>

                              <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200/60">
                                {task.dimension}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {task.description}
                            </p>
                          </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="shrink-0 self-end sm:self-center">
                          <Button
                            variant={isDone ? 'outline' : 'secondary'}
                            size="sm"
                            onClick={() => handleActionClick(task)}
                            icon={ArrowRight}
                            iconPosition="right"
                          >
                            {task.actionLabel || 'View Task'}
                          </Button>
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
