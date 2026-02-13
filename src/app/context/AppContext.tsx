import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { aiTools as initialAiTools, AITool } from '../data/aiTools';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  aiTools: AITool[];
  addTool: (tool: AITool) => void;
  updateTool: (id: string, tool: AITool) => void;
  deleteTool: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123'; // Simple password for demo

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const [aiTools, setAiTools] = useState<AITool[]>(() => {
    const saved = localStorage.getItem('aiTools');
    if (!saved) return initialAiTools;

    try {
      const savedTools: AITool[] = JSON.parse(saved);
      // Merge: keep saved tools but update them if initial data has new fields
      return initialAiTools.map(initialTool => {
        const savedTool = savedTools.find(t => t.id === initialTool.id);
        if (savedTool) {
          // Build merged tool: prioritize initialTool's imageUrl if it exists
          return {
            ...initialTool,
            ...savedTool,
            imageUrl: initialTool.imageUrl || savedTool.imageUrl
          };
        }
        return initialTool;
      }).concat(
        // Add tools that are only in saved state (manually added via Admin)
        savedTools.filter(st => !initialAiTools.some(it => it.id === st.id))
      );
    } catch (e) {
      return initialAiTools;
    }
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aiTools', JSON.stringify(aiTools));
  }, [aiTools]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const addTool = (tool: AITool) => {
    setAiTools(prev => [...prev, tool]);
  };

  const updateTool = (id: string, updatedTool: AITool) => {
    setAiTools(prev => prev.map(tool => tool.id === id ? updatedTool : tool));
  };

  const deleteTool = (id: string) => {
    setAiTools(prev => prev.filter(tool => tool.id !== id));
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
        addTool,
        updateTool,
        deleteTool,
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
