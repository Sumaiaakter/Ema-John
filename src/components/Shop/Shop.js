import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([])
    useEffect(() => {
        console.log('productcalled');
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data)
                console.log('received')
            });

    }, []);

    useEffect(() => {
        console.log('local storage called')
        if (products.length) {
            const savedCart = getStoredCart();
            // console.log(savedCart);
            const storedCart = [];
            for (const key in savedCart) {
                console.log(key, savedCart[key]);
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                    console.log(addedProduct);
                }

            }
            setCart(storedCart);
        }
    }, [products]); //dependency

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        // console.log(product);

        // added in localStorage
        addToDb(product.key);

    }
    // search product 
    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        //setProducts(matchedProducts) ekhane lekha jabe na
        setDisplayProducts(matchedProducts);
        console.log(matchedProducts.length);
    }
    return (
        <div>
            <div className="search-container">
                <input type='text'
                    onChange={handleSearch}
                    placeholder="Search Product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;