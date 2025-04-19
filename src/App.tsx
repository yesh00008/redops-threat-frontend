import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout components
import { Layout } from './components/layout/Layout';

// Import pages
import { Index as HomePage } from './pages/Index';
import { Scan } from './pages/Scan';
import { Encryption } from './pages/Encryption';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

// Theme provider
import { ThemeProvider } from './components/theme/theme-provider';

// Toaster for notifications
import { Toaster } from './components/ui/toaster';

/**
 * Main App component that sets up routing and global providers
 */
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="redops-theme">
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="scan" element={<Scan />} />
            <Route path="encryption" element={<Encryption />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Catch all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;