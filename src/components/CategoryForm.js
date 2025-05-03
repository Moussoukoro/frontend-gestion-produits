import { useState, useEffect } from "react";

function CategoryForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    nom: "",
    description: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nom: initialData.nom,
        description: initialData.description
      });
    } else {
      setFormData({ nom: "", description: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ nom: "", description: "" });
    }
  };

  return (
    <div className="category-form">
      <h3>{initialData ? "Modifier la catégorie" : "Ajouter une catégorie"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit">
            {initialData ? "Mettre à jour" : "Ajouter"}
          </button>
          
          {initialData && (
            <button type="button" onClick={onCancel} className="cancel-button">
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;