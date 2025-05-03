function ProductList({ products, onDelete, onEdit }) {
    if (products.length === 0) {
      return <p>Aucun produit trouvé</p>;
    }
  
    return (
      <div className="product-list">
        <h3>Liste des produits</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Catégories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.image && (
                    <img 
                      src={`http://localhost:3000${product.image}`}
                      alt={product.nom} 
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}  
                    />
                  )}
                </td>
                <td>{product.nom}</td>
                <td>{product.prix}</td>
                <td>{product.quantite}</td>
                <td>
                  {product.categories && product.categories
                    .filter(cat => cat && cat.nom)
                    .map(cat => cat.nom)
                    .join(', ')}
                </td>
                <td>
                  <button 
                    onClick={() => onEdit(product)} 
                    className="edit-button"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => onDelete(product._id)}
                    className="delete-button"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ProductList;