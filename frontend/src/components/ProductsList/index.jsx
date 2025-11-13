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

  const getPid = (p) => String(p?._id || p?.id || `${p?.name}-${p?.category}`);

  const handleAddToCart = (product) => {
    onAdd(product);
    const pid = getPid(product);
    setAddedItems((prev) => (prev.includes(pid) ? prev : [...prev, pid]));
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
    <div className="product-wrapper">
      <div className="category-filter">
        <label htmlFor="category-select">Filter by Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category[0].toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-results">No products found.</p>
        ) : (
          filteredProducts.map((product) => {
            const { name, category, price, imageUrl } = product;
            const pid = getPid(product);
            const isAdded = addedItems.includes(pid);
            return (
              <div key={pid} className="product-card">
                <img
                  src={imageUrl}
                  alt={name}
                  className="product-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
                <div className="product-info">
                  <h3 className="product-name">{name}</h3>
                  <div className="product-category">{category}</div>
                  <div className="product-price">₹ {price}/-</div>
                </div>
                <button
                  className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={isAdded}
                >
                  {isAdded ? '✔ Added' : 'Add to Cart'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductList;
