import { useState, useMemo } from 'react';
import { Search, Copy, Check, MessageSquareCode, Settings, Menu, PenTool } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SettingsModal } from '../components/SettingsModal';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function PromptsPage() {
    const { prompts, aiTools, categories, recordPromptCopy } = useApp();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const filteredPrompts = useMemo(() => {
        let filtered = prompts;
        if (selectedCategory) {
            filtered = filtered.filter(p =>
                p.category === selectedCategory ||
                (p.categoryIds && p.categoryIds.includes(selectedCategory))
            );
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.prompt.toLowerCase().includes(q) ||
                (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
                (p.aiRecommendations && p.aiRecommendations.some(r => r.name.toLowerCase().includes(q))) ||
                (p.author && p.author.toLowerCase().includes(q))
            );
        }
        return filtered;
    }, [selectedCategory, searchQuery, prompts]);

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);

        const prompt = prompts.find(p => p.id === id);
        if (prompt && (prompt as any).db_id) {
            recordPromptCopy((prompt as any).db_id);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
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
                                    <p className="text-[10px] text-[#FFF200] font-semibold tracking-widest">Powered by depa</p>
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
                                ONE AI
                            </h2>
                            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#FFF200] tracking-tighter drop-shadow-2xl ml-4 sm:ml-8 italic">
                                PROMPTLY
                            </h2>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-0 mb-12 transform -rotate-1">
                            <div className="bg-[#FFF200] px-6 py-2 shadow-lg">
                                <span className="text-[#0C2F53] font-black text-sm sm:text-lg uppercase tracking-widest whitespace-nowrap">
                                    Shape your ideas into success.
                                </span>
                            </div>
                            <div className="bg-[#0C2F53]/80 backdrop-blur-md px-6 py-2 border-2 border-[#FFF200] shadow-lg">
                                <span className="text-white font-bold text-sm sm:text-lg uppercase tracking-widest whitespace-nowrap">
                                    Curated for your excellence:
                                </span>
                            </div>
                        </div>

                        <div className="max-w-3xl w-full relative group shadow-2xl">
                            <div className="absolute inset-0 bg-[#FFF200] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
                            <input
                                type="text"
                                placeholder="ค้นหาคำสั่ง (Prompts) เช่น สร้างภาพ, เขียนบทความ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pr-16 pl-8 py-6 bg-white border-4 border-transparent focus:border-[#FFF200] rounded-2xl text-lg focus:outline-none text-[#0C2F53] placeholder:text-gray-400 transition-all font-black relative z-10"
                            />
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 group-focus-within:text-[#0C2F53] transition-colors z-20 cursor-pointer" />
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
                    itemCount={filteredPrompts.length}
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
                                filteredPrompts.map((p) => {
                                    // หาชื่อหมวดหมู่ที่ตรงกันจาก list ของ category ฝั่ง database
                                    const catName = categories.find((c: any) => c.category_id === p.category)?.name || p.category;

                                    return (
                                        <div
                                            key={p.id}
                                            className="bg-white dark:bg-slate-800 rounded-[22px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                                        >
                                            <div className="p-6 md:p-8">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                                    <div>
                                                        <h3 className="text-2xl font-black text-[#0C2F53] dark:text-white mb-2">{p.title}</h3>
                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-xs font-bold uppercase tracking-wider">
                                                                {catName}
                                                            </span>
                                                            {p.categoryIds?.map(catId => {
                                                                if (catId === p.category) return null;
                                                                const additionalCatName = categories.find((c: any) => c.category_id === catId)?.name || catId;
                                                                return (
                                                                    <span key={catId} className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-xs font-bold uppercase tracking-wider">
                                                                        {additionalCatName}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                                            {(p.aiRecommendations && p.aiRecommendations.length > 0) || (p.tags && p.tags.length > 0) ? (
                                                                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1">
                                                                    🤖 AI ที่แนะนำ:
                                                                </span>
                                                            ) : null}
                                                            {p.aiRecommendations && p.aiRecommendations.length > 0 ? (
                                                                p.aiRecommendations.map((rec, i) => {
                                                                    const getBrandStyle = (t: string) => {
                                                                        const lowerT = t.toLowerCase();
                                                                        if (lowerT.includes('chatgpt') || lowerT === 'gpt') return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/50 hover:bg-emerald-100 hover:border-emerald-400';
                                                                        if (lowerT.includes('gemini')) return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50 hover:bg-blue-100 hover:border-blue-400';
                                                                        if (lowerT.includes('claude') || lowerT.includes('claud')) return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/50 hover:bg-orange-100 hover:border-orange-400';
                                                                        if (lowerT.includes('deepseek') || lowerT.includes('deepsix')) return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50 hover:bg-indigo-100 hover:border-indigo-400';
                                                                        return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50 hover:bg-blue-100 hover:border-blue-400';
                                                                    };
                                                                    const brandStyle = getBrandStyle(rec.name);

                                                                    return (
                                                                        <a
                                                                            key={i}
                                                                            href={rec.url ? (rec.url.startsWith('http') ? rec.url : `https://${rec.url}`) : '#'}
                                                                            target={rec.url ? "_blank" : undefined}
                                                                            rel="noopener noreferrer"
                                                                            title={rec.url ? `ไปยังเว็บไซต์ ${rec.name}` : undefined}
                                                                            className={`px-3 py-1 ${rec.url ? `${brandStyle} cursor-pointer border` : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-default'} rounded-full text-xs font-bold tracking-wider transition-all inline-flex items-center gap-1`}
                                                                        >
                                                                            {rec.url && <span className="text-[9px]">↗</span>}
                                                                            {rec.name}
                                                                        </a>
                                                                    );
                                                                })
                                                            ) : p.tags && p.tags
                                                                .filter(tag => {
                                                                    const getFallbackUrl = (t: string) => {
                                                                        const lowerT = t.toLowerCase();
                                                                        if (lowerT.includes('midjourney')) return 'https://www.midjourney.com/';
                                                                        if (lowerT.includes('stable diffusion')) return 'https://stability.ai/';
                                                                        if (lowerT.includes('chatgpt') || lowerT === 'gpt') return 'https://chat.openai.com/';
                                                                        if (lowerT.includes('gemini')) return 'https://gemini.google.com/';
                                                                        if (lowerT.includes('claude') || lowerT.includes('claud')) return 'https://claude.ai/';
                                                                        if (lowerT.includes('copilot')) return 'https://copilot.microsoft.com/';
                                                                        if (lowerT.includes('perplexity')) return 'https://www.perplexity.ai/';
                                                                        if (lowerT.includes('dall')) return 'https://openai.com/dall-e-3';
                                                                        if (lowerT.includes('canva')) return 'https://www.canva.com/ai-image-generator/';
                                                                        if (lowerT.includes('leonardo')) return 'https://leonardo.ai/';
                                                                        if (lowerT.includes('runway')) return 'https://runwayml.com/';
                                                                        if (lowerT.includes('pika')) return 'https://pika.art/';
                                                                        if (lowerT.includes('suno')) return 'https://suno.com/';
                                                                        if (lowerT.includes('udio')) return 'https://www.udio.com/';
                                                                        if (lowerT.includes('mistral')) return 'https://mistral.ai/';
                                                                        if (lowerT.includes('llama')) return 'https://llama.meta.com/';
                                                                        if (lowerT.includes('grok')) return 'https://x.ai/';
                                                                        if (lowerT.includes('deepseek') || lowerT.includes('deepsix')) return 'https://www.deepseek.com/';
                                                                        if (lowerT.includes('github') || lowerT.includes('copilot')) return 'https://github.com/features/copilot';
                                                                        return null;
                                                                    };
                                                                    // กรองเอาเฉพาะแท็กที่มีลิงก์ AI (กันข้อความคีย์เวิร์ดหลุดมา)
                                                                    const matchedTool = aiTools.find(
                                                                        tool => tool.name.toLowerCase().includes(tag.toLowerCase()) ||
                                                                            tag.toLowerCase().includes(tool.name.toLowerCase())
                                                                    );
                                                                    return !!(matchedTool?.officialWebsite || getFallbackUrl(tag));
                                                                })
                                                                .map(tag => {
                                                                    const matchedTool = aiTools.find(
                                                                        tool => tool.name.toLowerCase().includes(tag.toLowerCase()) ||
                                                                            tag.toLowerCase().includes(tool.name.toLowerCase())
                                                                    );

                                                                    const getBrandStyle = (t: string) => {
                                                                        const lowerT = t.toLowerCase();
                                                                        if (lowerT.includes('chatgpt') || lowerT === 'gpt') {
                                                                            return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/50 hover:bg-emerald-100 hover:border-emerald-400';
                                                                        }
                                                                        if (lowerT.includes('gemini')) {
                                                                            return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50 hover:bg-blue-100 hover:border-blue-400';
                                                                        }
                                                                        if (lowerT.includes('claude') || lowerT.includes('claud')) {
                                                                            return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/50 hover:bg-orange-100 hover:border-orange-400';
                                                                        }
                                                                        if (lowerT.includes('deepseek') || lowerT.includes('deepsix')) {
                                                                            return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50 hover:bg-indigo-100 hover:border-indigo-400';
                                                                        }
                                                                        if (lowerT.includes('perplexity')) {
                                                                            return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800/50 hover:bg-cyan-100 hover:border-cyan-400';
                                                                        }
                                                                        if (lowerT.includes('midjourney')) {
                                                                            return 'bg-slate-900 text-white border-slate-800 dark:bg-slate-700 dark:text-white dark:border-slate-600 hover:bg-slate-800';
                                                                        }
                                                                        if (lowerT.includes('stable diffusion')) {
                                                                            return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/50 hover:bg-purple-100 hover:border-purple-400';
                                                                        }
                                                                        return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50 hover:bg-blue-100 hover:border-blue-400';
                                                                    };

                                                                    const getFallbackUrl = (t: string) => {
                                                                        const lowerT = t.toLowerCase();
                                                                        if (lowerT.includes('midjourney')) return 'https://www.midjourney.com/';
                                                                        if (lowerT.includes('stable diffusion')) return 'https://stability.ai/';
                                                                        if (lowerT.includes('chatgpt') || lowerT === 'gpt') return 'https://chat.openai.com/';
                                                                        if (lowerT.includes('gemini')) return 'https://gemini.google.com/';
                                                                        if (lowerT.includes('claude') || lowerT.includes('claud')) return 'https://claude.ai/';
                                                                        if (lowerT.includes('copilot')) return 'https://copilot.microsoft.com/';
                                                                        if (lowerT.includes('perplexity')) return 'https://www.perplexity.ai/';
                                                                        if (lowerT.includes('dall')) return 'https://openai.com/dall-e-3';
                                                                        if (lowerT.includes('canva')) return 'https://www.canva.com/ai-image-generator/';
                                                                        if (lowerT.includes('leonardo')) return 'https://leonardo.ai/';
                                                                        if (lowerT.includes('runway')) return 'https://runwayml.com/';
                                                                        if (lowerT.includes('pika')) return 'https://pika.art/';
                                                                        if (lowerT.includes('suno')) return 'https://suno.com/';
                                                                        if (lowerT.includes('udio')) return 'https://www.udio.com/';
                                                                        if (lowerT.includes('mistral')) return 'https://mistral.ai/';
                                                                        if (lowerT.includes('llama')) return 'https://llama.meta.com/';
                                                                        if (lowerT.includes('grok')) return 'https://x.ai/';
                                                                        if (lowerT.includes('deepseek') || lowerT.includes('deepsix')) return 'https://www.deepseek.com/';
                                                                        if (lowerT.includes('github') || lowerT.includes('copilot')) return 'https://github.com/features/copilot';
                                                                        return null;
                                                                    };

                                                                    const targetUrl = matchedTool?.officialWebsite || getFallbackUrl(tag);
                                                                    const brandStyle = getBrandStyle(tag);

                                                                    if (targetUrl) {
                                                                        return (
                                                                            <a
                                                                                key={tag}
                                                                                href={targetUrl}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                title={`ไปยังเว็บไซต์ ${tag}`}
                                                                                className={`px-3 py-1 ${brandStyle} rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer inline-flex items-center gap-1 border`}
                                                                            >
                                                                                <span className="text-[9px]">↗</span>
                                                                                {tag}
                                                                            </a>
                                                                        );
                                                                    }

                                                                    return null;
                                                                })}
                                                        </div>
                                                        {p.author && (
                                                            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold shadow-sm border border-indigo-100 dark:border-indigo-800/50">
                                                                <PenTool className="w-3.5 h-3.5" />
                                                                <span>โดย: {p.author}</span>
                                                            </div>
                                                        )}
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
                                    )
                                })
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
