import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Style from "../styles/navbar.module.css";

export default function NavBar() {
    const [activeStyle, setActiveStyle] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveStyle({ borderBottom: "0.2rem solid white" });
        } else if (location.pathname === "/personalizar_pastel") {
            setActiveStyle({ borderBottom: "0.2rem solid white" });
        } else if (location.pathname === "/catalogo") {
            setActiveStyle({ borderBottom: "0.2rem solid white" });
        }  else if (location.pathname === "/eventos") {
            setActiveStyle({ borderBottom: "0.2rem solid aliceblue", paddingBottom: "0.25rem" });
        } else if (location.pathname === "/carrito") {
            setActiveStyle({ borderBottom: "0.2rem solid white" });
        } else if (location.pathname === "/yo") {
            setActiveStyle({ borderBottom: "0.2rem solid white" });
        }else if (location.pathname === "/verpedidos") {
        setActiveStyle({ borderBottom: "0.2rem solid white" });
        }else {
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
        <header className={Style.cabecera}>
            <nav className={Style.navbarNav}>
                <NavLink to='/' className={Style.navbarNavLink}>
                    <Link to="/"><img src="./descarga.jpg" alt="Logo" className={Style.logoImg} onClick={closeMenu}/></Link>
                </NavLink>
                <div className={Style.hamburgerMenu} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>
                <div className={`${Style.navbarRightLinks} ${isMenuOpen ? Style.showMenu : ''}`}>
                    <NavLink to='/' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/" ? activeStyle : {}} onClick={closeMenu}>
                        Inicio
                    </NavLink>
                    <NavLink to='/verpedidos' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/personalizar_pastel" ? activeStyle : {}} onClick={closeMenu}>
                        Pedidos
                    </NavLink>
                    <NavLink to='/personalizar_pastel' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/personalizar_pastel" ? activeStyle : {}} onClick={closeMenu}>
                        Personalizar
                    </NavLink>
                    <NavLink to='/catalogo' activeclassname="activo" className={Style.navbarNavLink} style={location.pathname === "/catalogo" ? activeStyle : {}} onClick={closeMenu}>
                        Catalogo
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>    
                    </NavLink>
                    <NavLink 
                        style={location.pathname === "/yo" ? activeStyle : {}}
                        aria-label="Perfil"
                        to="/yo" 
                        className={Style.navbarNavLink} 
                        activeClassName="" 
                        onClick={closeMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
