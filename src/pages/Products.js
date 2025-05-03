import { useState, useEffect } from "react";
import API from "../api/api";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Charger les produits et catégories
  useEffect(() => {
    const fetchData = async () => {
      try {
     
        const productsResponse = await API.get("/products");
       
        const validProducts = Array.isArray(productsResponse.data) 
          ? productsResponse.data.filter(product => product && product._id)
          : [];
        setProducts(validProducts);
        
        // Charger les catégories
        const categoriesResponse = await API.get("/categories");
     
        const validCategories = Array.isArray(categoriesResponse.data) 
          ? categoriesResponse.data.filter(category => category && category._id)
          : [];
        setCategories(validCategories);
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Ajout d'un produit
  const handleAddProduct = async (formData) => {
    try {
      const response = await API.post("/products/add", formData, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      });
      
    
      if (response.data && response.data._id) {
        // Ajouter le nouveau produit à la liste
        setProducts([...products, response.data]);
      }
    } catch (err) {
      console.error("Erreur d'ajout:", err);
      setError("Erreur lors de l'ajout du produit");
    }
  };
  
  // Modification d'un produit
  const handleUpdateProduct = async (formData) => {
    try {
      // Vérifier que editingProduct existe et a un _id
      if (!editingProduct || !editingProduct._id) {
        throw new Error("Produit en édition invalide");
      }
      
      await API.put(`/products/${editingProduct._id}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      });
      
      // Mettre à jour la liste des produits
      const updatedProducts = await API.get("/products");
      // Filtrer les produits valides
      const validProducts = Array.isArray(updatedProducts.data) 
        ? updatedProducts.data.filter(product => product && product._id)
        : [];
      setProducts(validProducts);
      
      // Quitter le mode édition
      setEditingProduct(null);
    } catch (err) {
      console.error("Erreur de mise à jour:", err);
      setError("Erreur lors de la mise à jour du produit");
    }
  };
  
  // Suppression d'un produit
  const handleDeleteProduct = async (productId) => {
    // Vérifier que l'ID est valide
    if (!productId) {
      setError("ID de produit invalide");
      return;
    }
    
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await API.delete(`/products/${productId}`);
        
        // Mettre à jour la liste des produits
        setProducts(products.filter(product => product && product._id && product._id !== productId));
      } catch (err) {
        console.error("Erreur de suppression:", err);
        setError("Erreur lors de la suppression du produit");
      }
    }
  };
  
  // Gestion du formulaire
  const handleSubmit = (formData) => {
    if (editingProduct) {
      handleUpdateProduct(formData);
    } else {
      handleAddProduct(formData);
    }
  };
  
  // Annuler l'édition
  const handleCancel = () => {
    setEditingProduct(null);
  };
  
  // Fonction sécurisée pour définir le produit en édition
  const handleSetEditingProduct = (product) => {
    if (product && product._id) {
      setEditingProduct(product);
    } else {
      setError("Impossible de modifier ce produit: données invalides");
    }
  };
  
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container">
      <h2>Gestion des produits</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <ProductForm 
        onSubmit={handleSubmit}
        initialData={editingProduct}
        onCancel={handleCancel}
        categories={categories}
      />
      
      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleSetEditingProduct}
      />
    </div>
  );
}

export default Products;