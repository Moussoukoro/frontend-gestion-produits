import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Utilisez le chemin relatif correct par rapport à la baseURL
      const res = await API.post("/auth/login", { email, password });
      
      // Vérifiez que la réponse contient bien un token
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        onLogin(); // Mettre à jour l'état d'authentification
        navigate("/categories"); // Rediriger vers la page des catégories
      } else {
        setError("Réponse du serveur invalide");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      if (err.response) {
        // Erreur avec réponse du serveur
        setError(err.response.data?.message || `Erreur ${err.response.status}: ${err.response.statusText}`);
      } else if (err.request) {
        // Pas de réponse reçue du serveur
        setError("Impossible de joindre le serveur. Vérifiez votre connexion internet.");
      } else {
        // Erreur dans la configuration de la requête
        setError("Erreur lors de la préparation de la requête: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
      
      <div className="form-link">
        Pas encore de compte? <Link to="/register">S'inscrire</Link>
      </div>
    </div>
  );
}

export default Login;