import React, { useState, useEffect } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import PawIcon from '../components/PawIcon';
import './CartPage.css';
import Checkout from '../components/Checkout';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [transaction, setTransaction] = useState([]);
    
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setCartItems(user.cart);
            setWishlist(user.wishlist);
            setTransaction(user.transaction);
            setLoading(false);
        }
        fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.log('Error fetching products:', error);
            });
    }, []);

    const handleCheckboxChange = (event, itemId) => {
        if (event.target.checked) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, itemId]);
        } else {
            setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== itemId));
        }
    
        // Check if all items are selected
        const allItemIds = cartItems.map(item => item.id);
        const isAllSelected = allItemIds.every(id => selectedItems.includes(id));
    
        // Update the checkbox in columnLabel
        const columnLabelCheckbox = document.querySelector('.columnLabel input[type="checkbox"]');
        if (columnLabelCheckbox) {
            columnLabelCheckbox.checked = isAllSelected;
        }
    };
    
    const updateQuantityInCart = (itemId, newQty) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, qty: newQty };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        updateCartItemsInStorage(updatedCartItems); // Update the cart items in local storage
        updateCartItemsInApi(updatedCartItems); // Update the cart items in the API
    };

    const handleQuantityChange = (event, itemId) => {
        const newQty = parseInt(event.target.value);
        updateQuantityInCart(itemId, newQty);
    };

    const incrementQuantity = (itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            const newQty = item.qty + 1;
            updateQuantityInCart(itemId, newQty);
        }
    };

    const decrementQuantity = (itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        if (item && item.qty > 1) {
            const newQty = item.qty - 1;
            updateQuantityInCart(itemId, newQty);
        }
    };

    const getTotalAmount = () => {
        let total = 0;
        selectedItems.forEach(itemId => {
            const item = cartItems.find(item => item.id === itemId);
            if (item) {
                const product = getProductById(item.id);
                if (product) {
                    total += parseFloat(product.price) * item.qty;
                }
            }
        });
        return total.toFixed(2);
    };

    const getProductById = (productId) => {
        return products.find(product => product.productid === productId);
    };

    const handleSelectAll = () => {
        var input = document.getElementById('submitButton');

        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
            input.disabled = true;
        } else {
            const allItemIds = cartItems.map(item => item.id);
            setSelectedItems(allItemIds);
            input.disabled = false;
        }
        
    };

    const handleDelete = () => {
        const updatedCartItems = cartItems.filter(item => !selectedItems.includes(item.id));
        setCartItems(updatedCartItems);
        setSelectedItems([]);
    
        updateCartItemsInStorage(updatedCartItems);
        updateCartItemsInApi(updatedCartItems);
        
        selectedItems.forEach(itemId => {
            handleDeleteSelectedItem(itemId);
        });
        setSelectedItems([]);
    };

    const moveToWishlist = () => {
        const updatedCartItems = cartItems.filter(item => !selectedItems.includes(item.id));
        const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    
        const updatedWishlistItems = [...wishlist, ...selectedCartItems];
    
        setCartItems(updatedCartItems);
        setWishlist(updatedWishlistItems);
        setSelectedItems([]);
    
        updateCartItemsInStorage(updatedCartItems);
        updateWishlistItemsInStorage(updatedWishlistItems);
        updateCartItemsInApi(updatedCartItems);
        updateWishlistItemsInApi(updatedWishlistItems);
    };
        

    const updateCartItemsInStorage = (updatedCartItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            user.cart = updatedCartItems;
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    const updateCartItemsInApi = (updatedCartItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            const userId = user.id;
            fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart: updatedCartItems }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Cart items updated in API:', data);
                })
                .catch(error => {
                    console.log('Error updating cart items in API:', error);
                });
        }
    };

    const updateWishlistItemsInStorage = (updatedWishlistItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            user.wishlist = updatedWishlistItems;
            localStorage.setItem('user', JSON.stringify(user));
        }
    };
    
    const updateWishlistItemsInApi = (updatedWishlistItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            const userId = user.id;
            fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wishlist: updatedWishlistItems }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Wishlist items updated in API:', data);
                })
                .catch(error => {
                    console.log('Error updating wishlist items in API:', error);
                });
        }
    };

    const handleCheckout = () => {
        const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
        const updatedCartItems = cartItems.filter(item => !selectedItems.includes(item.id));
      
        const numericDate = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 1000);
        const transactionId = `${numericDate}${randomNumber}`;
      
        const transactionItems = selectedCartItems.map(item => ({
          id: item.id,
          qty: item.qty
        }));
      
        const updatedTransaction = {
          transactionId: transactionId,
          items: transactionItems,
          itemQty: selectedItems.length,
          totalAmount: `${getTotalAmount()}`
        };
      
        const updatedTransactionItems = [...transaction, updatedTransaction];
      
        console.log(updatedTransactionItems);
      
        setCartItems(updatedCartItems);
        setTransaction(updatedTransactionItems);
        setSelectedItems([]);
      
        updateCartItemsInStorage(updatedCartItems);
        updateTransactionItemsInStorage(updatedTransactionItems);
        updateCartItemsInApi(updatedCartItems);
        updateTransactionItemsInApi(updatedTransactionItems);
    };
      

    const updateTransactionItemsInStorage = (updatedTransactionItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            user.transaction = updatedTransactionItems;
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    const updateTransactionItemsInApi= (updatedTransactionItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            const userId = user.id;
            fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transaction: updatedTransactionItems }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Transaction items updated in API:', data);
                })
                .catch(error => {
                    console.log('Error updating transaction items in API:', error);
                });
        }
    };

    const handleDeleteSelectedItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
      
        // Update the cart items in local storage
        updateCartItemsInStorage(updatedCartItems);
      
        // Update the cart items in the API
        updateCartItemsInApi(updatedCartItems);
    };

    const checkboxes = document.getElementsByClassName('myCheckbox');
    const submitButton = document.getElementById('submitButton');

    Array.from(checkboxes).forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        let atLeastOneChecked = false;
        Array.from(checkboxes).forEach(function(checkbox) {
        if (checkbox.checked) {
            atLeastOneChecked = true;
        }
        });
        submitButton.disabled = !atLeastOneChecked;
    });
    });

      
    
    if (loading) {
        return <PawIcon />;
    }

    return (
        <div className="cart">
            <h1>My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='listcontent'>
                    <div className="columnLabel">
                        <input type="checkbox" className='myCheckbox' checked={selectedItems.length === cartItems.length} onChange={() => handleSelectAll()}/>
                        <h4>Product</h4>
                        <h4 className='unitPrice'>Unit Price</h4>
                        <h4>Quantity</h4>
                        <h4 className='totalprice'>Total Price</h4>
                        <h4>Action</h4>
                    </div>
                    <ul className="productLists">
                        {cartItems.map(item => {
                            const product = getProductById(item.id);
                            return (
                                <li key={item.id}  class="itemContainer">
                                    <input type="checkbox" className='myCheckbox' checked={selectedItems.includes(item.id)} onChange={(event) => handleCheckboxChange(event, item.id)}/>
                                    <div className='productinfo'>
                                        <img src={product ? product.productimage : ''} alt={product ? product.productname : 'Unknown'} />
                                        <div className='productName'>{product ? product.productname : 'Unknown'}</div>
                                        <div className='productVariant'>{product ? product.variant : 'Unknown'}</div>
                                    </div>

                                    <div className='unitPrice'>{product ? `$${product.price}` : 'Unknown'}</div>
                                    <div>
                                        <button className='quantityButton' onClick={() => decrementQuantity(item.id)}>-</button>
                                        <input
                                            className="quantityNumber"
                                            type="number"
                                            min="1"
                                            value={item.qty || 1}
                                            onChange={(event) => handleQuantityChange(event, item.id)}
                                        />
                                        <button className='quantityButton' onClick={() => incrementQuantity(item.id)}>+</button>
                                    </div>
                                    <div className='totalprice'>
                                        {product ? `$${(parseFloat(product.price) * item.qty).toFixed(2)}` : 'Unknown'}
                                    </div>
                                    <div>
                                        <BsTrashFill onClick={() => handleDeleteSelectedItem(item.id)} />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="footing">
                        <div className="allSelectedButtons">
                            <input type="checkbox" className='myCheckbox bottomSelectAll' checked={selectedItems.length === cartItems.length} onChange={() => handleSelectAll()} />
                            <div>
                                <button className="labelButton myCheckbox"  onClick={() => handleSelectAll()}>
                                    Select All
                                </button>
                                <button className="labelButton" onClick={handleDelete}>Delete</button>
                                <button className="labelButton wishlistButton" onClick={moveToWishlist}>Move to Wish List</button> {/* Added button */}
                            </div>
                        </div>
                        <div className='totalItems'>
                            <h4>Total({selectedItems.length} item{selectedItems.length === 1 ? '' : 's'}):</h4>
                            <h4>${getTotalAmount()}</h4>
                            <div className='checkout'>
                                <Checkout handleCheckout={handleCheckout}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
