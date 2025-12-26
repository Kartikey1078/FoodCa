import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SelectPlan from './page/SelectPlan';
import CheckOut from './page/CheckOut';
import TagAdmin from './page/TagAdmin';
import NutritionFact from './page/NutritionFact';
import Orders from './page/Orders';

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
          <Route path="/nutrition-tags" element={<TagAdmin />} />
          <Route path="/nutrition-facts" element={<NutritionFact />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

      </main>
    </div>
  );
};

export default App;
