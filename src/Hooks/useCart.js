import { useEffect, useState } from "react"
import { getStoredCart } from '../utilities/fakedb';
const useCart = (products) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storeCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                // set quantity
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storeCart.push(addedProduct);
                }

            }
            setCart(storeCart);

        }
    }, [products])
    return [cart];
}

export default useCart;