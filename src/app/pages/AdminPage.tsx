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
  MessageSquareCode
} from 'lucide-react';
import { AITool } from '../data/aiTools';
import { AIPrompt } from '../data/prompts';

export default function AdminPage() {
  const { isAdmin, aiTools, prompts, addTool, updateTool, deleteTool, addPrompt, updatePrompt, deletePrompt } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tools' | 'prompts'>('tools');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [toolFormData, setToolFormData] = useState<AITool>({
    id: '',
    name: '',
    tagline: '',
    description: '',
    category: 'write-content',
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
  });

  const [promptFormData, setPromptFormData] = useState<AIPrompt>({
    id: '',
    title: '',
    prompt: '',
    category: 'writing',
    tags: []
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

  const resetToolForm = () => {
    setToolFormData({
      id: '',
      name: '',
      tagline: '',
      description: '',
      category: 'write-content',
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
    });
    setEditingId(null);
    setShowForm(false);
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
      category: 'writing',
      tags: []
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
    } else {
      if (editingId) {
        updatePrompt(editingId, promptFormData);
      } else {
        addPrompt(promptFormData);
      }
      resetPromptForm();
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

  const handleCancel = () => {
    if (activeTab === 'tools') resetToolForm();
    else resetPromptForm();
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
                    <LayoutGrid className="w-4 h-4" /> AI Tools
                  </button>
                  <button
                    onClick={() => setActiveTab('prompts')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 ${activeTab === 'prompts' ? 'bg-white text-[#0C2F53] shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
                  >
                    <MessageSquareCode className="w-4 h-4" /> Prompts
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
                  ? (activeTab === 'tools' ? 'แก้ไขเครื่องมือ' : 'แก้ไขคำสั่ง Prompt')
                  : (activeTab === 'tools' ? 'เพิ่มเครื่องมือใหม่' : 'เพิ่มคำสั่ง Prompt ใหม่')}
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
                <>
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        รหัสเครื่องมือ *
                      </label>
                      <input
                        type="text"
                        required
                        value={toolFormData.id}
                        onChange={(e) => handleToolInputChange('id', e.target.value)}
                        disabled={!!editingId}
                        placeholder="เช่น chatgpt"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ชื่อเครื่องมือ *
                      </label>
                      <input
                        type="text"
                        required
                        value={toolFormData.name}
                        onChange={(e) => handleToolInputChange('name', e.target.value)}
                        placeholder="เช่น ChatGPT"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        หมวดหมู่ *
                      </label>
                      <select
                        required
                        value={toolFormData.category}
                        onChange={(e) => handleToolInputChange('category', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="write-content">เขียนเนื้อหา</option>
                        <option value="create-images">สร้างภาพ</option>
                        <option value="make-videos">สร้างวิดีโอ</option>
                        <option value="business-documents">ธุรกิจและเอกสาร</option>
                        <option value="coding-automation">เขียนโค้ดและระบบอัตโนมัติ</option>
                        <option value="brainstorm-ideas">ระดมความคิด</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ระดับความยาก *
                      </label>
                      <select
                        required
                        value={toolFormData.difficulty}
                        onChange={(e) => handleToolInputChange('difficulty', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Beginner">เริ่มต้น</option>
                        <option value="Intermediate">ปานกลาง</option>
                        <option value="Advanced">ขั้นสูง</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ราคา *
                      </label>
                      <select
                        required
                        value={toolFormData.price}
                        onChange={(e) => handleToolInputChange('price', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Free">ฟรี</option>
                        <option value="Paid">เสียเงิน</option>
                        <option value="Free + Paid">ฟรี + เสียเงิน</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        เว็บไซต์อย่างเป็นทางการ *
                      </label>
                      <input
                        type="url"
                        required
                        value={toolFormData.officialWebsite}
                        onChange={(e) => handleToolInputChange('officialWebsite', e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        URL รูปภาพ (เลือกได้)
                      </label>
                      <input
                        type="text"
                        value={toolFormData.imageUrl || ''}
                        onChange={(e) => handleToolInputChange('imageUrl', e.target.value)}
                        placeholder="https://... หรือ /images/..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      คำโปรย *
                    </label>
                    <input
                      type="text"
                      required
                      value={toolFormData.tagline}
                      onChange={(e) => handleToolInputChange('tagline', e.target.value)}
                      placeholder="คำอธิบายสั้นๆ ในหนึ่งประโยค"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      คำอธิบายในการ์ด *
                    </label>
                    <textarea
                      required
                      value={toolFormData.description}
                      onChange={(e) => handleToolInputChange('description', e.target.value)}
                      placeholder="คำอธิบายสั้นๆ สำหรับการ์ด"
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Array Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        เหมาะสำหรับ (บรรทัดละหนึ่งรายการ) *
                      </label>
                      <textarea
                        required
                        value={toolFormData.bestFor.join('\n')}
                        onChange={(e) => handleToolArrayInput('bestFor', e.target.value)}
                        placeholder="พนักงานออฟฟิศ&#10;นักการตลาด&#10;นักออกแบบ"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ทำอะไรได้บ้าง (บรรทัดละหนึ่งรายการ) *
                      </label>
                      <textarea
                        required
                        value={toolFormData.whatItDoes.join('\n')}
                        onChange={(e) => handleToolArrayInput('whatItDoes', e.target.value)}
                        placeholder="เขียนอีเมล&#10;สร้างคอนเทนต์&#10;ตอบคำถาม"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        เหมาะกับใคร (บรรทัดละหนึ่งรายการ) *
                      </label>
                      <textarea
                        required
                        value={toolFormData.whoItsFor.join('\n')}
                        onChange={(e) => handleToolArrayInput('whoItsFor', e.target.value)}
                        placeholder="คนที่ต้องเขียนอีเมล&#10;นักการตลาดที่สร้างคอนเทนต์"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ตัวอย่างการใช้งาน (บรรทัดละหนึ่งรายการ) *
                      </label>
                      <textarea
                        required
                        value={toolFormData.useCases.join('\n')}
                        onChange={(e) => handleToolArrayInput('useCases', e.target.value)}
                        placeholder="เขียนอีเมลอย่างมืออาชีพ&#10;สร้างโพสต์โซเชียลมีเดีย"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      วิธีใช้งาน (บรรทัดละหนึ่งขั้นตอน) *
                    </label>
                    <textarea
                      required
                      value={toolFormData.howToUse.map(step => step.text).join('\n')}
                      onChange={(e) => handleToolStepsInput(e.target.value)}
                      placeholder="สมัครบัญชี&#10;พิมพ์คำถามของคุณ&#10;รับคำตอบ"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      คำอธิบายระดับความยาก *
                    </label>
                    <textarea
                      required
                      value={toolFormData.difficultyExplanation}
                      onChange={(e) => handleToolInputChange('difficultyExplanation', e.target.value)}
                      placeholder="อธิบายว่าทำไมเครื่องมือนี้ง่าย/ปานกลาง/ยาก ต่อการใช้งาน"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      รายละเอียดราคา *
                    </label>
                    <textarea
                      required
                      value={toolFormData.pricingDetails}
                      onChange={(e) => handleToolInputChange('pricingDetails', e.target.value)}
                      placeholder="อธิบายรูปแบบราคา"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'prompts' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        รหัส Prompt (ID) *
                      </label>
                      <input
                        type="text"
                        required
                        value={promptFormData.id}
                        onChange={(e) => handlePromptInputChange('id', e.target.value)}
                        disabled={!!editingId}
                        placeholder="เช่น p1"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ชื่อเรื่อง (Title) *
                      </label>
                      <input
                        type="text"
                        required
                        value={promptFormData.title}
                        onChange={(e) => handlePromptInputChange('title', e.target.value)}
                        placeholder="เช่น เขียนจดหมายสมัครงาน"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        หมวดหมู่ *
                      </label>
                      <select
                        required
                        value={promptFormData.category}
                        onChange={(e) => handlePromptInputChange('category', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="image-gen">สร้างภาพ (Image Gen)</option>
                        <option value="marketing">การตลาด (Marketing)</option>
                        <option value="writing">งานเขียน (Writing)</option>
                        <option value="coding">เขียนโค้ด (Coding)</option>
                        <option value="education">การศึกษา (Education)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        คำค้นหา (Tags) (แยกรายการด้วยคอมม่า)
                      </label>
                      <input
                        type="text"
                        value={promptFormData.tags.join(', ')}
                        onChange={(e) => handlePromptArrayInput('tags', e.target.value)}
                        placeholder="ChatGPT, Claude, Gemini"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      เนื้อหาคำสั่ง (Prompt) *
                    </label>
                    <textarea
                      required
                      value={promptFormData.prompt}
                      onChange={(e) => handlePromptInputChange('prompt', e.target.value)}
                      placeholder="รายละเอียดของคำสั่ง"
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
}