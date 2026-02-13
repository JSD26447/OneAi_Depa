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
  Shield
} from 'lucide-react';
import { AITool } from '../data/aiTools';

export default function AdminPage() {
  const { isAdmin, aiTools, addTool, updateTool, deleteTool } = useApp();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AITool>({
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

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInput = (field: keyof AITool, value: string) => {
    const items = value.split('\n').filter(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const handleStepsInput = (value: string) => {
    const steps = value.split('\n').filter(item => item.trim()).map((text, index) => ({
      step: index + 1,
      text: text.trim(),
    }));
    setFormData(prev => ({ ...prev, howToUse: steps }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateTool(editingId, formData);
    } else {
      addTool(formData);
    }

    resetForm();
  };

  const handleEdit = (tool: AITool) => {
    setFormData(tool);
    setEditingId(tool.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเครื่องมือนี้?')) {
      deleteTool(id);
    }
  };

  const resetForm = () => {
    setFormData({
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
                  <h1 className="text-2xl font-black tracking-tight">ระบบจัดการ <span className="text-[#FFF200]">AI tools</span></h1>
                </div>
                <p className="text-blue-200/60 text-sm font-medium">สำหรับเจ้าหน้าที่ depa</p>
              </div>
            </div>

            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-[#FFF200] text-[#0C2F53] px-6 py-3 rounded-2xl hover:bg-[#FFC600] transition-all font-bold shadow-lg shadow-[#FFF200]/10"
              >
                <Plus className="w-5 h-5" />
                เพิ่มเครื่องมือใหม่
              </button>
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
                {editingId ? 'แก้ไขเครื่องมือ' : 'เพิ่มเครื่องมือใหม่'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 dark:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    รหัสเครื่องมือ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.id}
                    onChange={(e) => handleInputChange('id', e.target.value)}
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
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
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
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
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
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
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
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
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
                    value={formData.officialWebsite}
                    onChange={(e) => handleInputChange('officialWebsite', e.target.value)}
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
                    value={formData.imageUrl || ''}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
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
                  value={formData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
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
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
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
                    value={formData.bestFor.join('\n')}
                    onChange={(e) => handleArrayInput('bestFor', e.target.value)}
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
                    value={formData.whatItDoes.join('\n')}
                    onChange={(e) => handleArrayInput('whatItDoes', e.target.value)}
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
                    value={formData.whoItsFor.join('\n')}
                    onChange={(e) => handleArrayInput('whoItsFor', e.target.value)}
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
                    value={formData.useCases.join('\n')}
                    onChange={(e) => handleArrayInput('useCases', e.target.value)}
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
                  value={formData.howToUse.map(step => step.text).join('\n')}
                  onChange={(e) => handleStepsInput(e.target.value)}
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
                  value={formData.difficultyExplanation}
                  onChange={(e) => handleInputChange('difficultyExplanation', e.target.value)}
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
                  value={formData.pricingDetails}
                  onChange={(e) => handleInputChange('pricingDetails', e.target.value)}
                  placeholder="อธิบายรูปแบบราคา"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0C2F53] text-white py-3 rounded-lg hover:bg-[#0C2F53]/90 transition-colors font-medium"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'อัปเดตเครื่องมือ' : 'เพิ่มเครื่องมือ'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Tools List */
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              เครื่องมือ AI ทั้งหมด ({aiTools.length})
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {aiTools.map((tool) => (
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
                          <span className="text-xl font-black text-[#0C2F53] dark:text-white">{tool.name[0]}</span>
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
                        onClick={() => handleEdit(tool)}
                        className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="แก้ไข"
                      >
                        <Edit className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDelete(tool.id)}
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