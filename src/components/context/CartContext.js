import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = [];

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProductIndex = state.findIndex(item =>
                item.titulo === action.payload.titulo &&
                item.imagen.asset.url === action.payload.imagen.asset.url &&
                item.precio === action.payload.precio
            );
            if (existingProductIndex >= 0) {
                const updatedCart = [...state];
                updatedCart[existingProductIndex].quantity += 1; // Incrementar la cantidad del producto existente
                return updatedCart;
            }
            return [...state, { ...action.payload, quantity: 1 }]; // Agregar el producto al carrito con cantidad 1
        default:
            return state;
    }
};


export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
