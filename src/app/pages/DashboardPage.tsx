import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ChevronLeft, BarChart3, Activity } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#f97316'];

export default function DashboardPage() {
  const { aiTools, prompts, categories } = useApp();

  // นับจำนวน AI Tools ต่อหมวดหมู่
  const toolsPerCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    aiTools.forEach(tool => {
      const cat = categories?.find(c => c.id === tool.category) || tool.category;
      const catName = typeof cat === 'string' ? cat : cat?.name;
      counts[catName] = (counts[catName] || 0) + 1;
    });
    return Object.keys(counts)
      .map(key => ({ name: key, count: counts[key] }))
      .sort((a, b) => b.count - a.count);
  }, [aiTools, categories]);

  // นับจำนวนครั้งที่เข้าชม AI Tool (view_count) รายเครื่องมือ
  const topViewedTools = useMemo(() => {
    return [...aiTools]
      .sort((a, b) => ((b.view_count || 0) - (a.view_count || 0)))
      .slice(0, 10)
      .map(t => ({
        name: t.name,
        views: t.view_count || 0
      }));
  }, [aiTools]);

  // นับจำนวนครั้งที่คัดลอก Prompt (copy_count) รายหัวข้อ
  const topCopiedPrompts = useMemo(() => {
    return [...prompts]
      .sort((a, b) => ((b.copy_count || 0) - (a.copy_count || 0)))
      .slice(0, 10)
      .map(p => ({
        name: p.title.substring(0, 20) + (p.title.length > 20 ? '...' : ''),
        copies: p.copy_count || 0
      }));
  }, [prompts]);

  // นับจำนวนครั้งที่เข้าชมรวมต่อหมวดหมู่
  const viewsPerCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    aiTools.forEach(tool => {
      const cat = categories?.find(c => c.id === tool.category) || tool.category;
      const catName = typeof cat === 'string' ? cat : cat?.name;
      counts[catName] = (counts[catName] || 0) + (tool.view_count || 0);
    });
    return Object.keys(counts)
      .map(key => ({ name: key, views: counts[key] }))
      .filter(c => c.views > 0)
      .sort((a, b) => b.views - a.views);
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
                ติดตามประสิทธิภาพและจำนวนครั้งการใช้งาน AI และ Prompts
              </p>
            </div>
          </div>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="จำนวน AI Tools ทั้งหมด"
            value={aiTools.length}
            unit="เครื่องมือ"
            icon={<Activity className="w-6 h-6 text-blue-500" />}
          />
          <StatCard
            title="ยอดเข้าชมทั้งหมด"
            value={aiTools.reduce((acc, curr) => acc + (curr.view_count || 0), 0)}
            unit="ครั้ง"
            icon={<BarChart3 className="w-6 h-6 text-green-500" />}
          />
          <StatCard
            title="จำนวน Prompts ทั้งหมด"
            value={prompts.length}
            unit="Prompt"
            icon={<Activity className="w-6 h-6 text-orange-500" />}
          />
          <StatCard
            title="ยอดคัดลอกทั้งหมด"
            value={prompts.reduce((acc, curr) => acc + (curr.copy_count || 0), 0)}
            unit="ครั้ง"
            icon={<BarChart3 className="w-6 h-6 text-purple-500" />}
          />
        </div>

        {/* Row 1: Top Views + Top Copies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="10 อันดับ AI Tools ที่มีผู้เข้าชมมากที่สุด (จำนวนครั้ง)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topViewedTools} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#8884d8" tick={{ fill: '#8884d8', fontSize: 11 }} />
                <YAxis stroke="#8884d8" tick={{ fill: '#8884d8' }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(99,102,241,0.08)' }} contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Legend />
                <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} name="จำนวนครั้งที่เข้าชม" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="10 อันดับ Prompts ที่ถูกคัดลอกมากที่สุด (จำนวนครั้ง)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCopiedPrompts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#8884d8" tick={{ fill: '#8884d8', fontSize: 11 }} />
                <YAxis stroke="#8884d8" tick={{ fill: '#8884d8' }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(139,92,246,0.08)' }} contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Legend />
                <Bar dataKey="copies" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="จำนวนครั้งที่คัดลอก" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Row 2: Count per Category + Views per Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="จำนวน AI Tools ต่อหมวดหมู่ (นับจำนวนเครื่องมือ)">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={toolsPerCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#8884d8" tick={{ fill: '#8884d8', fontSize: 11 }} />
                <YAxis stroke="#8884d8" tick={{ fill: '#8884d8' }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(16,185,129,0.08)' }} contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Legend />
                <Bar dataKey="count" name="จำนวน AI Tools" radius={[4, 4, 0, 0]}>
                  {toolsPerCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="จำนวนครั้งที่เข้าชม AI Tools ต่อหมวดหมู่">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={viewsPerCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#8884d8" tick={{ fill: '#8884d8', fontSize: 11 }} />
                <YAxis stroke="#8884d8" tick={{ fill: '#8884d8' }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(245,158,11,0.08)' }} contentStyle={{ borderRadius: '8px', color: '#000' }} />
                <Legend />
                <Bar dataKey="views" name="จำนวนครั้งที่เข้าชม" radius={[4, 4, 0, 0]}>
                  {viewsPerCategory.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, unit, icon }: { title: string, value: string | number, unit?: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 dark:text-white">{value.toLocaleString()}</h3>
        {unit && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{unit}</p>}
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
        <BarChart3 className="w-5 h-5 text-[#FFF200]" />
        {title}
      </h3>
      {children}
    </div>
  );
}
