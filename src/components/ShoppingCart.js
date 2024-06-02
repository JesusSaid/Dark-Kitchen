import React from 'react';
import { useCart } from '../components/context/CartContext';
import Style from "../styles/shoppingCart.module.css";

export default function ShoppingCart() {
    const { cart } = useCart();

    // Calcular el precio total
    const totalPrice = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

    return (
        <div className={Style.cartContainer}>
            <h1 className={Style.cartTitle}>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p className={Style.emptyCartMessage}>El carrito está vacío</p>
            ) : (
                <>
                    <div className={Style.cartItemsContainer}>
                        {cart.map(item => (
                            <div key={item._id} className={Style.cartItem}>
                                <img 
                                    src={item.imagen.asset.url} 
                                    alt={item.titulo} 
                                    className={Style.productImage} 
                                />
                                <p className={Style.itemTitle}>{item.titulo}</p>
                                <p className={Style.itemDetail}>Cantidad: {item.quantity}</p>
                                <p className={Style.itemDetail}>Precio: ${item.precio}</p>
                            </div>
                        ))}
                    </div>
                    <div className={Style.totalPriceContainer}>
                        <p className={Style.totalPrice}>Precio total: ${totalPrice.toFixed(2)}</p>
                        <button className={Style.orderButton}>Solicitar Pedido</button>
                    </div>
                </>
            )}
        </div>
    );
}
