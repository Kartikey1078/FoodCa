import React from 'react';

const Header = () => {
  return (
    <header className="page-header">
      <div>
        <p className="page-header__eyebrow">Welcome back 👋</p>
        <h1>Central Kitchen</h1>
        <p className="page-header__subtitle">Monitor performance and act in real-time.</p>
      </div>

      <div className="page-header__actions">
        {/* <button type="button" className="btn btn-ghost">
          Filters
        </button>
        <button type="button" className="btn btn-primary">
          Add Menu Item
        </button> */}
      </div>
    </header>
  );
};

export default Header;

