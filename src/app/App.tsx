import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';
import PromptsPage from './pages/PromptsPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/tool/:id" element={<DetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}