import { useState } from 'react';
import { X, Sun, Moon, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, toggleTheme, isAdmin, login, logout } = useApp();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setPassword('');
      setError('');
      setShowLoginForm(false);
      onClose();
      navigate('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="bg-[#0C2F53] p-6 flex items-center justify-between text-white">
          <h2 className="text-2xl font-black">การตั้งค่า</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* Theme Toggle */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              การแสดงผล
            </h3>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-[#FFF200] dark:hover:border-[#FFF200] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  {theme === 'light' ? (
                    <Sun className="w-6 h-6 text-[#FFC600]" />
                  ) : (
                    <Moon className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <div className="text-left">
                  <p className="font-black text-[#0C2F53] dark:text-white">
                    {theme === 'light' ? 'โหมดสว่าง' : 'โหมดมืด'}
                  </p>
                  <p className="text-xs text-slate-400 font-medium tracking-tight">คลิกเพื่อสลับโหมด</p>
                </div>
              </div>
            </button>
          </div>

          {/* Admin Section */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              เจ้าหน้าที่ depa
            </h3>

            {!isAdmin ? (
              !showLoginForm ? (
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="w-full flex items-center justify-center gap-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent hover:border-blue-400 transition-all group"
                >
                  <Shield className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-[#0C2F53] dark:text-slate-300">
                    เข้าสู่ระบบผู้ดูแล
                  </span>
                </button>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      placeholder="รหัสผ่าน (admin123)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-[#0C2F53] dark:text-white focus:outline-none focus:border-[#0C2F53] transition-colors font-bold"
                      autoFocus
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2 font-semibold">รหัสผ่านไม่ถูกต้อง!</p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-[#0C2F53] text-[#FFF200] py-4 rounded-2xl hover:bg-[#0C2F53]/90 transition-all font-black shadow-lg shadow-[#0C2F53]/10"
                    >
                      เข้าสู่ระบบ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowLoginForm(false);
                        setError('');
                        setPassword('');
                      }}
                      className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 py-4 rounded-2xl hover:bg-slate-200 transition-all font-bold"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              )
            ) : (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-900/40">
                  <div className="flex items-center gap-3 mb-1">
                    <Shield className="w-6 h-6 text-green-600" />
                    <span className="font-black text-green-900 dark:text-green-100">
                      เจ้าหน้าที่ตรวจสอบแล้ว
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/admin');
                  }}
                  className="w-full bg-[#0C2F53] text-[#FFF200] py-4 rounded-2xl hover:bg-[#0C2F53]/90 transition-all font-black shadow-lg shadow-[#0C2F53]/10"
                >
                  ไปที่แดชบอร์ดจัดการ AI
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 py-4 rounded-2xl hover:bg-slate-200 transition-all font-bold"
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}