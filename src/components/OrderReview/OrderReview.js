import React from 'react';
import useProducts from '../../Hooks/UseProducts';
import useCart from '../../Hooks/useCart';

const OrderReview = () => {
    const [products, setProducts] = useProducts();

    const [cart] = useCart(products);

    return (
        <div>
            <h1>{products.length}</h1>
            <h3>{cart.length}</h3>
            <h2>this is order review page</h2>
        </div>
    );
};

export default OrderReview;