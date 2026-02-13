import { useState, useMemo } from 'react';
import { Search, Copy, Check, MessageSquareCode, Settings, Menu } from 'lucide-react';
import { aiPrompts } from '../data/prompts';
import Sidebar from '../components/Sidebar';
import { SettingsModal } from '../components/SettingsModal';
import { Link } from 'react-router-dom';

export default function PromptsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const filteredPrompts = useMemo(() => {
        let filtered = aiPrompts;
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.prompt.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }
        return filtered;
    }, [selectedCategory, searchQuery]);

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

            {/* Header */}
            <header className="bg-[#0C2F53] text-white py-3 border-b border-white/10 sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <Link to="/" className="flex items-center gap-3 group">
                                <div className="bg-white p-1 rounded-lg">
                                    <img
                                        src="/images/LogoDEPA-01.png"
                                        alt="depa logo"
                                        className="h-10 w-auto"
                                    />
                                </div>
                                <div className="hidden sm:block leading-tight">
                                    <h1 className="text-xl font-bold tracking-tight group-hover:text-[#FFF200] transition-colors">AI Discovery Center</h1>
                                    <p className="text-[10px] text-[#FFF200] font-semibold uppercase tracking-widest">Powered by depa</p>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSettingsOpen(true)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <Settings className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section - Imported from HomePage */}
            <div
                className="relative overflow-hidden pb-20 pt-16 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0C2F53]/90 via-[#0C2F53]/80 to-[#0C2F53]/95 backdrop-blur-[1px] z-0" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-6 space-y-0 leading-[0.8]">
                            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl italic">
                                AI PROMPT
                            </h2>
                            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#FFF200] tracking-tighter drop-shadow-2xl ml-4 sm:ml-8 italic">
                                ENGINEER_
                            </h2>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-0 mb-12 transform -rotate-1">
                            <div className="bg-[#FFF200] px-6 py-2 shadow-lg">
                                <span className="text-[#0C2F53] font-black text-sm sm:text-lg uppercase tracking-widest whitespace-nowrap">
                                    UNLOCK THE POWER
                                </span>
                            </div>
                            <div className="bg-[#0C2F53]/80 backdrop-blur-md px-6 py-2 border-2 border-[#FFF200] shadow-lg">
                                <span className="text-white font-bold text-sm sm:text-lg uppercase tracking-widest whitespace-nowrap">
                                    OF GENERATIVE AI
                                </span>
                            </div>
                        </div>

                        <div className="max-w-3xl w-full relative group shadow-2xl">
                            <div className="absolute inset-0 bg-[#FFF200] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#0C2F53] transition-colors z-10" />
                            <input
                                type="text"
                                placeholder="ค้นหาคำสั่ง (Prompts) เช่น สร้างภาพ, เขียนบทความ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-8 py-6 bg-white border-4 border-transparent focus:border-[#FFF200] rounded-2xl text-lg focus:outline-none text-[#0C2F53] placeholder:text-gray-400 transition-all font-black relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    selectedCategory={selectedCategory}
                    onCategoryClick={setSelectedCategory}
                    type="prompts"
                />

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <main className="flex-1 p-6 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 gap-6">
                            {filteredPrompts.length > 0 ? (
                                filteredPrompts.map((p) => (
                                    <div
                                        key={p.id}
                                        className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="p-6 md:p-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                                <div>
                                                    <h3 className="text-2xl font-black text-[#0C2F53] dark:text-white mb-2">{p.title}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {p.tags.map(tag => (
                                                            <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-wider">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleCopy(p.id, p.prompt)}
                                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${copiedId === p.id
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-[#0C2F53] text-[#FFF200] hover:bg-[#0C2F53]/90'
                                                        }`}
                                                >
                                                    {copiedId === p.id ? (
                                                        <><Check className="w-5 h-5" /> Copied!</>
                                                    ) : (
                                                        <><Copy className="w-5 h-5" /> Copy Prompt</>
                                                    )}
                                                </button>
                                            </div>

                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-[#0C2F53] rounded-2xl opacity-0 group-hover:opacity-[0.02] transition-opacity" />
                                                <pre className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-slate-700 dark:text-slate-300 font-mono text-sm whitespace-pre-wrap border border-slate-100 dark:border-slate-800">
                                                    {p.prompt}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <div className="bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">ไม่พบคำสั่งที่คุณต้องการ</h3>
                                    <p className="text-slate-500 mt-2">ลองใช้คำค้นหาอื่นหรือเลือกหมวดหมู่ที่เหมาะสม</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
