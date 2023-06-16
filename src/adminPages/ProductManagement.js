import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productname: '',
    productdescription: '',
    productspecification: '',
    variant: '',
    price: '',
    pettype: '',
    productcategory: '',
    subcategory: '',
    productimage: '',
    stock: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Trim the input and check for null values
    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );
  
    if (Object.values(trimmedFormData).some((value) => value === '')) {
      setErrorMessage('Please enter a valid input');
      return;
    }
  
    const existingProduct = products.find(
      (product) =>
        product.productname === trimmedFormData.productname &&
        product.variant === trimmedFormData.variant
    );
  
    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        ...trimmedFormData,
        productid: existingProduct.productid
      };
  
      fetch(
        `https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products/${existingProduct.productid}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const updatedProducts = products.map((product) =>
            product.productid === existingProduct.productid ? data : product
          );
          setProducts(updatedProducts);
          setFormData({
            productname: '',
            productdescription: '',
            productspecification: '',
            variant: '',
            price: '',
            pettype: '',
            productcategory: '',
            subcategory: '',
            productimage: '',
            stock: ''
          });
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    } else {
      fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trimmedFormData)
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts([...products, data]);
          setFormData({
            productname: '',
            productdescription: '',
            productspecification: '',
            variant: '',
            price: '',
            pettype: '',
            productcategory: '',
            subcategory: '',
            productimage: '',
            stock: ''
          });
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    }
  };

  const handleDelete = (productId) => {
    fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products/${productId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProducts(products.filter((product) => product.productid !== productId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  /* const handleUpdate = (productId) => {
    // Trim the input and check for null values
    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    if (Object.values(trimmedFormData).some((value) => value === '')) {
      alert('Please input the product info in the form');
      return;
    }

    const updatedProduct = {
      ...trimmedFormData, // Use trimmedFormData instead of formData
      productid: productId
    };

    fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedProducts = products.map((product) =>
          product.productid === productId ? data : product
        );
        setProducts(updatedProducts);
        setFormData({
          productname: '',
          productdescription: '',
          productspecification: '',
          variant: '',
          price: '',
          pettype: '',
          productcategory: '',
          subcategory: '',
          productimage: '',
          stock: ''
        });
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  }; */

  const handleProductClick = (product) => {
    setFormData({
      productname: product.productname,
      productdescription: product.productdescription,
      productspecification: product.productspecification,
      variant: product.variant,
      price: product.price,
      pettype: product.pettype,
      productcategory: product.productcategory,
      subcategory: product.subcategory,
      productimage: product.productimage,
      stock: product.stock
    });
  };

  const handleFormReset = () => {
    setFormData({
      productname: '',
      productdescription: '',
      productspecification: '',
      variant: '',
      price: '',
      pettype: '',
      productcategory: '',
      subcategory: '',
      productimage: '',
      stock: ''
    });
    setErrorMessage('');
  };

  return (
    <div className='product-management-container'>
      <div className="shop product-list">
          <h2>Existing Products</h2>
          <div className='products'>
            {products.map((product) => (
              <div className="product-item" key={product.productid} onClick={() => handleProductClick(product)}>
                  <div className="product-info">
                      <h3>{product.productname}</h3>
                      <p>Price: {product.price}</p>
                      <p>For: {product.pettype}</p>
                      <p>Stock: {product.stock}</p>
                  </div>
                  <div className="product-actions">
                      <button onClick={() => handleDelete(product.productid)}>Delete</button>
                  </div>
              </div>
            ))}
          </div>
      </div>
      <form className="shop product-form" onSubmit={handleSubmit}>
          <h2>Add Product</h2>
          <label>
              Product Name:
              <input
              type="text"
              name="productname"
              value={formData.productname}
              onChange={handleChange}
              required
              />
          </label>
          <label>
              Product Description:
              <textarea
              name="productdescription"
              value={formData.productdescription}
              onChange={handleChange}
              required
              ></textarea>
          </label>
          <label>
              Product Specification:
              <input
              type="text"
              name="productspecification"
              value={formData.productspecification}
              onChange={handleChange}
              required
              />
          </label>
          <label>
              Variant:
              <input
              type="text"
              name="variant"
              value={formData.variant}
              onChange={handleChange}
              required
              />
          </label>
          <label>
              Price:
              <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              />
          </label>
          <label>
              Pet Type:
              <select
              name="pettype"
              value={formData.pettype}
              onChange={handleChange}
              required
              >
              <option value="">Select Pet Type</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="fish">Fish</option>
              <option value="bird">Bird</option>
              <option value="reptile">Reptile</option>
              <option value="small animals">Small Animals</option>
              <option value="others">Others</option>
              </select>
          </label>
          <label>
              Product Category:
              <select
              name="productcategory"
              value={formData.productcategory}
              onChange={handleChange}
              required
              >
              <option value="">Select Product Category</option>
              <option value="Food and Nutrition">Food and Nutrition</option>
              <option value="Toys and Enrichment">Toys and Enrichment</option>
              <option value="Care and Well-being">Care and Well-being</option>
              </select>
          </label>
          <label>
              Subcategory:
              <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
              >
              <option value="">Select Subcategory</option>
              <option value="Food">Food</option>
              <option value="Treats">Treats</option>
              <option value="Supplements">Supplements</option>
              <option value="Toys">Toys</option>
              <option value="Grooming Tools">Grooming Tools</option>
              <option value="Bedding">Bedding</option>
              <option value="Leashes and Collars">Leashes and Collars</option>
              <option value="Accessories">Accessories</option>
              <option value="Aquarium">Aquarium</option>
              </select>
          </label>
          <label>
              Product Image URL:
              <input
              type="url"
              name="productimage"
              value={formData.productimage}
              onChange={handleChange}
              required
              />
          </label>
          <label>
              Stock:
              <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              />
          </label>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <div className='form-buttons'>
            <button type='submit'>
              {products.some((p) => p.productname === formData.productname) ? 'Update' : 'Add'}
            </button>
            <button type='button' onClick={handleFormReset}>
              Reset
            </button>
          </div>
      </form>
    </div>
  );
};

export default ProductManagement;
