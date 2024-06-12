import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Style from "../styles/navbar.module.css";
import ShoppingCarSide from "./shoppingCarSide";
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function NavBar() {
    const [showShoppingCar, setShowShoppingCar] = useState(false); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();// Depuración
                        setUserType(userData.type);
                    } else {
                        console.error("El documento del usuario no existe.");
                    }
                } catch (error) {
                    console.error("Error al obtener el tipo de usuario: ", error);
                }
            } else {
                setUserId(null);
                setUserType(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const getActiveStyle = (path) => {
        return location.pathname === path ? { borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem" } : {};
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleShoppingCarToggle = () => {
        setShowShoppingCar(!showShoppingCar);
    };

    return (
        <>
            <div className={Style.papelPicadoContainer}></div>
            <nav className={Style.navbarNav}>
                <NavLink to='/' className={Style.navbarNavLink}>
                    <Link to="/"><img src="./descarga.jpg" alt="Logo" className={Style.logoImg} onClick={closeMenu} /></Link>
                </NavLink>
                <div className={Style.hamburgerMenu} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <div className={`${Style.navbarRightLinks} ${isMenuOpen ? Style.showMenu : ''}`}>
                    {userType === 1 ? (
                        <>
                            <NavLink to='/' activeclassname="activo" className={Style.navbarNavLink} style={getActiveStyle("/")} onClick={closeMenu}>
                                <FontAwesomeIcon icon={faHome} />
                            </NavLink>
                            <NavLink to='/verPedidos' activeclassname="activo" className={Style.navbarNavLink} style={getActiveStyle("/verPedidos")} onClick={closeMenu}>
                                Pedidos
                            </NavLink>
                            <NavLink to='/yo' activeclassname="activo" className={Style.navbarNavLink} style={getActiveStyle("/yo")} onClick={closeMenu}>
                                <FontAwesomeIcon icon={faUser} />
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to='/' activeclassname="activo" className={Style.navbarNavLink} style={getActiveStyle("/")} onClick={closeMenu}>
                                <FontAwesomeIcon icon={faHome} />
                            </NavLink>
                            <NavLink to='/personalizar_pastel' activeclassname="activo" className={Style.navbarNavLink} style={getActiveStyle("/personalizar_pastel")} onClick={closeMenu}>
                                Personalizar
                            </NavLink>
                            <NavLink to='/catalogo' activeclassname="activo" className={Style.navbarNavLink} style={getActiveStyle("/catalogo")} onClick={closeMenu}>
                                Catálogo
                            </NavLink>
                            <NavLink to='/eventos' activeclassname="activo" className={Style.navbarNavLink} style={getActiveStyle("/eventos")} onClick={closeMenu}>
                                Eventos
                            </NavLink>
                            <NavLink
                                style={getActiveStyle("/carrito")}
                                aria-label="Carrito"
                                className={Style.navbarNavLink}
                                activeClassName="activo"
                                onClick={handleShoppingCarToggle}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </NavLink>
                            <NavLink
                                style={getActiveStyle("/yo")}
                                aria-label="Perfil"
                                to="/yo"
                                className={Style.navbarNavLink}
                                activeClassName=""
                                onClick={closeMenu}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </NavLink>
                        </>
                    )}
                    {showShoppingCar && <ShoppingCarSide isOpen={showShoppingCar} onClose={() => setShowShoppingCar(false)} userId={userId}/>}
                </div>
            </nav>
        </>
    );
}
