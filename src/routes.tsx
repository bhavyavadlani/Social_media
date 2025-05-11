import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Explore from './pages/Explore';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Update page title based on route
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Home | Connect',
      '/explore': 'Explore | Connect',
      '/notifications': 'Notifications | Connect',
      '/messages': 'Messages | Connect',
      '/login': 'Sign In | Connect'
    };

    const profilePattern = /^\/profile\/[\w-]+$/;
    
    const baseTitle = 'Connect';
    
    // Set title based on current path
    if (location.pathname in pageTitles) {
      document.title = pageTitles[location.pathname];
    } else if (profilePattern.test(location.pathname)) {
      document.title = 'Profile | Connect';
    } else {
      document.title = baseTitle;
    }
  }, [location]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
      </Route>
      
      {/* Catch all unhandled routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// Protected route wrapper
const ProtectedRoute: React.FC<{ isAuthenticated: boolean, children?: React.ReactNode }> = ({ 
  isAuthenticated 
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AppRouter;