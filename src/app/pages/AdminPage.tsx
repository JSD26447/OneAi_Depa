import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Shield,
  LayoutGrid,
  MessageSquareCode,
  Folder,
  Info,
  List,
  Tags,
  Image as ImageIcon,
  DollarSign,
  Link as LinkIcon,
  CheckSquare,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { AITool } from '../data/aiTools';
import { AIPrompt } from '../data/prompts';

export default function AdminPage() {
  const { isAdmin, aiTools, prompts, categories, addTool, updateTool, deleteTool, addPrompt, updatePrompt, deletePrompt, addCategory, updateCategory, deleteCategory } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tools' | 'prompts' | 'categories'>('tools');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [toolFormData, setToolFormData] = useState<AITool>({
    id: '',
    name: '',
    tagline: '',
    description: '',
    category: '',
    provider: '',
    categoryIds: [],
    subCategories: [],
    bestFor: [],
    difficulty: 'Beginner',
    price: 'Free',
    whatItDoes: [],
    whoItsFor: [],
    howToUse: [],
    useCases: [],
    difficultyExplanation: '',
    pricingDetails: '',
    officialWebsite: '',
    imageUrl: '',
    plans: [],
    orgSuitability: '',
  });

  const [promptFormData, setPromptFormData] = useState<AIPrompt>({
    id: '',
    title: '',
    prompt: '',
    category: '',
    categoryIds: [],
    tags: []
  });

  const [categoryFormData, setCategoryFormData] = useState<any>({
    id: '',
    type: 'ai',
    category_id: '',
    name: '',
    icon: 'Menu'
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  // --- Tool Handlers ---
  const handleToolInputChange = (field: string, value: any) => {
    setToolFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToolArrayInput = (field: keyof AITool, value: string) => {
    const items = value.split('\n').filter(item => item.trim());
    setToolFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleToolStepsInput = (value: string) => {
    const steps = value.split('\n').filter(item => item.trim()).map((text, index) => ({
      step: index + 1,
      text: text.trim(),
    }));
    setToolFormData(prev => ({ ...prev, howToUse: steps }));
  };

  const handleAddPlan = () => {
    setToolFormData(prev => ({
      ...prev,
      plans: [...(prev.plans || []), { name: '', price: '', forOrg: false, features: '' }]
    }));
  };

  const handleRemovePlan = (index: number) => {
    setToolFormData(prev => ({
      ...prev,
      plans: (prev.plans || []).filter((_, i) => i !== index)
    }));
  };

  const handlePlanChange = (index: number, field: string, value: any) => {
    setToolFormData(prev => {
      const newPlans = [...(prev.plans || [])];
      newPlans[index] = { ...newPlans[index], [field]: value };
      return { ...prev, plans: newPlans };
    });
  };

  const resetToolForm = () => {
    setToolFormData({
      id: '',
      name: '',
      tagline: '',
      description: '',
      category: '',
      provider: '',
      categoryIds: [],
      subCategories: [],
      bestFor: [],
      difficulty: 'Beginner',
      price: 'Free',
      whatItDoes: [],
      whoItsFor: [],
      howToUse: [],
      useCases: [],
      difficultyExplanation: '',
      pricingDetails: '',
      officialWebsite: '',
      imageUrl: '',
      plans: [],
      orgSuitability: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        const fullUrl = `http://localhost:5000${data.imageUrl}`;
        handleToolInputChange('imageUrl', fullUrl);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  // --- Prompt Handlers ---
  const handlePromptInputChange = (field: string, value: any) => {
    setPromptFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePromptArrayInput = (field: keyof AIPrompt, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setPromptFormData(prev => ({ ...prev, [field]: items }));
  };

  const resetPromptForm = () => {
    setPromptFormData({
      id: '',
      title: '',
      prompt: '',
      category: '',
      categoryIds: [],
      tags: []
    });
    setEditingId(null);
    setShowForm(false);
  };

  // --- Category Handlers ---
  const handleCategoryInputChange = (field: string, value: any) => {
    setCategoryFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      id: '',
      type: 'ai',
      category_id: '',
      name: '',
      icon: 'Menu'
    });
    setEditingId(null);
    setShowForm(false);
  };

  // --- Submit Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'tools') {
      if (editingId) {
        updateTool(editingId, toolFormData);
      } else {
        addTool(toolFormData);
      }
      resetToolForm();
    } else if (activeTab === 'prompts') {
      if (editingId) {
        updatePrompt(editingId, promptFormData);
      } else {
        addPrompt(promptFormData);
      }
      resetPromptForm();
    } else {
      if (editingId) {
        updateCategory(editingId, categoryFormData);
      } else {
        addCategory(categoryFormData);
      }
      resetCategoryForm();
    }
  };

  const handleEditTool = (tool: AITool) => {
    setToolFormData(tool);
    setEditingId(tool.id);
    setShowForm(true);
  };

  const handleEditPrompt = (prompt: AIPrompt) => {
    setPromptFormData(prompt);
    setEditingId(prompt.id);
    setShowForm(true);
  };

  const handleEditCategory = (cat: any) => {
    setCategoryFormData(cat);
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleDeleteTool = (id: string, db_id?: number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเครื่องมือนี้?')) {
      deleteTool(id, db_id);
    }
  };

  const handleDeletePrompt = (id: string, db_id?: number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบคำสั่ง Prompt นี้?')) {
      deletePrompt(id, db_id);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?')) {
      deleteCategory(id);
    }
  };

  const handleCancel = () => {
    if (activeTab === 'tools') resetToolForm();
    else if (activeTab === 'prompts') resetPromptForm();
    else resetCategoryForm();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {/* Header */}
      <header className="bg-[#0C2F53] text-white border-b border-white/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#FFF200]" />
                  <h1 className="text-2xl font-black tracking-tight">ระบบจัดการ <span className="text-[#FFF200]">Data</span></h1>
                </div>
                <p className="text-blue-200/60 text-sm font-medium">สำหรับเจ้าหน้าที่ depa</p>
              </div>
            </div>

            {!showForm && (
              <div className="flex gap-4">
                <div className="bg-white/10 rounded-xl p-1 flex">
                  <button
                    onClick={() => setActiveTab('tools')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${activeTab === 'tools' ? 'bg-white text-[#0C2F53] shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
                  >
                    <LayoutGrid className="w-4 h-4" /> AI Tools ({aiTools.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('prompts')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${activeTab === 'prompts' ? 'bg-white text-[#0C2F53] shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
                  >
                    <MessageSquareCode className="w-4 h-4" /> Prompts ({prompts.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${activeTab === 'categories' ? 'bg-white text-[#0C2F53] shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
                  >
                    <Folder className="w-4 h-4" /> หมวดหมู่ ({categories.length})
                  </button>
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-[#FFF200] text-[#0C2F53] px-6 py-2 rounded-xl hover:bg-[#FFC600] transition-all font-bold shadow-lg shadow-[#FFF200]/10"
                >
                  <Plus className="w-5 h-5" />
                  เพิ่มข้อมูล
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          /* Add/Edit Form */
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingId
                  ? (activeTab === 'tools' ? 'แก้ไขเครื่องมือ' : activeTab === 'prompts' ? 'แก้ไขคำสั่ง Prompt' : 'แก้ไขหมวดหมู่')
                  : (activeTab === 'tools' ? 'เพิ่มเครื่องมือใหม่' : activeTab === 'prompts' ? 'เพิ่มคำสั่ง Prompt ใหม่' : 'เพิ่มหมวดหมู่ใหม่')}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 dark:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'tools' && (
                <div className="space-y-8">
                  {/* --- Card 1: ข้อมูลทั่วไป (General Information) --- */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0C2F53] dark:bg-[#FFF200]"></div>
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="bg-[#0C2F53] dark:bg-[#FFF200] p-2 rounded-lg text-white dark:text-[#0C2F53] shadow-md">
                        <LayoutGrid className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">1. ข้อมูลทั่วไป (General Info)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          รหัสเครื่องมือ (ID) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={toolFormData.id}
                          onChange={(e) => handleToolInputChange('id', e.target.value)}
                          disabled={!!editingId}
                          placeholder="เช่น chatgpt (ใช้อักษรภาษาอังกฤษตัวเล็ก)"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C2F53] dark:focus:ring-[#FFF200] disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ชื่อเครื่องมือ (Name) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={toolFormData.name}
                          onChange={(e) => handleToolInputChange('name', e.target.value)}
                          placeholder="เช่น ChatGPT"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C2F53] dark:focus:ring-[#FFF200] transition-all font-medium"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ผู้ให้บริการ/บริษัทผู้พัฒนา (Provider)
                        </label>
                        <input
                          list="providers-list"
                          value={toolFormData.provider || ''}
                          onChange={(e) => handleToolInputChange('provider', e.target.value)}
                          placeholder="พิมพ์เลือกหรือเพิ่มเอง เช่น Google, OpenAI, Microsoft..."
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C2F53] dark:focus:ring-[#FFF200] transition-all font-medium"
                        />
                        <datalist id="providers-list">
                          <option value="Microsoft" />
                          <option value="Google" />
                          <option value="OpenAI" />
                          <option value="Anthropic" />
                          <option value="Canva" />
                          <option value="Asana" />
                          <option value="Other" />
                        </datalist>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          เว็บไซต์อย่างเป็นทางการ (URL) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LinkIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            required
                            value={toolFormData.officialWebsite}
                            onChange={(e) => handleToolInputChange('officialWebsite', e.target.value)}
                            placeholder="https://example.com"
                            className="w-full pl-10 px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C2F53] dark:focus:ring-[#FFF200] transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          รูปภาพโลโก้ (อัปโหลด หรือใส่ URL)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={toolFormData.imageUrl || ''}
                            onChange={(e) => handleToolInputChange('imageUrl', e.target.value)}
                            placeholder="https://... หรือ /images/..."
                            className="flex-1 w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0C2F53] dark:focus:ring-[#FFF200] transition-all font-medium"
                          />
                          <label className="cursor-pointer bg-[#FFF200] hover:bg-[#FFC600] text-[#0C2F53] px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center whitespace-nowrap shadow-sm hover:shadow-md border border-[#FFF200]">
                            {isUploading ? 'กำลังอัปโหลด...' : <><ImageIcon className="w-5 h-5 mr-2" /> อัปโหลด</>}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              disabled={isUploading}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- Card 2: การจัดหมวดหมู่ (Categorization) --- */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="bg-green-500 p-2 rounded-lg text-white shadow-md">
                        <Folder className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">2. การจัดหมวดหมู่ (Categorization)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          หมวดหมู่หลัก (Main Category) <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={toolFormData.category}
                          onChange={(e) => handleToolInputChange('category', e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium mb-4"
                        >
                          <option value="">เลือกหมวดหมู่</option>
                          {categories.filter((c: any) => c.type === 'ai').map((c: any) => (
                            <option key={c.category_id} value={c.category_id}>{c.name}</option>
                          ))}
                        </select>

                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 mt-4">
                          หมวดหมู่เพิ่มเติม (Multiple Categories)
                        </label>
                        <select
                          multiple
                          value={toolFormData.categoryIds || []}
                          onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions, option => option.value);
                            handleToolInputChange('categoryIds', options);
                          }}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium min-h-[140px]"
                        >
                          {categories.filter((c: any) => c.type === 'ai').map((c: any) => (
                            <option key={c.category_id} value={c.category_id} className="py-1 px-2 mb-1 hover:bg-green-50 dark:hover:bg-green-900/40 rounded-md">
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-2 font-medium bg-slate-100 dark:bg-slate-800 p-2 rounded-lg"><Info className="inline w-3 h-3 mr-1" /> กด Ctrl (Windows) หรือ Cmd (Mac) ค้างไว้เพื่อเลือกหลายรายการ</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          หมวดหมู่ย่อยเพิ่มเติม (แยกด้วยบรรทัดใหม่)
                        </label>
                        <textarea
                          value={(toolFormData.subCategories || []).join('\n')}
                          onChange={(e) => handleToolArrayInput('subCategories', e.target.value)}
                          placeholder="เช่น ร่างเนื้อหาหนังสือส่งออก&#10;ร่างสัญญา TOR, MOU"
                          rows={8}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Card 3: รายละเอียดความสามารถ (Details) --- */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="bg-blue-500 p-2 rounded-lg text-white shadow-md">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">3. รายละเอียดและราคา (Details & Pricing)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ระดับความยาก <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={toolFormData.difficulty}
                          onChange={(e) => handleToolInputChange('difficulty', e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        >
                          <option value="Beginner">เริ่มต้น (Beginner)</option>
                          <option value="Intermediate">ปานกลาง (Intermediate)</option>
                          <option value="Advanced">ขั้นสูง (Advanced)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ราคา <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={toolFormData.price}
                          onChange={(e) => handleToolInputChange('price', e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        >
                          <option value="Free">ฟรี (Free)</option>
                          <option value="Paid">เสียเงิน (Paid)</option>
                          <option value="Free + Paid">ฟรี + เสียเงิน (Freemium)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          คำโปรย <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={toolFormData.tagline}
                          onChange={(e) => handleToolInputChange('tagline', e.target.value)}
                          placeholder="คำอธิบายสั้นๆ ในหนึ่งประโยค"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          คำอธิบายในการ์ด <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={toolFormData.description}
                          onChange={(e) => handleToolInputChange('description', e.target.value)}
                          placeholder="คำอธิบายสั้นๆ สำหรับการ์ด"
                          rows={2}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Card 4: คุณสมบัติการใช้งาน (Features & Usage) --- */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="bg-purple-500 p-2 rounded-lg text-white shadow-md">
                        <List className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">4. คุณสมบัติการใช้งาน (Features & Usage)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          เหมาะสำหรับใคร (Best For) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={toolFormData.bestFor.join('\n')}
                          onChange={(e) => handleToolArrayInput('bestFor', e.target.value)}
                          placeholder="พนักงานออฟฟิศ&#10;นักการตลาด&#10;นักออกแบบ"
                          rows={3}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium leading-relaxed"
                        />
                        <p className="text-xs text-slate-500 mt-2">พิมพ์ 1 รายการต่อบรรทัด (กด Enter เพื่อขึ้นบรรทัดใหม่)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ทำอะไรได้บ้าง (What it Does) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={toolFormData.whatItDoes.join('\n')}
                          onChange={(e) => handleToolArrayInput('whatItDoes', e.target.value)}
                          placeholder="เขียนอีเมล&#10;สร้างคอนเทนต์"
                          rows={4}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          เหมาะกับใคร (Who it's For) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={toolFormData.whoItsFor.join('\n')}
                          onChange={(e) => handleToolArrayInput('whoItsFor', e.target.value)}
                          placeholder="คนที่ต้องการ...&#10;ทีมการตลาด"
                          rows={4}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium leading-relaxed"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ตัวอย่างการใช้งาน (Use Cases) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={toolFormData.useCases.join('\n')}
                          onChange={(e) => handleToolArrayInput('useCases', e.target.value)}
                          placeholder="เขียนอีเมลอย่างมืออาชีพ&#10;ร่างสัญญา"
                          rows={4}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium leading-relaxed"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          วิธีใช้งานทีละขั้นตอน (How to Use) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={toolFormData.howToUse.map(step => step.text).join('\n')}
                          onChange={(e) => handleToolStepsInput(e.target.value)}
                          placeholder="1. สมัครบัญชี&#10;2. พิมพ์คำถาม"
                          rows={4}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Card 5: ข้อมูลเปรียบเทียบเชิงลึก (Comparison Data) --- */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500"></div>
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="bg-orange-500 p-2 rounded-lg text-white shadow-md">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">5. ข้อมูลเปรียบเทียบเชิงลึก (Comparison Data)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          คำอธิบายระดับความยาก (Difficulty Explanation)
                        </label>
                        <textarea
                          required
                          value={toolFormData.difficultyExplanation}
                          onChange={(e) => handleToolInputChange('difficultyExplanation', e.target.value)}
                          placeholder="ทำไมเครื่องมือนี้ถึงใช้งาน ง่าย/ปานกลาง/ยาก..."
                          rows={3}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          คำอธิบายและเงื่อนไขราคา (Pricing Details)
                        </label>
                        <textarea
                          required
                          value={toolFormData.pricingDetails}
                          onChange={(e) => handleToolInputChange('pricingDetails', e.target.value)}
                          placeholder="เช่น มีแบบฟรีแบบจำกัดการใช้งาน..."
                          rows={3}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* --- Card 6: แพ็กเกจ & สำหรับองค์กร (Plans & Enterprise) --- */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-500"></div>
                    <div className="flex items-center justify-between mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-pink-500 p-2 rounded-lg text-white shadow-md">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">6. แพ็กเกจและองค์กร (Plans & Enterprise)</h3>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddPlan}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#0C2F53] text-white rounded-xl text-sm hover:bg-[#0C2F53]/90 transition-colors font-bold shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> เพิ่มแพ็กเกจ
                      </button>
                    </div>

                    <div className="space-y-4 mb-8">
                      {(toolFormData.plans || []).map((plan, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-pink-100 dark:border-pink-900/30 relative flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                          <button
                            type="button"
                            onClick={() => handleRemovePlan(index)}
                            className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">ชื่อแพ็กเกจ</label>
                              <input
                                type="text"
                                value={plan.name}
                                onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
                                placeholder="เช่น Copilot Pro"
                                className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">ราคา</label>
                              <input
                                type="text"
                                value={plan.price}
                                onChange={(e) => handlePlanChange(index, 'price', e.target.value)}
                                placeholder="เช่น ~$20/เดือน"
                                className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">ความเหมาะสมองค์กร</label>
                              <select
                                value={plan.forOrg === true ? 'true' : plan.forOrg === 'warning' ? 'warning' : 'false'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  handlePlanChange(index, 'forOrg', val === 'true' ? true : val === 'warning' ? 'warning' : false);
                                }}
                                className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium transition-all"
                              >
                                <option value="false">ไม่เหมาะกับองค์กร</option>
                                <option value="warning">ส่วนตัว / ทีมขนาดเล็ก</option>
                                <option value="true">เหมาะสำหรับองค์กร 100%</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">รายละเอียด (Features)</label>
                              <textarea
                                value={plan.features}
                                onChange={(e) => handlePlanChange(index, 'features', e.target.value)}
                                placeholder="เช่น ส่วนบุคคล หรือ ใช้ใน Word, Excel, Teams"
                                rows={2}
                                className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 font-medium transition-all shrink-0"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {(!toolFormData.plans || toolFormData.plans.length === 0) && (
                        <div className="text-sm text-center text-slate-500 dark:text-slate-400 py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl leading-relaxed">
                          <DollarSign className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                          ยังไม่มีข้อมูลแพ็กเกจย่อยที่ระบุ
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        คำแนะนำพิเศษสำหรับองค์กร (Enterprise Note) <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                      </label>
                      <textarea
                        value={toolFormData.orgSuitability || ''}
                        onChange={(e) => handleToolInputChange('orgSuitability', e.target.value)}
                        placeholder="เช่น ข้อควรระวังด้าน Data Privacy หรือเหตุผลที่ควรเลือกใช้แบบองค์กร"
                        rows={3}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'prompts' && (
                <div className="space-y-8">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="bg-blue-500 p-2 rounded-lg text-white shadow-md">
                        <MessageSquareCode className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">ข้อมูลคำสั่ง (Prompt Information)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          รหัส Prompt (ID) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={promptFormData.id}
                          onChange={(e) => handlePromptInputChange('id', e.target.value)}
                          disabled={!!editingId}
                          placeholder="เช่น p1"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ชื่อเรื่อง (Title) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={promptFormData.title}
                          onChange={(e) => handlePromptInputChange('title', e.target.value)}
                          placeholder="เช่น เขียนจดหมายสมัครงาน"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          หมวดหมู่หลัก (Main Category) <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={promptFormData.category}
                          onChange={(e) => handlePromptInputChange('category', e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        >
                          <option value="">เลือกหมวดหมู่</option>
                          {categories.filter((c: any) => c.type === 'prompt').map((c: any) => (
                            <option key={c.category_id} value={c.category_id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          คำค้นหา (Tags) <span className="text-gray-400 font-normal ml-1">(แยกด้วยคอมม่า)</span>
                        </label>
                        <input
                          type="text"
                          value={promptFormData.tags.join(', ')}
                          onChange={(e) => handlePromptArrayInput('tags', e.target.value)}
                          placeholder="ChatGPT, Claude, Gemini"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          หมวดหมู่เพิ่มเติม (Multiple Categories)
                        </label>
                        <select
                          multiple
                          value={promptFormData.categoryIds || []}
                          onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions, option => option.value);
                            handlePromptInputChange('categoryIds', options);
                          }}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium min-h-[120px]"
                        >
                          {categories.filter((c: any) => c.type === 'prompt').map((c: any) => (
                            <option key={c.category_id} value={c.category_id} className="py-1 px-2 mb-1 rounded-md">{c.name}</option>
                          ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-2">กด Ctrl (Windows) หรือ Cmd (Mac) ค้างไว้เพื่อเลือกหลายรายการ</p>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          เนื้อหาคำสั่ง (Prompt) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          value={promptFormData.prompt}
                          onChange={(e) => handlePromptInputChange('prompt', e.target.value)}
                          placeholder="รายละเอียดของคำสั่ง"
                          rows={6}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium font-mono text-sm leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="space-y-8">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
                      <div className="bg-green-500 p-2 rounded-lg text-white shadow-md">
                        <Folder className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">ข้อมูลหมวดหมู่ (Category Information)</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ประเภท (Type) <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={categoryFormData.type}
                          onChange={(e) => handleCategoryInputChange('type', e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                        >
                          <option value="ai">AI Tool</option>
                          <option value="prompt">Prompt</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          รหัสหมวดหมู่ (Category ID) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={categoryFormData.category_id}
                          onChange={(e) => handleCategoryInputChange('category_id', e.target.value)}
                          placeholder="เช่น document"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ชื่อหมวดหมู่ (Name) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={categoryFormData.name}
                          onChange={(e) => handleCategoryInputChange('name', e.target.value)}
                          placeholder="เช่น หมวดเอกสาร"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                          ไอคอน (ชื่อจาก lucide-react)
                        </label>
                        <input
                          type="text"
                          value={categoryFormData.icon}
                          onChange={(e) => handleCategoryInputChange('icon', e.target.value)}
                          placeholder="เช่น FileText หรือ Image"
                          className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0C2F53] text-white py-3 rounded-lg hover:bg-[#0C2F53]/90 transition-colors font-medium"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'อัปเดตข้อมูล' : 'เพิ่มข้อมูล'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Tools / Prompts List */
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {activeTab === 'tools' ? `เครื่องมือ AI ทั้งหมด (${aiTools.length})` : `คำสั่ง Prompt ทั้งหมด (${prompts.length})`}
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {activeTab === 'tools' && aiTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                        {tool.imageUrl ? (
                          <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-black text-[#0C2F53] dark:text-white">{tool.name?.[0]}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[#0C2F53] dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3">{tool.tagline}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-[#0C2F53] dark:text-blue-300 rounded-xl text-xs font-bold uppercase tracking-wider">
                            {tool.category}
                          </span>
                          <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-bold uppercase tracking-wider">
                            {tool.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditTool(tool)}
                        className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="แก้ไข"
                      >
                        <Edit className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteTool(tool.id, (tool as any).db_id)}
                        className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="ลบ"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {activeTab === 'prompts' && prompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                        <MessageSquareCode className="w-8 h-8 text-[#0C2F53] dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-[#0C2F53] dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                          {prompt.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-3 max-w-2xl truncate">{prompt.prompt}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-xs font-bold uppercase tracking-wider">
                            {prompt.category}
                          </span>
                          {prompt.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditPrompt(prompt)}
                        className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="แก้ไข"
                      >
                        <Edit className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(prompt.id, (prompt as any).db_id)}
                        className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="ลบ"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {activeTab === 'categories' && categories.map((cat: any) => (
                <div
                  key={cat.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                        <Folder className="w-8 h-8 text-[#0C2F53] dark:text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[#0C2F53] dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3">รหัส: {cat.category_id} | ไอคอน: {cat.icon}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-xl ${cat.type === 'ai' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'}`}>
                            {cat.type === 'ai' ? 'AI Tool' : 'Prompt'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditCategory(cat)}
                        className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="แก้ไข"
                      >
                        <Edit className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-3 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="ลบ"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        }
      </main >
    </div >
  );
}