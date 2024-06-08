import React, { useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Charts from './charts';
import styles from '../styles/perfil.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Perfil = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [userType, setUserType] = useState(null);
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        address: '',
        phone: ''
    });

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

    useEffect(() => {
        setFormData({
            nombre: userData.nombre || '',
            address: userData.address || '',
            phone: userData.phone || ''
        });
    }, [userData]);

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
                setUserData(userData);
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
            const { displayName, email } = currentUser;
            const userData = {
                type: 2,
                nombre: displayName,
                cart: [],
                address: '',
                phone: '',
                email: email
            };
            await setDoc(userRef, userData);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userRef = doc(db, 'users', user.uid);
        try {
            await setDoc(userRef, { ...userData, ...formData }, { merge: true });
            setUserData({ ...userData, ...formData });
            setIsEditing(false);
            toast.success("Datos actualizados correctamente");
        } catch (error) {
            console.error("Error updating user data: ", error);
            toast.error("Error al actualizar datos");
        }
    };

    return (
        <div className={styles.container}>
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
                            {isEditing ? (
                                <form className={styles.datos} onSubmit={handleSubmit}>
                                    <label>
                                        <strong>Nombre:</strong>
                                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                                    </label>
                                    <label>
                                        <strong>Dirección:</strong>
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                                    </label>
                                    <label>
                                        <strong>Teléfono:</strong>
                                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                                    </label>
                                    <div>
                                        <button type="submit" className={styles.botonGuardar}>Guardar</button>
                                        <span style={{ marginRight: '1rem' }}></span>
                                        <button type="button" className={styles.botonCancelar} onClick={handleCancelEdit}>Cancelar</button>
                                    </div>
                                </form>
                            ) : (
                                <div className={styles.datosUsuario}>
                                    <p><strong>Nombre: </strong> {userData.nombre}</p>
                                    <p><strong>Dirección: </strong> {userData.address}</p>
                                    <p><strong>Teléfono: </strong> {userData.phone}</p>
                                    <p><strong>Correo electrónico: </strong> {user.email}</p>
                                    <button className={styles.boton} onClick={handleEdit}>Editar</button>
                                </div>
                            )}
                            <button className={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <h1 className={styles.welcomeMessage}>Inicia sesión para ver tu perfil</h1>
                    <button className={styles.loginButton} onClick={handleLogin}>Ingresar con Google</button>
                </>
            )}
        </div>
    );
};

export default Perfil;
