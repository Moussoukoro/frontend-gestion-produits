import { useState, useEffect } from "react";
import API from "../api/api";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

 
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get("/categories/");
      setCategories(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des catégories");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les catégories au chargement du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  // Gérer la suppression d'une catégorie
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await API.delete(`/categories/${id}`);
        // Mettre à jour la liste en retirant la catégorie supprimée
        setCategories(categories.filter(cat => cat._id !== id));
      } catch (err) {
        setError("Erreur lors de la suppression");
      }
    }
  };

  // Préparer l'édition d'une catégorie
  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  // Gérer la soumission du formulaire (ajout ou édition)
  const handleSubmit = async (categoryData) => {
    try {
      if (editingCategory) {
        // Mode édition
        const res = await API.put(`/categories/${editingCategory._id}`, categoryData);
        // Mettre à jour la liste avec la catégorie modifiée
        setCategories(categories.map(cat => 
          cat._id === editingCategory._id ? res.data : cat
        ));
        setEditingCategory(null);
      } else {
        // Mode ajout
        const res = await API.post("/categories/add", categoryData);
        // Ajouter la nouvelle catégorie à la liste
        setCategories([...categories, res.data]);
      }
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="categories-page">
      <h2>Gestion des Catégories</h2>
      {error && <div className="error-message">{error}</div>}

      <CategoryForm 
        onSubmit={handleSubmit} 
        initialData={editingCategory}
        onCancel={handleCancelEdit}
      />

      {loading ? (
        <p>Chargement des catégories...</p>
      ) : (
        <CategoryList 
          categories={categories} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
        />
      )}
    </div>
  );
}

export default Categories;