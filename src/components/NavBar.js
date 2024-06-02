import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Style from "../styles/navbar.module.css";

export default function NavBar() {
    const [activeStyle, setActiveStyle] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

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
        } else {
            setActiveStyle({});
        }
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
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
                        to="/carrito" 
                        className={Style.navbarNavLink} 
                        activeClassName="activo"
                        onClick={closeMenu}>
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
                </div>
            </nav>
        </>
    );
}
