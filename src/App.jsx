import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Product } from './pages/Product';
import { Catalog } from './pages/Catalog';
import { Admin } from './pages/Admin';
import { Drop } from './pages/Drop';
import { Register } from './pages/Register';
import { LogIn } from './pages/LogIn';

function App() {
  const isAdmin = true;
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/product/:id/:idColor"
          element={
            <Product
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
              isBagOpen={isBagOpen}
              setIsBagOpen={setIsBagOpen}
            />
          }
        />
        <Route
          path="/"
          element={
            <Catalog
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
              isBagOpen={isBagOpen}
              setIsBagOpen={setIsBagOpen}
            />
          }
        />
        <Route
          path="/newdrop"
          element={
            <Drop
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
              isBagOpen={isBagOpen}
              setIsBagOpen={setIsBagOpen}
            />
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <Admin
              isAdmin={isAdmin}
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
              isBagOpen={isBagOpen}
              setIsBagOpen={setIsBagOpen}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
