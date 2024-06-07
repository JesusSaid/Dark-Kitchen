import React, { useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Charts from './charts';
import styles from '../styles/perfil.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Perfil = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await createUserIfNotExists(currentUser);
                fetchUserTypeAndCart(currentUser.uid);
            } else {
                setCart([]);
                setUserType(null);
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
            setUserType(null);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const fetchUserTypeAndCart = async (userId) => {
        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserType(userData.type);
                setCart(userData.cart || []);
            } else {
                console.error("El documento del usuario no existe.");
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
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
            <ToastContainer />
            {user ? (
                <div>
                    {userType === 1 ? (
                        <>
                            <h1 className={styles.welcomeMessage}>Bienvenido Admin</h1>
                            <Charts />
                            <button className={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
                        </>
                    ) : (
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
                    )}
                </div>
            ) : (
                <button className={styles.loginButton} onClick={handleLogin}>Ingresar con Google</button>
            )}
        </div>
    );
};

export default Perfil;
