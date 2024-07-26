import React, { useState, useEffect } from 'react';

const RelatedProduc = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://treasure.technotoil.com/product/get/sub-category-product/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        setError(error); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  // Render loading, error, or product list
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p><strong>Product Name:</strong> {product.product_name}</p>
            <p><strong>MRP Amount:</strong> {product.mrp_amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedProduc;
