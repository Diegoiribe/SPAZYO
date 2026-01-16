import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';
import { Product } from './pages/Product';
import { Catalog } from './pages/Catalog';
import { Admin } from './pages/Admin';
import { Drop } from './pages/Drop';
import { Register } from './pages/Register';
import { LogIn } from './pages/LogIn';
import { Index } from './pages';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  const isAdmin = true;
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
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
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
