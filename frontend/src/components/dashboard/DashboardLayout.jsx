import React, { useState } from 'react';
import { Menu, X, Home, BarChart2, Activity, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Tabular Prediction', icon: BarChart2, href: '/dashboard/tabular' },
    { name: 'ECG Analysis', icon: Activity, href: '/dashboard/ecg' },
    { name: 'Prediction History', icon: User, href: '/dashboard/history' },
  ];

  return (
    <div className="flex h-screen bg-[#1a1a1a]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#2a2a2a] border-r-2 border-solid border-[#4a4a4a] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b-2 border-solid border-[#4a4a4a]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#f20d80] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-white text-lg font-bold">User Name</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-white hover:bg-[#4a4a4a]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="flex items-center p-3 text-white rounded-[3rem] hover:bg-[#4a4a4a] transition-all duration-200 group"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3 text-[#6a6a6a] group-hover:text-[#f20d80] transition-colors duration-200" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Back to Home Button */}
        <div className="p-4 absolute bottom-0 left-0 right-0">
          <Link
            to="/"
            className="flex items-center justify-center p-3 text-white rounded-[3rem] bg-[#2a2a2a] hover:bg-[#4a4a4a] border-2 border-solid border-[#4a4a4a] transition-all duration-200 group w-full"
            onClick={() => setSidebarOpen(false)}
          >
            <Home className="h-5 w-5 mr-3 text-[#6a6a6a] group-hover:text-[#f20d80] transition-colors duration-200" />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-[#1a1a1a] border-b-2 border-solid border-[#4a4a4a]">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-white hover:bg-[#2a2a2a] lg:hidden transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-white text-xl font-bold">Dashboard</h1>
            <button
              onClick={handleLogoutClick}
              className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-[3rem] h-10 px-6 bg-[#f20d80] text-white text-base font-extrabold leading-normal tracking-[0.015em] hover:bg-[#f20d80]/80 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#1a1a1a] animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;