import React from 'react';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', hint: 'Overview', path: '/' },
    { label: 'Plans', hint: 'Manage', path: '/plans' },
    { label: 'Checkout', hint: 'checkout', path: '/CheckOut' },
    { label: 'TagAdmin', hint: 'TagAdmin', path: '/TagAdmin' },
    { label: 'Customers', hint: 'Insights', path: '/customers' },
    { label: 'Settings', hint: 'System', path: '/settings' },
  ];

  const quickLinks = ['Reports', 'Inventory', 'Payouts'];

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">FA</div>
        <div>
          <p className="sidebar__brand-title">FoodApp</p>
          <span className="sidebar__brand-subtitle">Admin Console</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-label">Main</p>

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? 'is-active' : ''}`
            }
          >
            <span>{item.label}</span>
            <small>{item.hint}</small>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__quick-links">
        <p className="sidebar__section-label">Quick Links</p>
        <div className="sidebar__chip-list">
          {quickLinks.map((link) => (
            <span key={link} className="sidebar__chip">
              {link}
            </span>
          ))}
        </div>
      </div>

      <div className="sidebar__footer">
        <p>Kitchen synced 5 mins ago</p>
        <button type="button" className="sidebar__sync-btn">
          Refresh
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
