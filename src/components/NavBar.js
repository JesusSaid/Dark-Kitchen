import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Style from "../styles/navbar.module.css";
import ShoppingCarSide from "./shoppingCarSide";
import { auth } from '../firebase';

export default function NavBar() {
    const [showShoppingCar, setShowShoppingCar] = useState(false); 
    const [activeStyle, setActiveStyle] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveStyle({ borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem"});
        } else if (location.pathname === "/personalizar_pastel") {
            setActiveStyle({ borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem" });
        } else if (location.pathname === "/catalogo") {
            setActiveStyle({ borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem" });
        } else if (location.pathname === "/eventos") {
            setActiveStyle({ borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem" });
        } else if (location.pathname === "/carrito") {
            setActiveStyle({ borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem" });
        } else if (location.pathname === "/yo") {
            setActiveStyle({ borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem" });
        }else if (location.pathname === "/verPedidos") {
            setActiveStyle({ borderBottom: "0.2rem solid white" });
        } else {
            setActiveStyle({});
        }
    }, [location]);

    useEffect(() => {
        // Verificar si hay un usuario autenticado
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid); // Obtener el userId y almacenarlo en el estado
            } else {
                setUserId(null); // Si no hay usuario autenticado, establecer userId como null
            }
        });

        return () => unsubscribe(); // Limpiar suscripción al desmontar el componente
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleShoppingCarToggle = () => {
        setShowShoppingCar(!showShoppingCar); // Toggle el componente cuando se hace clic
    };

    return (
        <>
            <div className={Style.papelPicadoContainer}></div>
            <nav className={Style.navbarNav}>
                <NavLink to='/' className={Style.navbarNavLink}>
                    <Link to="/"><img src="./descarga.jpg" alt="Logo" className={Style.logoImg} onClick={closeMenu}/></Link>
                </NavLink>
                <div className={Style.hamburgerMenu} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <div className={`${Style.navbarRightLinks} ${isMenuOpen ? Style.showMenu : ''}`}>
                    <NavLink to='/' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/" ? activeStyle : {}} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faHome} />
                    </NavLink>
                    <NavLink to='/verPedidos' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/verPedidos" ? activeStyle : {}} onClick={closeMenu}>
                        Pedidos
                    </NavLink>
                    <NavLink to='/personalizar_pastel' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/personalizar_pastel" ? activeStyle : {}} onClick={closeMenu}>
                        Personalizar
                    </NavLink>
                    <NavLink to='/catalogo' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/catalogo" ? activeStyle : {}} onClick={closeMenu}>
                        Catálogo
                    </NavLink>
                    <NavLink to='/eventos' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/eventos" ? activeStyle : {}} onClick={closeMenu}>
                        Eventos
                    </NavLink>
                    <NavLink
                        style={location.pathname === "/carrito" ? activeStyle : {}}
                        aria-label="Carrito"
                        className={Style.navbarNavLink}
                        activeClassName="activo"
                        onClick={handleShoppingCarToggle}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                    </NavLink>
                    <NavLink 
                        style={location.pathname === "/yo" ? activeStyle : {}}
                        aria-label="Perfil"
                        to="/yo" 
                        className={Style.navbarNavLink} 
                        activeClassName="" 
                        onClick={closeMenu}>
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                    {showShoppingCar && <ShoppingCarSide isOpen={showShoppingCar} onClose={() => setShowShoppingCar(false)} userId={userId}/>}
                </div>
            </nav>
        </>
    );
}
