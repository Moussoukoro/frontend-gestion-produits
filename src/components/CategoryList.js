function CategoryList({ categories, onDelete, onEdit }) {
    if (categories.length === 0) {
      return <p>Aucune catégorie trouvée</p>;
    }
  
    return (
      <div className="category-list">
        <h3>Liste des catégories</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.nom}</td>
                <td>{category.description}</td>
                <td>
                  <button 
                    onClick={() => onEdit(category)} 
                    className="edit-button"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => onDelete(category._id)}
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
  
  export default CategoryList;