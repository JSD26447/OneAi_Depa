import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { aiTools } = useApp();
  const tool = aiTools.find(t => t.id === id);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ไม่พบเครื่องมือ</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            กลับไปหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

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
      {/* Header */}
      <header className="bg-[#0C2F53] text-white border-b border-white/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-[#FFF200] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>กลับสู่หน้าหลัก</span>
          </button>

          <img
            src="/images/LogoDEPA-01.png"
            alt="depa logo"
            className="h-8 bg-white p-0.5 rounded"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 mb-8 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF200]/10 rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-wrap gap-3 mb-6 relative z-10">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${difficultyColors[tool.difficulty]
                }`}
            >
              ระดับ: {difficultyLabels[tool.difficulty]}
            </span>
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${priceColors[tool.price]
                }`}
            >
              {priceLabels[tool.price]}
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div
              className={`w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg ring-4 ring-slate-50 dark:ring-slate-900 ${tool.imageUrl ? 'bg-white' : 'bg-gradient-to-br from-[#FFF200] to-[#FFC600]'
                }`}
            >
              {tool.imageUrl ? (
                <img
                  src={tool.imageUrl}
                  alt={`${tool.name} logo`}
                  className="w-full h-full object-cover p-1"
                />
              ) : (
                <div className="text-[#0C2F53]">
                  <span className="text-3xl font-black">{tool.name[0]}</span>
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-[#0C2F53] dark:text-white mb-3">{tool.name}</h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">{tool.tagline}</p>
            </div>
          </div>
        </div>

        {/* What This AI Can Help You Do */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0C2F53] dark:text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#FFF200]" />
            AI นี้ช่วยคุณทำอะไรได้บ้าง
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.whatItDoes.map((item, index) => (
              <li key={index} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-[#FFF200] flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Who This AI Is Best For */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0C2F53] dark:text-white mb-6">
            เหมาะกับใครบ้าง
          </h2>
          <div className="flex flex-wrap gap-4">
            {tool.whoItsFor.map((person, index) => (
              <div key={index} className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-700 dark:text-slate-300 font-semibold shadow-sm">
                {person}
              </div>
            ))}
          </div>
        </section>

        {/* How to Use This AI */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0C2F53] dark:text-white mb-6">
            วิธีใช้งาน
          </h2>
          <div className="space-y-6">
            {tool.howToUse.map((step) => (
              <div key={step.step} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#FFF200] text-[#0C2F53] flex items-center justify-center font-black text-xl shadow-lg shadow-[#FFF200]/20 group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Example Use Cases */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ตัวอย่างการใช้งานจริง
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            นี่คือวิธีที่ผู้คนใช้ {tool.name} ในการทำงาน:
          </p>
          <ul className="space-y-3">
            {tool.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFF200] mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Difficulty Level Explanation */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ทำไมถึงเป็นระดับ{difficultyLabels[tool.difficulty]}?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {tool.difficultyExplanation}
          </p>
        </section>

        {/* Pricing Details */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ราคา
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {tool.pricingDetails}
          </p>
        </section>

        {/* Call to Action */}
        <div className="bg-[#0C2F53] rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl shadow-[#0C2F53]/20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-black text-white mb-4 relative z-10">
            พร้อมที่จะลอง {tool.name} แล้วหรือยัง?
          </h2>
          <p className="text-blue-100/70 text-lg mb-8 relative z-10">
            เริ่มต้นใช้งานและปลดล็อกศักยภาพของคุณด้วย AI
          </p>
          <a
            href={tool.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#FFF200] text-[#0C2F53] px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#FFC600] hover:scale-105 transition-all shadow-xl shadow-[#FFF200]/20 relative z-10"
          >
            ไปที่เว็บไซต์อย่างเป็นทางการ
            <ExternalLink className="w-6 h-6" />
          </a>
        </div>
      </main>
    </div>
  );
}