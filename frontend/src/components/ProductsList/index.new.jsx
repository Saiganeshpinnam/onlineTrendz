import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const ProductList = ({ onAdd, searchTerm = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    onAdd(product);
    setAddedItems((prev) => [...prev, product.id]);
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/200';
                }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                <button
                  className={`add-to-cart-btn ${
                    addedItems.includes(product._id) ? 'added' : ''
                  }`}
                  onClick={() => handleAddToCart(product)}
                  disabled={addedItems.includes(product._id)}
                >
                  {addedItems.includes(product._id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">No products found</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
