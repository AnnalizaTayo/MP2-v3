import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ handleCheckout }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('');
  
  const handleMonthChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      // If selected month is in the past, clear the input
      setSelectedMonth('');
      alert('Please select a future month');
    } else {
      setSelectedMonth(e.target.value);
    }
  };

  const toggleCheckoutForm = () => {
    setShowCheckout(!showCheckout);
  };

  const toggleMyOrder = () => {
    if (showCheckout) {
      toggleCheckoutForm();
    }
  };

  // eslint-disable-next-line
  const handleCheckboxChange = () => {
    setIsSubmitDisabled(!isSubmitDisabled);
  };

  const handleOrderNowClick = () => {
    const form = document.getElementById('checkoutForm');
    const inputs = form.getElementsByTagName('input');
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].hasAttribute('required') && (!inputs[i].value.trim() || inputs[i].value.includes(' '))) {
        isValid = false;
        inputs[i].classList.add('invalid');
      } else {
        inputs[i].classList.remove('invalid');
        isValid = true;
      }
    }
    if (isValid) {
      alert('Thank you for purchasing!');
      handleCheckout();
      setShowCheckout(!showCheckout);
    } else {
      alert('Please make sure to enter a valid input.');
      return;
    }
  }



  return (
    <div>
      <div className="checkout-button-wrapper" onClick={toggleCheckoutForm}>
        <input className="checkout button checkoutButton" id="submitButton" type="submit" value="Buy Now" disabled={isSubmitDisabled} />
      </div>
      
      <div>
        {showCheckout && (
          <div className="checkoutform">
            <div className="checkout-container">
              <h1>Checkout Form</h1>
              <form id="checkoutForm" className="col-address">
                <div className="shipping-address">
                    <fieldset>
                        <legend>
                        <h3>Delivery Address</h3>
                        </legend>
                        <input type="text" id="country" name="country" placeholder="Country/Region" required />
                        <input type="text" id="address" name="address" placeholder="Address" required />
                        <input
                        type="text"
                        id="appartment"
                        name="appartment"
                        placeholder="Appartment, suite, etc. (Optional)"
                        />
                        <input type="text" id="number" name="number" placeholder="Enter your Number" required />
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </fieldset>
                </div>
                <div className="col-payment">
                    <div className="payment-details">
                    <fieldset>
                        <legend>
                        <h3>Card Payment</h3>
                        </legend>
                        <input type="text" id="cardholderName" name="cardholderName" placeholder="Cardholder Name" required />
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number" required />
                        <input type="month" id="expiryDate" name="expiryDate" placeholder="Expiry Date" value={selectedMonth} onChange={handleMonthChange} required/>
                        <input type="text" id="cvv" name="cvv" placeholder="CVV" required />
                    </fieldset>
                    </div>
                </div>
                <button onClick={toggleMyOrder}>Close</button>
                <button type="submit" onClick={handleOrderNowClick}>
                    Order Now
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
