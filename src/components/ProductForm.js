import { useState, useEffect } from "react";

function ProductForm({ onSubmit, initialData, onCancel, categories }) {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: ""
  });
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');


  useEffect(() => {
    if (initialData) {
      setFormData({
        nom: initialData.nom,
        description: initialData.description,
        prix: initialData.prix,
        quantite: initialData.quantite
      });
      

      if (initialData.categories && Array.isArray(initialData.categories)) {
        setSelectedCategories(initialData.categories.map(cat => cat._id));
      }
      
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    } else {
      setFormData({ nom: "", description: "", prix: "", quantite: "" });
      setSelectedCategories([]);
      setImageFile(null);
      setImagePreview('');
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    
    if (e.target.checked) {
  
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nom', formData.nom);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('prix', formData.prix);
    formDataToSend.append('quantite', formData.quantite);
    formDataToSend.append('categories', JSON.stringify(selectedCategories));
    
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }
    
    onSubmit(formDataToSend);

    if (!initialData) {
      setFormData({ nom: "", description: "", prix: "", quantite: "" });
      setSelectedCategories([]);
      setImageFile(null);
      setImagePreview('');
    }
  };

  return (
    <div className="category-form">
      <h3>{initialData ? "Modifier le produit" : "Ajouter un produit"}</h3>
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
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div className="form-group">
          <label>Prix </label>
          <input
            type="number"
            name="prix"
            min="0"
            step="0.01"
            value={formData.prix}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Quantité en stock:</label>
          <input
            type="number"
            name="quantite"
            min="0"
            value={formData.quantite}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Catégories:</label>
          <div style={{ border: '1px solid #ddd', padding: '10px' }}>
            {categories && categories.map(category => (
              <div key={category._id} style={{ margin: '5px 0' }}>
                <input
                  type="checkbox"
                  id={`category-${category._id}`}
                  value={category._id}
                  checked={selectedCategories.includes(category._id)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={`category-${category._id}`} style={{ marginLeft: '5px', fontWeight: 'normal' }}>
                  {category.nom}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Image du produit:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <p>Aperçu :</p>
              <img 
                src={imagePreview} 
                alt="Aperçu" 
                style={{ maxWidth: '100%', maxHeight: '200px' }} 
              />
            </div>
          )}
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

export default ProductForm;