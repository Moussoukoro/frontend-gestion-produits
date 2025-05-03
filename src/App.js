import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/Products"; 
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier si l'utilisateur est déjà connecté (token présent)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction pour gérer la connexion
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {/* Afficher la navbar seulement si l'utilisateur est connecté */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      
      <div className="container">
        <Routes>
          {/* Rediriger vers /categories si déjà connecté, sinon afficher Login */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/categories" /> : <Login onLogin={handleLogin} />} 
          />
          
          {/* Page d'inscription */}
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/categories" /> : <Register />} 
          />
          
          {/* Page protégée: rediriger vers la page de login si non connecté */}
          <Route 
            path="/categories" 
            element={isAuthenticated ? <Categories /> : <Navigate to="/" />} 
          />
          <Route 
            path="/products" 
            element={isAuthenticated ? <ProductsPage /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;