import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Product } from './pages/Product';
import { Catalog } from './pages/Catalog';
import { Admin } from './pages/Admin';

function App() {
  const isAdmin = true
  const [isToggleOpen, setIsToggleOpen] = useState(false)


  return (
    <Router>
      <Routes>
        <Route path="/product/:id" element={<Product isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen} />} />
        <Route path="/" element={<Catalog isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen} />} />
        <Route path="/admin" element={<Admin isAdmin={isAdmin} isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen} />} />
      </Routes>
    </Router>
  );
}

export default App;
