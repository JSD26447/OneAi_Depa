import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { aiTools as initialAiTools, AITool } from '../data/aiTools';
import { aiPrompts as initialPrompts, AIPrompt } from '../data/prompts';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  aiTools: AITool[];
  prompts: AIPrompt[];
  addTool: (tool: Partial<AITool>) => Promise<void>;
  updateTool: (id: string, tool: Partial<AITool>) => Promise<void>;
  deleteTool: (id: string, db_id?: number) => Promise<void>;
  addPrompt: (prompt: Partial<AIPrompt>) => Promise<void>;
  updatePrompt: (id: string, prompt: Partial<AIPrompt>) => Promise<void>;
  deletePrompt: (id: string, db_id?: number) => Promise<void>;
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
        setAiTools(newToolData);

        const newPromptRes = await fetch(`${API_URL}/prompts`);
        const newPromptData = await newPromptRes.json();
        setPrompts(newPromptData);
      } else {
        setAiTools(toolData);
        setPrompts(promptData);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      // Fallback to static data if backend is offline
      setAiTools(initialAiTools);
      setPrompts(initialPrompts);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = async (password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admindepa', password })
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
    const dbId = (existing as any)?.db_id || id;

    const res = await fetch(`${API_URL}/ais/${dbId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updatedTool)
    });
    if (res.ok) {
      fetchData();
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
    const dbId = (existing as any)?.db_id || id;
    const res = await fetch(`${API_URL}/prompts/${dbId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updatedPrompt)
    });
    if (res.ok) {
      fetchData();
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
        deletePrompt
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
