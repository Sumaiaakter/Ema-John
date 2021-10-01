import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const { cart } = props;
    console.log(cart);
    // const totalReducer = (prevValue, currentValue) => prevValue + currentValue.price
    // const total = cart.reduce(totalReducer, 0).toFixed(2)
    // const tax = 0.1 * total;
    // let totalPrice = parseFloat(total + tax).toFixed(2);




    // console.log(cart)
    let totalQuantity = 0;
    let total = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    const shipping = total > 0 ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;

    return (
        <div>
            <h3>Order summary</h3>
            <h5><i class="fas fa-shopping-cart"></i>: {totalQuantity}</h5>
            <ul>
                {
                    cart.map(product => <li>{product.name}</li>)
                }
            </ul>
            <p>total: {total}</p>
            <p>Shipping: {shipping}</p>
            <p>Tax: {tax}</p>
            <p>Total Price: {grandTotal}</p>

        </div>
    );
};

export default Cart;