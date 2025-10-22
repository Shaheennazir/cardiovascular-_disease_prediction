import React, { useState } from 'react';
import { Menu, X, Home, BarChart2, Activity, LogOut, User } from 'lucide-react';
import { TactileButton } from '../ui/tactile-button';

const DashboardLayout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: Home, href: '#' },
    { name: 'Tabular Prediction', icon: BarChart2, href: '#' },
    { name: 'ECG Analysis', icon: Activity, href: '#' },
  ];

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background-light dark:bg-background-dark border-r border-zen-blue/20 dark:border-zen-blue/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-zen-blue/20 dark:border-zen-blue/10">
          <div className="flex items-center space-x-2">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-tactile-text-dark" />
            </div>
            <span className="text-lg font-semibold text-zen-dark-blue dark:text-zen-light-blue">User Name</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-zen-dark-blue dark:text-zen-light-blue hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center p-3 text-zen-dark-blue/80 dark:text-zen-light-blue/80 rounded-lg hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20 transition-all duration-200 group"
                >
                  <item.icon className="h-5 w-5 mr-3 text-zen-dark-blue/60 dark:text-zen-light-blue/60 group-hover:text-primary transition-colors duration-200" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
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
        <header className="bg-background-light dark:bg-background-dark border-b border-zen-blue/20 dark:border-zen-blue/10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-zen-dark-blue dark:text-zen-light-blue hover:bg-zen-blue/10 dark:hover:bg-zen-blue/20 lg:hidden transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-zen-dark-blue dark:text-zen-light-blue">Dashboard</h1>
            <TactileButton variant="outline" onClick={onLogout} size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </TactileButton>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;