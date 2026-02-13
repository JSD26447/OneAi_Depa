import { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SettingsModal } from '../components/SettingsModal';
import { categories as sidebarCategories } from '../data/aiTools';
import Sidebar from '../components/Sidebar';

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
  const { aiTools } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // ... (useMemo remains same)
  const filteredTools = useMemo(() => {
    let filtered = aiTools;
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tagline.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [selectedCategory, searchQuery, aiTools]);

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

      {/* Hero Section */}
      <div
        className="relative overflow-hidden pb-20 pt-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C2F53]/90 via-[#0C2F53]/80 to-[#0C2F53]/95 backdrop-blur-[1px] z-0" />

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
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#0C2F53] transition-colors z-10" />
              <input
                type="text"
                placeholder="Ex. Create a website, Build an app, or Generate images..."
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
          type="tools"
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
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedCategory
                  ? sidebarCategories.find(c => c.id === selectedCategory)?.name
                  : searchQuery
                    ? `ผลการค้นหาสำหรับ "${searchQuery}"`
                    : 'เครื่องมือ AI ทั้งหมด'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                พบ {filteredTools.length} เครื่องมือ
              </p>
            </div>

            {/* Tool Cards Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTools.map((tool) => {
                  const LogoIcon = tool.logo ? iconMap[tool.logo] : null;
                  return (
                    <div
                      key={tool.id}
                      className="group bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Logo (imageUrl > icon) */}
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden shadow-inner ring-4 ring-slate-50 dark:ring-slate-900 ${tool.imageUrl ? 'bg-white' : 'bg-gradient-to-br from-[#FFF200] to-[#FFC600]'
                          }`}
                      >
                        {tool.imageUrl ? (
                          <img
                            src={tool.imageUrl}
                            alt={`${tool.name} logo`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setPreviewImage(tool.imageUrl || null);
                            }}
                            loading="lazy"
                          />
                        ) : LogoIcon ? (
                          <LogoIcon className="w-8 h-8 text-[#0C2F53]" />
                        ) : null}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>

                      {/* Best For */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">เหมาะสำหรับ:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tool.bestFor.join(', ')}</p>
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

                      <div className="mt-auto">
                        <Link
                          to={`/tool/${tool.id}`}
                          className="flex items-center justify-center w-full gap-2 bg-[#0C2F53] text-[#FFF200] py-4 rounded-2xl hover:bg-[#0C2F53]/90 hover:shadow-lg transition-all font-bold group"
                        >
                          อ่านข้อมูลเพิ่มเติม
                          <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
                        </Link>
                      </div>
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