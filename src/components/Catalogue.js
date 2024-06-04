import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SanityClient from "../client.js";
import Style from "../styles/catologo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Catalogue() {
    const [catalogueData, setCatalogueData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    
    useEffect(() => {
        SanityClient
            .fetch(`*[_type == "product"]{
                _id,
                titulo,
                imagen{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                descripcion,
                precio
            }`)
            .then((data) => setCatalogueData(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex(prevIndex => (prevIndex + 1) % placeholders.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const placeholders = ['Buscar', 'Panquesitos', 'Pasteles'];
    
    const filteredPosts = catalogueData && catalogueData.filter(post => {
        const searchTextLower = searchText.toLowerCase();
        const tituloMatch = post.titulo.toLowerCase().includes(searchTextLower);
        const descripcionMatch = post.descripcion.toLowerCase().includes(searchTextLower);
        const precioMatch = post.precio.toString().includes(searchTextLower.replace('$', '')) || 
                            `$${post.precio}`.includes(searchTextLower);
        return tituloMatch || descripcionMatch || precioMatch;
    });           

    const handleSearchChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
    };

    const addToCart = async (productId, productName, productPrice) => {
        const user = auth.currentUser;
        if (!user) {
            toast.error("Por favor, inicia sesión para añadir productos al carrito.");
            return;
        }
    
        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                const cart = userDoc.data().cart || [];
                // Agregar el nuevo producto al carrito existente
                cart.push({ productId: productId, name: productName, price: productPrice });
                // Actualizar el documento del usuario con el nuevo carrito
                await setDoc(userRef, { cart: cart }, { merge: true });
                toast.success("Producto añadido al carrito.");
            } else {
                console.error("El documento del usuario no existe.");
                toast.error("Hubo un error al añadir el producto al carrito.");
            }
        } catch (error) {
            console.error("Error adding to cart: ", error);
            toast.error("Hubo un error al añadir el producto al carrito");
        }
    };        

    return (
        <main>
            <div className={Style.inputWrapper}>
                <input
                    type="text"
                    name="text"
                    className={Style.inputBuscar}
                    placeholder={placeholders[placeholderIndex]}
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
            <hr/>
            <div className={Style.gridContainer} >
            {filteredPosts && filteredPosts.map((catalogue) => (
                <div className={Style.card} key={catalogue._id}>
                    <Link to={`/producto/${catalogue._id}`}>
                        <div className={Style.cardimg}>
                            <img
                                src={catalogue.imagen.asset.url}
                                alt={catalogue.imagen.alt || catalogue.titulo} style={{objectFit:'cover'}} width="160" height="160"
                            />
                        </div>
                    </Link>
                    <Link to={`/producto/${catalogue._id}`}>
                        <div className={Style.cardinfo}>
                            <p className={Style.texttitle}>{catalogue.titulo}</p>
                            <p className="text-body">{catalogue.descripcion}</p>
                        </div>
                    </Link>
                    <div className={Style.cardfooter}>
                        <span className={Style.texttitle}>${catalogue.precio}</span>
                        <div className={Style.cardbutton} onClick={() => addToCart(catalogue._id, catalogue.titulo, catalogue.precio)}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </main>
    );
}
