import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import ManagePage from "./pages/ManagePage";
import RandomPage from "./pages/RandomPage";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import logo from "./assets/logo.png";

// Separate Navigation component to use useLocation hook
function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-15 w-15" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WatchList Picker
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-2">
            <Link
              to="/random"
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${location.pathname === '/random'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              🎲 Picker
            </Link>
            <Link
              to="/manage"
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${location.pathname === '/manage'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
            >
              📋 Manage
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "watchlist"), (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/random" replace />} />
            <Route path="/random" element={<RandomPage items={items} />} />
            <Route path="/manage" element={<ManagePage items={items} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}