import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import SelectPlan from './page/SelectPlan';
import CheckOut from './page/CheckOut';
import TagAdmin from './page/TagAdmin';
import Orders from './page/Orders';
import AdminRecipes from './page/AdminRecipes';
import Customers from './page/Customers';

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
          <Route path="/orders" element={<Orders />} />
          <Route path='/admin-recipes' element={<AdminRecipes />} />
          <Route path='/customers' element={<Customers />} />
        </Routes>

      </main>
    </div>
  );
};

export default App;
