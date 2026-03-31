import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function DashboardPage() {
  const { aiTools, prompts, categories } = useApp();

  // Sort tools by view count
  const topViewedTools = useMemo(() => {
    return [...aiTools]
      .sort((a, b) => ((b.view_count || 0) - (a.view_count || 0)))
      .slice(0, 10)
      .map(t => ({
        name: t.name,
        views: t.view_count || 0
      }));
  }, [aiTools]);

  // Sort prompts by copy count
  const topCopiedPrompts = useMemo(() => {
    return [...prompts]
      .sort((a, b) => ((b.copy_count || 0) - (a.copy_count || 0)))
      .slice(0, 10)
      .map(p => ({
        name: p.title.substring(0, 20) + (p.title.length > 20 ? '...' : ''),
        copies: p.copy_count || 0
      }));
  }, [prompts]);

  // Aggregate views by category
  const categoryViews = useMemo(() => {
    const counts: Record<string, number> = {};
    aiTools.forEach(tool => {
      const cat = categories?.find(c => c.id === tool.category) || tool.category;
      const catName = typeof cat === 'string' ? cat : cat?.name;
      counts[catName] = (counts[catName] || 0) + (tool.view_count || 0);
    });
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    })).filter(c => c.value > 0).sort((a, b) => b.value - a.value);
  }, [aiTools, categories]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-[#0C2F53] dark:text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">

        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-slate-100 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-black flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-[#FFF200]" />
                Analytics Dashboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                ติดตามประสิทธิภาพและจำนวนผู้เข้าชม AI และ Prompts
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="จำนวน AI Tools ทั้งหมด"
            value={aiTools.length}
            icon={<Activity className="w-6 h-6 text-blue-500" />}
          />
          <StatCard
            title="ยอดเข้าชมทั้งหมด"
            value={aiTools.reduce((acc, curr) => acc + (curr.view_count || 0), 0)}
            icon={<BarChart3 className="w-6 h-6 text-green-500" />}
          />
          <StatCard
            title="จำนวน Prompts ทั้งหมด"
            value={prompts.length}
            icon={<Activity className="w-6 h-6 text-orange-500" />}
          />
          <StatCard
            title="ยอดคัดลอกทั้งหมด"
            value={prompts.reduce((acc, curr) => acc + (curr.copy_count || 0), 0)}
            icon={<BarChart3 className="w-6 h-6 text-purple-500" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="10 อันดับ AI Tools ที่มีผู้เข้าชมมากที่สุด">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topViewedTools} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                <YAxis stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Legend />
                <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} name="ยอดเข้าชม" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="10 อันดับ Prompts ที่ถูกคัดลอกมากที่สุด">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCopiedPrompts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                <YAxis stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Legend />
                <Bar dataKey="copies" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="ยอดคัดลอก" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="สัดส่วนการเข้าชม AI Tools ตามหมวดหมู่">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryViews}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryViews.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="กราฟแสดงพื้นที่การเข้าชม AI Tools">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={topViewedTools.slice(0, 7)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <Tooltip contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Area type="monotone" dataKey="views" stroke="#10b981" fillOpacity={1} fill="url(#colorViews)" name="ยอดเข้าชม" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 dark:text-white">{value}</h3>
      </div>
      <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-full">
        {icon}
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
        <PieChartIcon className="w-5 h-5 text-[#FFF200]" />
        {title}
      </h3>
      {children}
    </div>
  );
}
