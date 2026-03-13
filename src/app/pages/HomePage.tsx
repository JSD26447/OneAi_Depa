import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Image,
  FileText,
  Video,
  Briefcase,
  Code,
  Lightbulb,
  Settings,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Palette,
  Wand2,
  FileStack,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SettingsModal } from '../components/SettingsModal';
import Sidebar from '../components/Sidebar';

const getDeveloper = (tool: any) => {
  if (tool.provider && tool.provider !== 'อื่นๆ (Others)') return tool.provider;
  if (tool.developer && tool.developer !== 'อื่นๆ (Others)') return tool.developer;

  const name = tool.name.toLowerCase();
  if (name.includes('chatgpt') || name.includes('sora') || name.includes('openai')) return 'OpenAI';
  if (name.includes('gemini') || name.includes('veo') || name.includes('google')) return 'Google';
  if (name.includes('copilot') || name.includes('microsoft')) return 'Microsoft';
  if (name.includes('claude') || name.includes('anthropic')) return 'Anthropic';
  if (name.includes('midjourney')) return 'Midjourney';
  if (name.includes('runway')) return 'Runway AI';
  if (name.includes('canva')) return 'Canva';
  if (name.includes('gamma')) return 'Gamma';

  const known: Record<string, string> = {
    'grammarly': 'Grammarly',
    'deepl write': 'DeepL',
    'notion ai': 'Notion Labs',
    'asana intelligence': 'Asana',
    'suno': 'Suno AI',
    'udio': 'Udio',
    'otter.ai': 'Otter.ai',
    'fireflies.ai': 'Fireflies.ai',
    'copy.ai': 'Copy.ai',
  };

  for (const [key, dev] of Object.entries(known)) {
    if (name.includes(key)) return dev;
  }
  return 'อื่นๆ (Others)';
}

const iconMap: Record<string, any> = {
  Image,
  FileText,
  Video,
  Briefcase,
  Code,
  Lightbulb,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Palette,
  Wand2,
  FileStack,
};

