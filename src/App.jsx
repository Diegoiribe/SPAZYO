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
import { Index } from './pages/Index';
import { ResetPassword } from './components/ResetPassword';
import { NoFound } from './components/NoFound';
import { Toast } from './components/Toast';
import { get } from './api/http';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Helper to detect subdomain
const getSubdomain = () => {
  const host = window.location.hostname;

  // localhost or root domain
  if (host === 'localhost' || host === 'spazyo.xyz') return null;

  const parts = host.split('.');
  if (parts.length >= 3) {
    return parts[0]; // admin | store name
  }

  return null;
};

function AdminApp({ isToggleOpen, setIsToggleOpen, isBagOpen, setIsBagOpen }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={<LogIn />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Admin
              isAdmin={true}
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
              isBagOpen={isBagOpen}
              setIsBagOpen={setIsBagOpen}
            />
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NoFound isNoFound={true} />} />
      </Routes>
    </Router>
  );
}

function StoreApp({
  subdomain,
  isToggleOpen,
  setIsToggleOpen,
  isBagOpen,
  setIsBagOpen
}) {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Catalog
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
              isBagOpen={isBagOpen}
              setIsBagOpen={setIsBagOpen}
              subdomain={subdomain}
            />
          }
        />
        <Route
          path="/product/:id/:idColor"
          element={
            <Product
              isToggleOpen={isToggleOpen}
              setIsToggleOpen={setIsToggleOpen}
              isBagOpen={isBagOpen}
              setIsBagOpen={setIsBagOpen}
              subdomain={subdomain}
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
        <Route
          path="/*"
          element={<NoFound isNoFound={true} subdomain={subdomain} />}
        />
      </Routes>
    </Router>
  );
}

function LandingApp() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

function App() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isValidSubdomain, setIsValidSubdomain] = useState(null);
  const [loadingSubdomain, setLoadingSubdomain] = useState(true);

  const subdomain = getSubdomain();
  console.log(subdomain);

  useEffect(() => {
    // If no subdomain OR reserved subdomain, skip validation
    if (!subdomain || subdomain === 'admin') {
      setLoadingSubdomain(false);
      return;
    }

    const validateSubdomain = async () => {
      try {
        // Replace with your real endpoint
        const res = await get(`/public/stores/${subdomain}`);

        // If request succeeds (2xx), axios already resolves
        setIsValidSubdomain(true);
        console.log('OK response:', res);
      } catch (error) {
        console.error('Error validating subdomain:', error);

        if (error.response) {
          console.log('Status:', error.response.status);
        }

        setIsValidSubdomain(false);
      } finally {
        setLoadingSubdomain(false);
      }
    };

    validateSubdomain();
  }, [subdomain]);

  if (loadingSubdomain) {
    return null; // or a loader
  }

  // admin.spazyo.xyz
  if (subdomain === 'admin') {
    return (
      <AdminApp
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        isBagOpen={isBagOpen}
        setIsBagOpen={setIsBagOpen}
      />
    );
  }

  // store.spazyo.xyz (any other subdomain)
  if (subdomain && subdomain !== 'admin') {
    if (isValidSubdomain === false) {
      return (
        <Router>
          <NoFound />
        </Router>
      );
    }

    return (
      <StoreApp
        subdomain={subdomain}
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        isBagOpen={isBagOpen}
        setIsBagOpen={setIsBagOpen}
      />
    );
  }

  // root domain: spazyo.xyz
  return <LandingApp />;
}

export const AppWithToast = () => (
  <>
    <App />
    <Toast />
  </>
);

export default AppWithToast;
