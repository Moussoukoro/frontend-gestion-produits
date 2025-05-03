import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    onLogout();
    setShowConfirmation(false);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Gestion de Produits
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/categories">Catégories</Link>
        </li>
        <li>
          <Link to="/products">Produits</Link>
        </li>
        <li>
          <button 
            onClick={handleLogoutClick} 
            className="logout-button"
          >
            Déconnexion
          </button>
        </li>
      </ul>

      
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            maxWidth: '400px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            margin: '0 20px'
          }}>
            <h3>Confirmation</h3>
            <p style={{ margin: '15px 0' }}>Êtes-vous sûr de vouloir vous déconnecter?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={cancelLogout}
                style={{ backgroundColor: '#f2f2f2', color: '#333' }}
              >
                Annuler
              </button>
              <button 
                onClick={confirmLogout}
                className="cancel-button"
              >
                Déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;