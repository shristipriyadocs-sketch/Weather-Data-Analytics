import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Historical } from './pages/Historical';
import { Compare } from './pages/Compare';

const App: React.FC = () => {
  // Restore theme preference on load
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historical" element={<Historical />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
