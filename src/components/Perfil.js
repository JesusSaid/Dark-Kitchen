import React, { useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { collection, doc, setDoc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore';
import styles from '../styles/perfil.module.css';

const Perfil = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Verificar si el usuario existe en Firestore y crearlo si no existe
                await createUserIfNotExists(currentUser);
                // Obtener el carrito del usuario
                fetchCart(currentUser.uid);
            } else {
                setCart([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setCart([]);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const fetchCart = async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                const cartData = userDoc.data().cart || [];
                setCart(cartData);
            } else {
                console.error("El documento del usuario no existe.");
            }
        } catch (error) {
            console.error("Error fetching cart: ", error);
        }
    };                   

    const createUserIfNotExists = async (currentUser) => {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
            await setDoc(userRef, { type: 2, cart: [] });
        }
    };
    

    return (
        <div className={styles.container}>
            {user ? (
                <div>
                    <h1 className={styles.welcomeMessage}>Bienvenido, {user.displayName}!</h1>
                    <button className={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
                    <div className={styles.cartContainer}>
                        <h2 className={styles.cartTitle}>Carrito de Compras</h2>
                        <ul className={styles.cartList}>
                            {cart.map(item => (
                                <li key={item.productId} className={styles.cartItem}>
                                    <span className={styles.itemName}>{item.name}</span> - 
                                    <span className={styles.itemPrice}> ${item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <button className={styles.loginButton} onClick={handleLogin}>Ingresar con Google</button>
            )}
        </div>
    );
};

export default Perfil;
