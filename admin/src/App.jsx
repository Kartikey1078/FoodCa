import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SelectPlan from './page/SelectPlan';
import CheckOut from './page/CheckOut';
import TagAdmin from './page/TagAdmin';

const App = () => {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-content">
        <Header />

        <Routes>
          <Route path="/" element={<h2>Dashboard</h2>} />
          <Route path="/plans" element={<SelectPlan />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/TagAdmin" element={<TagAdmin />} />
        </Routes>

      </main>
    </div>
  );
};

export default App;
