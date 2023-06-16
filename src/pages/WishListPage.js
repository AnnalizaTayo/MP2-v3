import React, { useState, useEffect } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import PawIcon from '../components/PawIcon';
import Checkout from '../components/Checkout';

const WishListPage = () => {
    const [wishListItems, setWishListItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [cart, setCart] = useState([]);    
    const [transaction, setTransaction] = useState([]);
    
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setCart(user.cart);
            setWishListItems(user.wishlist);
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
        const allItemIds = wishListItems.map(item => item.id);
        const isAllSelected = allItemIds.every(id => selectedItems.includes(id));
    
        // Update the checkbox in columnLabel
        const columnLabelCheckbox = document.querySelector('.columnLabel input[type="checkbox"]');
        if (columnLabelCheckbox) {
            columnLabelCheckbox.checked = isAllSelected;
        }
    };
    

    const updateQuantityInWishList = (itemId, newQty) => {
        const updatedWishListItems = wishListItems.map(item => {
            if (item.id === itemId) {
                return { ...item, qty: newQty };
            }
            return item;
        });
        setWishListItems(updatedWishListItems);
        updateWishListItemsInStorage(updatedWishListItems); // Update the wish list items in local storage
        updateWishListItemsInApi(updatedWishListItems); // Update the wish list items in the API
    };

    const handleQuantityChange = (event, itemId) => {
        const newQty = parseInt(event.target.value);
        updateQuantityInWishList(itemId, newQty);
    };

    const incrementQuantity = (itemId) => {
        const item = wishListItems.find(item => item.id === itemId);
        if (item) {
            const newQty = item.qty + 1;
            updateQuantityInWishList(itemId, newQty);
        }
    };

    const decrementQuantity = (itemId) => {
        const item = wishListItems.find(item => item.id === itemId);
        if (item && item.qty > 1) {
            const newQty = item.qty - 1;
            updateQuantityInWishList(itemId, newQty);
        }
    };

    const getTotalAmount = () => {
        let total = 0;
        selectedItems.forEach(itemId => {
            const item = wishListItems.find(item => item.id === itemId);
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
        if (selectedItems.length === wishListItems.length) {
            setSelectedItems([]);
            input.disabled = true;
        } else {
            const allItemIds = wishListItems.map(item => item.id);
            setSelectedItems(allItemIds);
            input.disabled = false;
        }
    };

    const handleDelete = () => {
        const updatedWishListItems = wishListItems.filter(item => !selectedItems.includes(item.id));
        setWishListItems(updatedWishListItems);
        setSelectedItems([]);
    
        updateWishListItemsInStorage(updatedWishListItems);
        updateWishListItemsInApi(updatedWishListItems);
    };

    const moveToCart = () => {
        const updatedWishListItems = wishListItems.filter(item => !selectedItems.includes(item.id));
        const selectedWishListItems = wishListItems.filter(item => selectedItems.includes(item.id));
    
        const updatedCartItems = [...cart, ...selectedWishListItems];
    
        setWishListItems(updatedWishListItems);
        setCart(updatedCartItems);
        setSelectedItems([]);
    
        updateWishListItemsInStorage(updatedWishListItems);
        updateCartItemsInStorage(updatedCartItems);
        updateWishListItemsInApi(updatedWishListItems);
        updateCartItemsInApi(updatedCartItems);
    };
        

    const updateWishListItemsInStorage = (updatedWishListItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            user.wishlist = updatedWishListItems;
            localStorage.setItem('user', JSON.stringify(user));
        }
    };

    const updateWishListItemsInApi = (updatedWishListItems) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            const userId = user.id;
            fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wishlist: updatedWishListItems }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Wish list items updated in API:', data);
                })
                .catch(error => {
                    console.log('Error updating wishlist items in API:', error);
                });
        }
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
                body: JSON.stringify({ wishlist: updatedCartItems }),
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
        const selectedWishListItems = wishListItems.filter(item => selectedItems.includes(item.id));
        const updatedWishListItems = wishListItems.filter(item => !selectedItems.includes(item.id));
      
        const numericDate = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 1000);
        const transactionId = `${numericDate}${randomNumber}`;
      
        const transactionItems = selectedWishListItems.map(item => ({
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
      
        setWishListItems(updatedWishListItems);
        setTransaction(updatedTransactionItems);
        setSelectedItems([]);
      
        updateWishListItemsInStorage(updatedWishListItems);
        updateTransactionItemsInStorage(updatedTransactionItems);
        updateWishListItemsInApi(updatedWishListItems);
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
    
    const updateTransactionItemsInApi = (updatedTransactionItems) => {
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
        const updatedWishListItems = wishListItems.filter(item => item.id !== itemId);
        setWishListItems(updatedWishListItems);
      
        // Update the wishList items in local storage
        updateWishListItemsInStorage(updatedWishListItems);
      
        // Update the WishList items in the API
        updateWishListItemsInApi(updatedWishListItems);
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
        <div className="wishlist">
            <h1>My Wish List</h1>
            {wishListItems.length === 0 ? (
                <p>Your wish list is empty.</p>
            ) : (
                <div className='listcontent'>
                    <div className="columnLabel">
                        <input type="checkbox" className="myCheckbox" checked={selectedItems.length === wishListItems.length} onChange={() => handleSelectAll()}/>
                        <h4>Product</h4>
                        <h4 className='unitPrice'>Unit Price</h4>
                        <h4>Quantity</h4>
                        <h4 className='totalprice'>Total Price</h4>
                        <h4>Action</h4>
                    </div>
                    <ul className="productLists">
                        {wishListItems.map(item => {
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
                            <input type="checkbox" className='myCheckbox bottomSelectAll' checked={selectedItems.length === wishListItems.length} onChange={() => handleSelectAll()} />
                            <div>
                                <button className="labelButton myCheckbox" onClick={() => handleSelectAll()}>
                                    Select All
                                </button>
                                <button className="labelButton" onClick={handleDelete}>Delete</button>
                                <button className="labelButton cartButton" onClick={moveToCart}>Move to Cart</button> 
                            </div>
                        </div>
                        <div  className='totalItems'>
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

export default WishListPage;
