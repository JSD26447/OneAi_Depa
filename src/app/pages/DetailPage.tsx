import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2, Sparkles, Settings, X, Zap, ArrowRight, Layers, Fingerprint } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { aiTools, categories } = useApp();
  const tool = aiTools.find(t => t.id === id);

  // 1. Hero Apple Sticky Scroll Sequence
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageScale = useTransform(heroProgress, [0, 0.8], [1, 4]);
  const heroImageOpacity = useTransform(heroProgress, [0, 0.6, 0.9], [1, 1, 0]);
  const heroImageY = useTransform(heroProgress, [0, 0.8], [0, 50]);

  const heroTitleOpacity = useTransform(heroProgress, [0, 0.4], [1, 0]);
  const heroTitleScale = useTransform(heroProgress, [0, 0.4], [1, 0.8]);
  const heroTitleY = useTransform(heroProgress, [0, 0.4], [0, -50]);

  // 2. Overview Overview Intro Sequence
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start center", "end center"]
  });

  const introTextScale = useTransform(introProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const introTextOpacity = useTransform(introProgress, [0, 0.5, 1], [0, 1, 0]);

  // 3. Timeline Progress
  const stepsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">ไม่พบเครื่องมือ</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            กลับไปหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    Intermediate: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Advanced: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  };

  const badgeBaseStyles = "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md";

  const difficultyLabels = {
    Beginner: 'ระดับ: เริ่มต้น',
    Intermediate: 'ระดับ: ปานกลาง',
    Advanced: 'ระดับ: ขั้นสูง',
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-white/30 relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white/50 z-[100] origin-left mix-blend-difference"
        style={{ scaleX: stepsProgress }}
      />

      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Apple-style minimalist transparent Nav */}
      <nav className="fixed top-0 z-50 w-full bg-black/50 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>กลับไปหน้าที่แล้ว</span>
          </button>

          <img
            src="/images/LogoDEPA-01.png"
            alt="depa logo"
            className="h-6 opacity-80 hover:opacity-100 transition-opacity drop-shadow-md bg-white p-0.5 rounded cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
      </nav>

      <main className="relative z-10 bg-black">

        {/* 1. Hero Section - Sticky Scroll Sequence (Apple Style) */}
        <section ref={heroRef} className="relative h-[200vh] bg-black">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden pt-16 gap-8">

            <motion.div
              style={{ scale: heroImageScale, opacity: heroImageOpacity, y: heroImageY }}
              className="relative z-0 flex items-center justify-center pointer-events-none mt-10 md:mt-20"
            >
              <div className="relative w-[320px] h-[180px] md:w-[512px] md:h-[288px] flex items-center justify-center overflow-visible">
                <div className="absolute inset-0 bg-blue-500/30 blur-[80px] rounded-[2rem]" />
                
                {tool.imageUrl ? (
                  <div className="w-full h-full bg-[#0a0a0a] rounded-[2rem] relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden group border border-white/10">
                    <img
                      src={tool.imageUrl}
                      alt={`${tool.name} logo`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#1a1a1a] rounded-[2rem] relative z-10 flex items-center justify-center shadow-2xl border border-white/10">
                    <Fingerprint className="w-24 h-24 text-slate-500" />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: heroTitleOpacity, scale: heroTitleScale, y: heroTitleY }}
              className="relative z-10 flex flex-col items-center text-center px-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-sm leading-tight">
                {tool.name}
              </h1>
              <p className="text-lg md:text-3xl text-white/70 max-w-3xl font-medium tracking-tight mb-8">
                {tool.tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/10 text-white border border-white/20">
                  {difficultyLabels[tool.difficulty]}
                </span>
                <span className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/10 text-white border border-white/20">
                  {tool.price === 'Free' ? 'ฟรี' : tool.price === 'Paid' ? 'เสียเงิน' : 'ฟรี + เสียเงิน'}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/10 text-white border border-white/20 uppercase tracking-widest text-[10px]">
                    {categories.find((c: any) => c.category_id === tool.category)?.name || tool.category}
                  </span>
                  {tool.categoryIds?.map(catId => {
                    if (catId === tool.category) return null;
                    const catName = categories.find((c: any) => c.category_id === catId)?.name || catId;
                    return (
                      <span key={catId} className="px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/10 text-white border border-white/20 uppercase tracking-widest text-[10px]">
                        {catName}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Apple Style Intro Cinematic Text */}
        <section ref={introRef} className="h-[150vh] bg-black relative">
          <div className="sticky top-0 h-screen flex items-center justify-center px-6">
            <motion.h2
              style={{ scale: introTextScale, opacity: introTextOpacity }}
              className="text-4xl md:text-7xl font-semibold text-center leading-tight tracking-tight text-white max-w-5xl"
            >
              ออกแบบมาเพื่อการ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">สร้างสรรค์</span> <br />
              ไม่มีขีดจำกัด.
            </motion.h2>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">

          {/* 2. Features Cards */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">AI นี้ช่วยคุณทำอะไรได้บ้าง</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {tool.whatItDoes.map((item, index) => {
                const gradients = [
                  "from-blue-500 to-cyan-400",
                  "from-purple-500 to-pink-500",
                  "from-emerald-400 to-teal-400",
                  "from-orange-400 to-rose-400",
                  "from-indigo-500 to-purple-500"
                ];
                const bgGradient = gradients[index % gradients.length];
                const shadowColor = [
                  "rgba(56,189,248,0.4)", // sky
                  "rgba(217,70,239,0.4)", // fuchsia
                  "rgba(52,211,153,0.4)", // emerald
                  "rgba(251,113,133,0.4)", // rose
                  "rgba(168,85,247,0.4)"  // purple
                ][index % gradients.length];

                return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  key={index}
                  className="relative group transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                  style={{ '--hover-shadow': shadowColor } as any}
                >
                  {/* Outer Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
                  
                  {/* Card Border wrapper */}
                  <div className="relative p-[1.5px] rounded-[2.5rem] bg-white/10 group-hover:bg-transparent transition-colors duration-500 overflow-hidden h-full">
                    {/* Active Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Inner Content Card */}
                    <div className="relative h-full bg-[#0A0A0B] group-hover:bg-[#111113]/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] flex flex-col min-h-[260px] transition-all duration-500 overflow-hidden border border-transparent group-hover:border-white/5">
                      {/* Background Massive Icon */}
                      <div className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 transform rotate-12 group-hover:rotate-0 scale-50 group-hover:scale-100 pointer-events-none">
                        <CheckCircle2 className="w-72 h-72 text-white" />
                      </div>

                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white/60 group-hover:scale-110 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-[0_0_30px_var(--hover-shadow)] group-hover:border-white/30">
                        <Sparkles className="w-8 h-8 drop-shadow-lg" />
                      </div>
                      
                      <h3 className="text-2xl md:text-[1.75rem] font-bold text-white/80 group-hover:text-white leading-snug transition-colors duration-300 relative z-10 flex-1 flex items-start">
                        {item}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              )})}
            </div>
          </motion.section>

          {/* 3. Step-by-step Usage - Scroll-driven Timeline */}
          <section ref={stepsRef} className="space-y-8 relative">

            {/* Background Timeline Line */}
            <div className="absolute left-[2.85rem] md:left-[3.8rem] top-24 bottom-10 w-px bg-white/10 hidden md:block" />

            {/* Scroll-driven Progress Fill Line */}
            <motion.div
              className="absolute left-[2.85rem] md:left-[3.8rem] top-24 bottom-10 w-[2px] bg-white hidden md:block origin-top z-10"
              style={{ scaleY: stepsProgress }}
            />

            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">วิธีใช้งาน.</h2>
            </div>

            <div className="space-y-6">
              {tool.howToUse.map((step, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  key={step.step}
                  className="flex flex-col md:flex-row gap-8 md:items-center group relative z-20"
                >
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center font-semibold text-2xl text-white shadow-xl group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 md:ml-3">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-white/80 text-xl md:text-3xl font-medium tracking-tight leading-snug">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4 & 5. Use Cases & Difficulty Side-by-Side - High Contrast Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-10 md:p-14 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.05)] transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
                    <Zap className="w-8 h-8" />
                  </div>
                  ตัวอย่างการใช้งานจริง
                </h2>
                <ul className="space-y-6">
                  {tool.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-3 flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                      <span className="text-xl md:text-2xl text-white/80 leading-snug font-medium tracking-tight">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="p-10 md:p-14 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.05)] transition-all duration-500 relative overflow-hidden flex flex-col justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl w-fit mb-8">
                  <Layers className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
                  ทำไมถึงเป็น <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{difficultyLabels[tool.difficulty]}</span>?
                </h2>
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium tracking-tight">
                  {tool.difficultyExplanation}
                </p>
              </div>
            </motion.section>
          </div>

          {/* 6. Pricing & Plans */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">แพ็กเกจ & ราคา (รายเดือน)</h2>
              <p className="text-xl text-slate-400 text-center max-w-2xl mx-auto">{tool.pricingDetails}</p>
            </div>

            {tool.plans && tool.plans.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tool.plans.map((plan, idx) => {
                  const isPopular = plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('premium') || plan.name.toLowerCase().includes('standard');
                  return (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    key={idx}
                    className={`flex flex-col p-8 md:p-10 rounded-[2rem] backdrop-blur-xl bg-white/[0.02] border transition-all duration-500 relative group hover:-translate-y-2 ${isPopular ? 'border-blue-500/50 shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)]' : 'border-white/10 hover:border-white/30 hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]'}`}
                  >
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 whitespace-nowrap z-20">
                        <Sparkles className="w-3.5 h-3.5" /> แนะนำ
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight mb-2">
                        {plan.price}
                      </div>

                      <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent my-8" />

                      <p className="text-white/80 font-medium mb-8 flex-1 leading-relaxed text-base">{plan.features}</p>

                      <div className="pt-6 border-t border-white/10 text-sm mt-auto">
                        {plan.forOrg === true ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 px-4 py-3 rounded-xl">
                            <CheckCircle2 className="w-5 h-5" /> เหมาะสำหรับองค์กร
                          </span>
                        ) : plan.forOrg === 'warning' ? (
                          <span className="text-amber-400 font-bold flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 px-4 py-3 rounded-xl">
                            <Settings className="w-5 h-5" /> ส่วนตัว / ทีมขนาดเล็ก
                          </span>
                        ) : (
                          <span className="text-slate-400 font-bold flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                            <X className="w-5 h-5" /> ไม่เหมาะสำหรับองค์กร
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )})}
              </div>
            )}

            {tool.orgSuitability && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-12 p-8 md:p-10 rounded-[2rem] bg-[#1a1a1a] flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                <div className="p-4 bg-white/10 rounded-full flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-white text-xl font-bold mb-2 tracking-tight">คำแนะนำสำหรับองค์กร</h4>
                  <p className="text-white/70 text-lg leading-relaxed">{tool.orgSuitability}</p>
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* 7. CTA Section - Apple Style Minimalist & Massive */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-32 pb-48 text-center"
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center">

              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
                พร้อมที่จะลอง <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">{tool.name}</span> แล้วหรือยัง?
              </h2>
              <p className="text-xl text-slate-400 mb-10">
                เริ่มต้นใช้งานและปลดล็อกศักยภาพของคุณด้วย AI
              </p>

              <a
                href={tool.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-full font-bold text-xl md:text-2xl transition-all duration-300 hover:scale-105"
              >
                ไปที่เว็บไซต์อย่างเป็นทางการ
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}