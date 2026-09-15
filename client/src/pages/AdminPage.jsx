import React, { useState, useEffect } from 'react';
import {
  Users,
  Building,
  Handshake,
  Coins,
  ShoppingBag,
  Megaphone,
  TrendingUp,
  BarChart3,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminPage() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/metrics')
      .then((res) => res.json())
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load admin metrics:', err);
        setLoading(false);
      });
  }, []);

  const metrics = adminData?.metrics || {
    totalFounders: 143,
    activeBrands: 119,
    mentorConnections: 90,
    fundingMatches: 64,
    productsListed: 48,
    campaignsLaunched: 87
  };

  const founderGrowth = adminData?.charts?.founderGrowth || [
    { month: 'Apr', founders: 24, brands: 18 },
    { month: 'May', founders: 42, brands: 35 },
    { month: 'Jun', founders: 68, brands: 58 },
    { month: 'Jul', founders: 95, brands: 80 },
    { month: 'Aug', founders: 122, brands: 104 },
    { month: 'Sep', founders: 148, brands: 124 }
  ];

  const marketplaceActivity = adminData?.charts?.marketplaceActivity || [
    { category: 'Food & Bev', orders: 420, revenue: 125000 },
    { category: 'Handcrafted', orders: 210, revenue: 84000 },
    { category: 'Fashion', orders: 165, revenue: 98000 },
    { category: 'Home & Life', orders: 130, revenue: 52000 },
    { category: 'Agriculture', orders: 95, revenue: 41000 }
  ];

  const fundingApplications = adminData?.charts?.fundingApplications || [
    { scheme: 'Stand-Up India', applicants: 45, approved: 18 },
    { scheme: 'SISFS Grants', applicants: 38, approved: 12 },
    { scheme: 'EDII TN Vouchers', applicants: 29, approved: 21 },
    { scheme: 'Mudra Loans', applicants: 52, approved: 34 }
  ];

  const COLORS = ['#0f766e', '#14b8a6', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
          Ecosystem Observatory
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Namma-Connect Platform Admin & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          System health, founder onboarding velocity, and regional economic impact.
        </p>
      </div>

      {/* ---------------- 6 Core Platform Metrics ---------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Founders', val: metrics.totalFounders, icon: Users, color: 'text-brand-600 bg-brand-50' },
          { label: 'Active Brands', val: metrics.activeBrands, icon: Building, color: 'text-teal-600 bg-teal-50' },
          { label: 'Mentor Sessions', val: metrics.mentorConnections, icon: Handshake, color: 'text-amber-600 bg-amber-50' },
          { label: 'Funding Matches', val: metrics.fundingMatches, icon: Coins, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Products Listed', val: metrics.productsListed, icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
          { label: 'Campaigns', val: metrics.campaignsLaunched, icon: Megaphone, color: 'text-purple-600 bg-purple-50' }
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {m.label}
                </span>
                <div className={`p-1.5 rounded-lg ${m.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 font-sans tracking-tight">
                {m.val}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- Charts Grid ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Founder Growth Trajectory */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Founder & Brand Onboarding</h3>
              <p className="text-xs text-slate-500">Monthly new registrations</p>
            </div>
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              +38% MoM
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={founderGrowth}>
                <defs>
                  <linearGradient id="adminFounders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0f766e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="founders"
                  name="Founders"
                  stroke="#0f766e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#adminFounders)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Marketplace Category Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Marketplace Activity by Category</h3>
              <p className="text-xs text-slate-500">Total orders processed</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ₹4.0L Volume
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketplaceActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="orders" name="Orders" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funding Applications by Scheme */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4 lg:col-span-2">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Funding Schemes: Applicants vs Approved
              </h3>
              <p className="text-xs text-slate-500">
                Tracking capital disbursement success rates
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Overall Approval Rate: 51.5%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fundingApplications}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="scheme" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="applicants" name="Applicants" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
