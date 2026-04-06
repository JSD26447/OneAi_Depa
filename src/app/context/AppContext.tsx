import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { aiTools as initialAiTools, AITool } from '../data/aiTools';
import { aiPrompts as initialPrompts, AIPrompt } from '../data/prompts';
import { initialCategories } from '../data/categories';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  aiTools: AITool[];
  prompts: AIPrompt[];
  addTool: (tool: Partial<AITool>) => Promise<void>;
  updateTool: (id: string, tool: Partial<AITool>) => Promise<void>;
  deleteTool: (id: string, db_id?: number) => Promise<void>;
  addPrompt: (prompt: Partial<AIPrompt>) => Promise<void>;
  updatePrompt: (id: string, prompt: Partial<AIPrompt>) => Promise<void>;
  deletePrompt: (id: string, db_id?: number) => Promise<void>;
  categories: any[];
  addCategory: (category: any) => Promise<void>;
  updateCategory: (id: string, category: any) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  recordAiView: (db_id: number) => Promise<void>;
  recordPromptCopy: (db_id: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [prompts, setPrompts] = useState<AIPrompt[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const toolRes = await fetch(`${API_URL}/ais`);
      const toolData = await toolRes.json();

      const promptRes = await fetch(`${API_URL}/prompts`);
      const promptData = await promptRes.json();

      let catData = [];
      try {
        const catRes = await fetch(`${API_URL}/categories`);
        catData = await catRes.json();
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }

      if (toolData.length === 0) {
        // Seed database if empty
        await fetch(`${API_URL}/seed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ais: initialAiTools, prompts: initialPrompts })
        });
        // Refetch after seed
        const newToolRes = await fetch(`${API_URL}/ais`);
        const newToolData = await newToolRes.json();
        setAiTools(newToolData.length > 0 ? newToolData : initialAiTools);

        const newPromptRes = await fetch(`${API_URL}/prompts`);
        const newPromptData = await newPromptRes.json();
        setPrompts(newPromptData.length > 0 ? newPromptData : initialPrompts);
        setCategories(catData.length > 0 ? catData : initialCategories);
      } else {
        setAiTools(toolData);
        setPrompts(promptData);
        setCategories(catData.length > 0 ? catData : initialCategories);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      // Fallback to static data if backend is offline
      setAiTools(initialAiTools);
      setPrompts(initialPrompts);
      setCategories(initialCategories);
    }
  };

  const recordAiView = async (db_id: number) => {
    try {
      await fetch(`${API_URL}/analytics/ais/${db_id}/view`, { method: 'POST' });
    } catch (e) {
      console.error("Failed to record AI view", e);
    }
  };

  const recordPromptCopy = async (db_id: number) => {
    try {
      await fetch(`${API_URL}/analytics/prompts/${db_id}/copy`, { method: 'POST' });
    } catch (e) {
      console.error("Failed to record Prompt copy", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setIsAdmin(true);
        return true;
      }
    } catch (err) {
      console.error("Login failed", err);
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('token');
  };

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const addTool = async (tool: Partial<AITool>) => {
    const res = await fetch(`${API_URL}/ais`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(tool)
    });
    if (res.ok) {
      fetchData();
    }
  };

  const updateTool = async (id: string, updatedTool: Partial<AITool>) => {
    // find db_id if any (we stored it inside description dynamically sometimes, or injected in GET)
    const existing = aiTools.find(t => t.id === id);
    const dbId = (existing as any)?.db_id;

    if (!dbId) {
      console.error('updateTool: ไม่พบ db_id สำหรับ id =', id, 'existing =', existing);
      alert('เกิดข้อผิดพลาด: ไม่พบ ID ในฐานข้อมูลสำหรับ tool นี้ กรุณา refresh หน้าเว็บแล้วลองใหม่');
      return;
    }

    console.log('updateTool: PUT /api/ais/' + dbId, updatedTool);
    const res = await fetch(`${API_URL}/ais/${dbId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updatedTool)
    });
    if (res.ok) {
      fetchData();
    } else {
      const errData = await res.json().catch(() => ({}));
      console.error('updateTool failed:', res.status, errData);
      if (res.status === 401 || res.status === 403) {
        alert('Session หมดอายุ กรุณา logout แล้ว login ใหม่');
      } else {
        alert(`บันทึกข้อมูลไม่สำเร็จ: ${res.status} ${errData.message || ''}`);
      }
    }
  };

  const deleteTool = async (id: string, db_id?: number) => {
    const existing = aiTools.find(t => t.id === id);
    const dbId = db_id || (existing as any)?.db_id || id;
    const res = await fetch(`${API_URL}/ais/${dbId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (res.ok) {
      fetchData();
    }
  };

  const addPrompt = async (prompt: Partial<AIPrompt>) => {
    const res = await fetch(`${API_URL}/prompts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(prompt)
    });
    if (res.ok) {
      fetchData();
    }
  };

  const updatePrompt = async (id: string, updatedPrompt: Partial<AIPrompt>) => {
    const existing = prompts.find(p => p.id === id);
    const dbId = (existing as any)?.db_id;

    if (!dbId) {
      console.error('updatePrompt: ไม่พบ db_id สำหรับ id =', id);
      alert('เกิดข้อผิดพลาด: ไม่พบ ID ในฐานข้อมูลสำหรับ prompt นี้ กรุณา refresh หน้าเว็บแล้วลองใหม่');
      return;
    }

    console.log('updatePrompt: PUT /api/prompts/' + dbId, updatedPrompt);
    const res = await fetch(`${API_URL}/prompts/${dbId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updatedPrompt)
    });
    if (res.ok) {
      fetchData();
    } else {
      const errData = await res.json().catch(() => ({}));
      console.error('updatePrompt failed:', res.status, errData);
      if (res.status === 401 || res.status === 403) {
        alert('Session หมดอายุ กรุณา logout แล้ว login ใหม่');
      } else {
        alert(`บันทึกข้อมูลไม่สำเร็จ: ${res.status} ${errData.message || ''}`);
      }
    }
  };

  const deletePrompt = async (id: string, db_id?: number) => {
    const existing = prompts.find(p => p.id === id);
    const dbId = db_id || (existing as any)?.db_id || id;
    const res = await fetch(`${API_URL}/prompts/${dbId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (res.ok) {
      fetchData();
    }
  };

  const addCategory = async (category: any) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(category)
    });
    if (res.ok) {
      fetchData();
    }
  };

  const updateCategory = async (id: string, category: any) => {
    console.log('updateCategory: PUT /api/categories/' + id, category);
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(category)
    });
    if (res.ok) {
      fetchData();
    } else {
      const errData = await res.json().catch(() => ({}));
      console.error('updateCategory failed:', res.status, errData);
      if (res.status === 401 || res.status === 403) {
        alert('Session หมดอายุ กรุณา logout แล้ว login ใหม่');
      } else {
        alert(`บันทึกข้อมูลไม่สำเร็จ: ${res.status} ${errData.message || ''}`);
      }
    }
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (res.ok) {
      fetchData();
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isAdmin,
        login,
        logout,
        aiTools,
        prompts,
        addTool,
        updateTool,
        deleteTool,
        addPrompt,
        updatePrompt,
        deletePrompt,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        recordAiView,
        recordPromptCopy
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