export default function HomePage() {
  const { aiTools, categories } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const floatingSymbols = useMemo(() => {
    const symbols = ['~', '{ }', '< >', '/', ';', ':', '=', '+', '-', '(', ')', '[ ]', '</>', '{}', '();', '=>'];
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 1.5 + 0.75}rem`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `-${Math.random() * 5}s`,
      opacity: Math.random() * 0.15 + 0.05,
      x: `${(Math.random() - 0.5) * 60}px`,
      y: `${(Math.random() - 0.5) * 60}px`,
      rot: `${(Math.random() - 0.5) * 30}deg`,
    }));
  }, []);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  useEffect(() => {
    setSelectedSubCategory(null);
  }, [selectedCategory]);

  const subCategories = useMemo(() => {
    if (!selectedCategory) return [];
    const toolsInCategory = aiTools.filter(tool =>
      tool.category === selectedCategory ||
      (tool.categoryIds && tool.categoryIds.includes(selectedCategory))
    );
    const subs = toolsInCategory.flatMap(tool => tool.subCategories || []).filter(Boolean);
    return Array.from(new Set(subs));
  }, [selectedCategory, aiTools]);

  const filteredTools = useMemo(() => {
    let filtered = aiTools;

    // Check if any filter is active
    const isFiltered = selectedCategory || selectedSubCategory || searchQuery.trim();

    if (selectedCategory) {
      filtered = filtered.filter(tool =>
        tool.category === selectedCategory ||
        (tool.categoryIds && tool.categoryIds.includes(selectedCategory))
      );
    }
    if (selectedSubCategory) {
      filtered = filtered.filter(tool => tool.subCategories?.includes(selectedSubCategory));
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tagline.toLowerCase().includes(query)
      );
    }

    // Hide duplicates if no filter is active
    if (!isFiltered) {
      const seenNames = new Set<string>();
      filtered = filtered.filter(tool => {
        // Normalize name to handle cases like "Gemini" and "Gemini (Google)"
        const baseName = tool.name.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
        if (seenNames.has(baseName)) {
          return false;
        }
        seenNames.add(baseName);
        return true;
      });
    }

    return filtered;
  }, [selectedCategory, selectedSubCategory, searchQuery, aiTools]);

  const groupedToolsData = useMemo(() => {
    const counts: Record<string, number> = {};
    const groups: Record<string, typeof filteredTools> = {};

    filteredTools.forEach((tool) => {
      const dev = getDeveloper(tool);
      counts[dev] = (counts[dev] || 0) + 1;
    });

    const others: typeof filteredTools = [];

    filteredTools.forEach((tool) => {
      const dev = getDeveloper(tool);
      if (counts[dev] <= 1 && dev !== 'อื่นๆ (Others)') {
        others.push(tool);
      } else {
        if (!groups[dev]) groups[dev] = [];
        groups[dev].push(tool);
      }
    });

    const sortedGroups = Object.entries(groups).sort((a, b) => {
      if (a[0] === 'อื่นๆ (Others)') return 1;
      if (b[0] === 'อื่นๆ (Others)') return -1;
      return b[1].length - a[1].length;
    });

    if (others.length > 0) {
      const othersIndex = sortedGroups.findIndex(g => g[0] === 'อื่นๆ (Others)');
      if (othersIndex !== -1) {
        sortedGroups[othersIndex][1].push(...others);
      } else {
        sortedGroups.push(['อื่นๆ (Others)', others]);
      }
    }

    return sortedGroups;
  }, [filteredTools]);

  const developerOptions = useMemo(() => {
    return ['All', ...groupedToolsData.map(([dev]) => dev)];
  }, [groupedToolsData]);

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    Advanced: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  const priceColors = {
    Free: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    Paid: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    'Free + Paid': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  };

  const difficultyLabels = {
    Beginner: 'เริ่มต้น',
    Intermediate: 'ปานกลาง',
    Advanced: 'ขั้นสูง',
  };

  const priceLabels = {
    Free: 'ฟรี',
    Paid: 'เสียเงิน',
    'Free + Paid': 'ฟรี + เสียเงิน',
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

      {/* Hero Section */}
      <div
        className="relative overflow-hidden pb-20 pt-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C2F53]/90 via-[#0C2F53]/80 to-[#0C2F53]/95 backdrop-blur-[1px] z-0" />

        <style>
          {`
            @keyframes drift {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              50% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); }
            }
          `}
        </style>

        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
          {floatingSymbols.map((item, i) => (
            <div
              key={item.id}
              className={`absolute text-[#FFF200] font-mono leading-none ${i >= 10 ? 'hidden sm:block' : ''}`}
              style={{
                top: item.top,
                left: item.left,
                fontSize: item.fontSize,
                opacity: item.opacity,
                animation: `drift ${item.animationDuration} ease-in-out infinite`,
                animationDelay: item.animationDelay,
                '--tx': item.x,
                '--ty': item.y,
                '--rot': item.rot,
              } as React.CSSProperties}
            >
              {item.symbol}
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 space-y-0 leading-[0.8]">
              <h2 className="text-6xl sm:text-8xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl italic">
                ONE AI DISCOVERY
              </h2>
              <h2 className="text-6xl sm:text-8xl md:text-7.5xl font-black text-[#FFF200] tracking-tighter drop-shadow-2xl ml-4 sm:ml-8 italic">
                ROADMAP_
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-0 mb-12 transform -rotate-1">
              <div className="bg-[#FFF200] px-6 py-2 shadow-lg">
                <span className="text-[#0C2F53] font-black text-sm sm:text-lg uppercase tracking-widest whitespace-nowrap">
                  THE WORLD WAITS FOR NO ONE
                </span>
              </div>
              <div className="bg-[#0C2F53]/80 backdrop-blur-md px-6 py-2 border-2 border-[#FFF200] shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg uppercase tracking-widest whitespace-nowrap">
                  YOUR DIGITAL VISA TO THE FUTURE
                </span>
              </div>
            </div>

            <div className="max-w-3xl w-full relative group shadow-2xl">
              <div className="absolute inset-0 bg-[#FFF200] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
              <input
                type="text"
                placeholder="Ex. Create a website, Build an app, or Generate images..."
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
          type="tools"
          itemCount={filteredTools.length}
        />

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Results Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedCategory
                    ? categories.find((c: any) => c.category_id === selectedCategory)?.name
                    : searchQuery
                      ? `ผลการค้นหาสำหรับ "${searchQuery}"`
                      : 'เครื่องมือ AI ทั้งหมด'}
                </h2>
              </div>

              <div className="relative flex justify-end min-h-[40px] max-w-[340px] w-full mt-4 sm:mt-0 pointer-events-none">
                <div
                  className={`pointer-events-auto absolute right-0 top-0 flex items-center bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 transition-all duration-500 ease-in-out overflow-hidden shadow-sm ${isFilterExpanded
                    ? "rounded-2xl w-full max-w-[340px]"
                    : "rounded-full w-[40px] hover:bg-gray-50 dark:hover:bg-[#334155]"
                    }`}
                  style={{ height: '40px' }}
                >
                  <button
                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    className="absolute left-0 top-0 bottom-0 w-[40px] flex justify-center items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer z-10 bg-transparent"
                    aria-label="Toggle filters"
                  >
                    {isFilterExpanded ? <X className="w-4 h-4 transition-transform duration-300" /> : <Filter className="w-4 h-4 transition-transform duration-300" />}
                  </button>

                  <div
                    className={`flex items-center gap-1 w-full pl-10 pr-2 h-full transition-opacity duration-300 whitespace-nowrap ${isFilterExpanded ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'
                      }`}
                  >
                    <div className="relative flex-1 h-full flex items-center">
                      <select
                        value={selectedDeveloper}
                        onChange={(e) => setSelectedDeveloper(e.target.value)}
                        className="appearance-none bg-transparent hover:bg-gray-50 dark:hover:bg-[#334155] rounded-md transition-colors text-gray-700 dark:text-gray-200 w-full py-1.5 pl-2 pr-6 text-sm focus:outline-none cursor-pointer truncate"
                      >
                        {developerOptions.map((dev) => (
                          <option key={dev} value={dev} className="bg-white dark:bg-[#1e293b]">
                            {dev === 'All' ? 'ผู้พัฒนาทั้งหมด' : dev}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute right-1 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {subCategories.length > 0 && (
                      <>
                        <div className="w-[1px] h-4 bg-gray-200 dark:bg-white/10 mx-0.5 flex-shrink-0" />
                        <div className="relative w-[130px] h-full flex items-center">
                          <select
                            className="appearance-none bg-transparent hover:bg-gray-50 dark:hover:bg-[#334155] rounded-md transition-colors text-gray-700 dark:text-gray-200 w-full py-1.5 pl-2 pr-6 text-sm focus:outline-none cursor-pointer truncate"
                            value={selectedSubCategory || ''}
                            onChange={(e) => setSelectedSubCategory(e.target.value || null)}
                          >
                            <option value="" className="bg-white dark:bg-[#1e293b]">กิจกรรมทั้งหมด</option>
                            {subCategories.map(sub => (
                              <option key={sub} value={sub} className="bg-white dark:bg-[#1e293b]">{sub}</option>
                            ))}
                          </select>
                          <svg className="absolute right-1 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Cards Grid Grouped */}
            {filteredTools.length > 0 ? (
              <div className="space-y-16">
                {groupedToolsData.map(([groupName, tools]) => {
                  if (selectedDeveloper !== 'All' && selectedDeveloper !== groupName) return null;

                  const isExpanded = expandedGroups[groupName];
                  const visibleTools = isExpanded ? tools : tools.slice(0, 3);
                  const hasMore = tools.length > 3;

                  return (
                    <div key={groupName}>
                      <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-100 dark:border-gray-800 pb-3 pl-2 relative">
                        <div className="absolute left-0 bottom-3 top-0 w-1.5 bg-[#FFF200] rounded-full"></div>
                        <h3 className="text-2xl font-black text-[#0C2F53] dark:text-[#FFF200] tracking-tight ml-3">
                          {groupName}
                        </h3>
                        <span className="ml-auto bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-1.5 px-4 rounded-full text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm">
                          {tools.length} รายการ
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {visibleTools.map((tool) => {
                          const LogoIcon = tool.logo ? iconMap[tool.logo] : null;
                          return (
                            <div
                              key={tool.id}
                              className={`group bg-white dark:bg-gray-800 rounded-[22px] border-2 ${tool.isDepaRecommended ? 'border-[#FFF200] shadow-[0_0_15px_rgba(255,242,0,0.2)] dark:shadow-[0_0_15px_rgba(255,242,0,0.1)]' : 'border-transparent dark:border-transparent hover:border-gray-200 dark:hover:border-gray-700'} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden relative`}
                              style={!tool.isDepaRecommended ? { border: '1px solid var(--border-color, #e5e7eb)' } : {}}
                            >
                              {tool.isDepaRecommended && (
                                <div className="absolute -top-[11px] -right-[13px] z-20 pointer-events-none" title="DEPA Recommended">
                                  <img src="/images/depa-badge.png" alt="DEPA Recommended" className="w-[125px] sm:w-[145px] h-auto object-contain drop-shadow-md" />
                                </div>
                              )}

                              {/* Logo Header Container (Full Width) */}
                              <div
                                className={`w-full h-48 relative flex items-center justify-center overflow-hidden border-b ${tool.isDepaRecommended ? 'border-[#FFF200]/30' : 'border-gray-100 dark:border-gray-700'} ${tool.imageUrl ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-gradient-to-br from-[#FFF200] to-[#FFC600]'}
                                  `}
                              >
                                {tool.imageUrl ? (
                                  <img
                                    src={tool.imageUrl}
                                    alt={`${tool.name} logo`}
                                    className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setPreviewImage(tool.imageUrl || null);
                                    }}
                                    loading="lazy"
                                  />
                                ) : LogoIcon ? (
                                  <LogoIcon className="w-16 h-16 text-[#0C2F53]" />
                                ) : null}
                              </div>

                              {/* Content Body Section */}
                              <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                  {tool.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>

                                {/* Category Label */}
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-xs font-bold uppercase tracking-wider">
                                    {categories.find((c: any) => c.category_id === tool.category)?.name || tool.category}
                                  </span>
                                  {tool.categoryIds?.map(catId => {
                                    if (catId === tool.category) return null;
                                    const catName = categories.find((c: any) => c.category_id === catId)?.name || catId;
                                    return (
                                      <span key={catId} className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-xs font-bold uppercase tracking-wider">
                                        {catName}
                                      </span>
                                    );
                                  })}
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[tool.difficulty]
                                      }`}
                                  >
                                    {difficultyLabels[tool.difficulty]}
                                  </span>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${priceColors[tool.price]
                                      }`}
                                  >
                                    {priceLabels[tool.price]}
                                  </span>
                                </div>

                                {/* Buttons Area */}
                                <div className="mt-auto flex flex-col gap-3">
                                  <a
                                    href={tool.officialWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full gap-2 bg-[#0C2F53] text-[#FFF200] py-3 rounded-2xl hover:bg-[#0C2F53]/90 hover:shadow-lg transition-all font-bold group"
                                  >
                                    เข้าสู่เว็บไซต์
                                    <ExternalLink className="w-4 h-4 group-hover:scale-125 transition-transform" />
                                  </a>
                                  <Link
                                    to={`/tool/${tool.id}`}
                                    className="flex items-center justify-center w-full gap-2 bg-white dark:bg-gray-800 text-[#0C2F53] dark:text-[#FFF200] border-2 border-[#0C2F53] dark:border-[#FFF200]/50 py-3 rounded-2xl hover:bg-[#0C2F53]/5 dark:hover:bg-[#FFF200]/10 hover:shadow-lg transition-all font-bold group"
                                  >
                                    อ่านข้อมูลเพิ่มเติม
                                    <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {hasMore && (
                        <div className="mt-6 text-center">
                          <button
                            onClick={() => toggleGroup(groupName)}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#0C2F53] dark:hover:border-[#FFF200] text-[#0C2F53] dark:text-white rounded-full font-bold text-sm hover:shadow-md transition-all group"
                          >
                            {isExpanded ? (
                              <>ย่อหน้าต่าง <X className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /></>
                            ) : (
                              <>ดูเพิ่มเติม ({tools.length - 3}) <Menu className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /></>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  ไม่พบเครื่องมือ ลองค้นหาหรือเลือกหมวดหมู่อื่น
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ✅ จุดที่ 4: ส่วนของหน้าต่างป๊อปอัพ (Modal) - จะแสดงก็ต่อเมื่อ previewImage ไม่เป็นค่าว่าง */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewImage(null)} // คลิกพื้นหลังเพื่อปิด
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            {/* ปุ่มปิดมุมบนขวา */}
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setPreviewImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <img
              src={previewImage}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              alt="Preview"
              onClick={(e) => e.stopPropagation()} // คลิกที่ตัวรูปไม่ต้องปิด
            />
          </div>
        </div>
      )}
    </div>
  );
}