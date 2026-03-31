import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutGrid,
    MessageSquareCode,
    Image,
    FileText,
    Video,
    Briefcase,
    Code,
    Lightbulb,
    Menu,
    X,
    Users,
    Palette,
    Map,
    Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    selectedCategory: string | null;
    onCategoryClick: (id: string) => void;
    type: 'tools' | 'prompts';
    itemCount?: number;
}

const iconMap: Record<string, any> = {
    Image,
    FileText,
    Video,
    Briefcase,
    Code,
    Lightbulb,
    Users,
    Palette,
    Map
};

export default function Sidebar({ open, onClose, selectedCategory, onCategoryClick, type, itemCount }: SidebarProps) {
    const location = useLocation();
    const { categories: allCategories } = useApp();
    const [categorySearchQuery, setCategorySearchQuery] = useState('');
    const [isChildVisible, setIsChildVisible] = useState(true);

    const currentCategories = allCategories
        .filter((c: any) => c.type === (type === 'tools' ? 'ai' : 'prompt'))
        .filter((c: any) =>
            (c.name || '').toLowerCase().includes(categorySearchQuery.toLowerCase())
        );

    return (
        <>
            <div className={`fixed lg:sticky top-[73px] left-0 z-[60] lg:z-40 flex h-[calc(100vh-73px)] shrink-0 transition-all duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

                {/* Navigation Rail (Mother Sidebar) */}
                <div className="w-20 bg-[#0C2F53] flex flex-col items-center py-8 gap-6 border-r border-white/10 shadow-xl relative z-20">
                    <Link
                        to="/"
                        className={`p-3 rounded-2xl transition-all duration-300 group ${location.pathname === '/' ? 'bg-[#FFF200] text-[#0C2F53] scale-110 shadow-[0_0_20px_rgba(255,242,0,0.4)]' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                    >
                        <LayoutGrid className="w-8 h-8" />
                    </Link>

                    <Link
                        to="/prompts"
                        className={`p-3 rounded-2xl transition-all duration-300 group ${location.pathname === '/prompts' ? 'bg-[#FFF200] text-[#0C2F53] scale-110 shadow-[0_0_20px_rgba(255,242,0,0.4)]' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                    >
                        <MessageSquareCode className="w-8 h-8" />
                    </Link>

                    <button
                        onClick={() => setIsChildVisible(!isChildVisible)}
                        className="mt-auto mb-4 p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all hidden lg:block"
                    >
                        <Menu className={`w-8 h-8 transition-transform duration-300 ${isChildVisible ? 'rotate-90' : 'rotate-0'}`} />
                    </button>
                </div>

                {/* Content Sidebar (Child Sidebar) */}
                <div className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-inner overflow-y-auto transition-all duration-300 ${isChildVisible ? 'w-72 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-6 w-72">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-6 h-[2px] bg-[#FFF200]"></span>
                                    {type === 'tools' ? 'Tools Categories' : 'Prompt Topics'}
                                </h2>
                                {itemCount !== undefined && (
                                    <div className="ml-8 inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-50/80 dark:bg-slate-800/40 backdrop-blur-md rounded-full w-max border border-slate-200/80 dark:border-slate-700/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:bg-white dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md cursor-default group relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                                        <div className="relative flex h-2 w-2 items-center justify-center">
                                            <div className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping"></div>
                                            <div className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                        </div>
                                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide relative z-10">
                                            พบ <span className="font-black text-slate-900 dark:text-white text-[13px] mx-0.5">{itemCount}</span> {type === 'tools' ? 'เครื่องมือ' : 'คำสั่ง'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Category Search Input */}
                        <div className="mb-6 relative group">
                            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#0C2F53] dark:group-focus-within:text-[#FFF200] transition-colors" />
                                <input
                                    type="text"
                                    placeholder="ค้นหาหมวดหมู่..."
                                    value={categorySearchQuery}
                                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFF200]/50 focus:border-[#FFF200] dark:focus:border-[#FFF200] transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
                                />
                                {categorySearchQuery && (
                                    <button
                                        onClick={() => setCategorySearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {currentCategories.map((category: any) => {
                                const Icon = iconMap[category.icon] || Lightbulb;
                                const isActive = selectedCategory === category.category_id;

                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            onCategoryClick(category.category_id);
                                            if (window.innerWidth < 1024) onClose();
                                        }}
                                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                            ? 'bg-[#0C2F53] text-[#FFF200] shadow-lg translate-x-2'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:translate-x-1'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-full transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-[#FFF200]/20'}`}>
                                                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFF200]' : 'text-slate-500 group-hover:text-[#0C2F53] dark:group-hover:text-[#FFF200]'}`} />
                                            </div>
                                            <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                                                {category.name}
                                            </span>
                                        </div>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FFF200] animate-pulse" />}
                                    </button>
                                );
                            })}
                        </nav>

                        {selectedCategory && (
                            <button
                                onClick={() => onCategoryClick(null as any)}
                                className="mt-8 w-full py-4 text-xs font-black uppercase tracking-widest text-[#0C2F53] dark:text-blue-400 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl hover:border-[#FFF200] transition-colors shadow-sm"
                            >
                                Show All
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}
        </>
    );
}