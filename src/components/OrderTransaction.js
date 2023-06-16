import React, { useState, useEffect } from 'react';
import PawIcon from '../components/PawIcon';
import './OrderTransaction.css';

const OrderTransaction = () => {
  const [transactionItems, setTransactionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const toggleMyOrder = () => {
    setShowCheckout(!showCheckout);
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const usersResponse = await fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users');
        const usersData = await usersResponse.json();
        const { transaction } = usersData[0]; // Assuming the user is at index 0
        setTransactions(transaction);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PawIcon />;
  }

  return (
    <div className="transaction">
      <button className="transaction-button button" onClick={toggleMyOrder}>
        My Orders
      </button>
      {showCheckout && (
        <div className="transactionLog">
          <h1>My Orders</h1>
          <div className="columnLabelT">
            <h4>Transaction ID</h4>
            <h4>Items</h4>
            <h4>Total Amount</h4>
            <h4>Status</h4>
          </div>
          <div className='transactions'>
            {transactions.length === 0 ? (
              <p>Your transaction is empty.</p>
            ) : (
              <ul className="productListsT">
                {transactions.map(transaction => (
                  <li key={transaction.transactionId}>
                    <p>{transaction.transactionId}</p>
                    <ul>
                      <li>
                        <h5>Product Image</h5>
                        <h5>Product Name</h5>
                        <h5>Unit Price</h5>
                        <h5>Quantity</h5>
                      </li>
                      {transaction.items.map(item => {
                        const product = getProductById(item.productId);
                        return (
                          <li key={item.id}>
                            <div className="productinfoT">
                              <img src={product ? product.productimage : ''} alt={product ? product.productname : 'Unknown'} />
                              <div>{product ? product.productname : 'Unknown'}</div>
                              <div>{product ? product.variant : 'Unknown'}</div>
                            </div>
                            <div>{product ? `$${product.price}` : 'Unknown'}</div>
                            <div>{product ? `${item.qty}` : 'Unknown'}</div>
                          </li>
                        );
                      })}
                    </ul>
                    <p>{transaction.totalAmount}</p>
                    <p>Processing</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default OrderTransaction;
