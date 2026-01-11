import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  BookOpen, 
  Tag, 
  ShoppingCart, 
  Users, 
  ChefHat,
  FileText,
  Package,
  DollarSign,
  RefreshCw,
  ChevronRight,
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navItems = [
    { label: 'Dashboard', hint: 'Overview', path: '/', icon: LayoutDashboard },
    { label: 'Plans', hint: 'Manage Plans', path: '/plans', icon: UtensilsCrossed },
    { label: 'Manage Meals', hint: 'Food Items', path: '/manage-meals', icon: BookOpen },
    { label: 'Nutrition Tags', hint: 'Categories', path: '/nutrition-tags', icon: Tag },
    { label: 'Orders', hint: 'Track Orders', path: '/orders', icon: ShoppingCart },
    { label: 'Active Users', hint: 'User Insights', path: '/customers', icon: Users },
    { label: 'Manage Recipes', hint: 'Recipe Library', path: '/admin-recipes', icon: ChefHat }
  ];

  const quickLinks = [
    { label: 'Reports', icon: FileText },
    { label: 'Inventory', icon: Package },
    { label: 'Payouts', icon: DollarSign }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <aside className="relative h-[100%] w-72 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white flex flex-col shadow-2xl border-r border-white/10">
      
      {/* Animated Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Brand Section */}
      <div className="relative p-6 border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-500/30">
            FA
          </div>
          <div>
            <p className="text-lg font-black tracking-tight">FoodApp</p>
            <span className="text-xs text-emerald-300 font-semibold">Admin Console</span>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-400/30 w-fit">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-300 font-semibold">Live</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Main Menu</p>

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                    )}
                    
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-400'} transition-transform group-hover:scale-110`} />
                    
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.label}</p>
                      <span className={`text-xs ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {item.hint}
                      </span>
                    </div>
                    
                    <ChevronRight className={`w-4 h-4 transition-all ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Quick Access</p>
          
          <div className="grid grid-cols-1 gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{link.label}</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="relative p-4 border-t border-white/10 backdrop-blur-sm">
        {/* Sync Status */}
        <div className="mb-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">Kitchen Status</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-semibold">Synced</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">Last updated 5 mins ago</p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
        </button>

        {/* Version */}
        <div className="mt-3 text-center">
          <p className="text-xs text-slate-500">v2.1.0 • Admin Panel</p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;