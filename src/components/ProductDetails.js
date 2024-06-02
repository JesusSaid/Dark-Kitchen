import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import Style from "../styles/catologo.module.css";
import { useCart } from "../components/context/CartContext.js"; // Importar useCart correctamente

export default function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart(); // Usar el contexto del carrito correctamente
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        SanityClient
            .fetch(`*[_type == "product" && _id == $productId]{
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
            }`, { productId })
            .then((data) => setProduct(data[0]))
            .catch(err => console.error(err));
    }, [productId]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000); // Ocultar el modal después de 2 segundos
    };

    if (!product) return <div>Loading...</div>;

    return (
        <main className="min-h-screen p-12">
            <div className={Style.productDetails}>
                <div className={Style.imageContainer}>
                    <img
                        src={product.imagen.asset.url}
                        alt={product.imagen.alt || product.titulo}
                        className={Style.productImage}
                    />
                    <button 
                        className={Style.addToCartButton}
                        onClick={() => handleAddToCart(product)} // Llamar a la función para agregar al carrito
                    >
                        Agregar al carrito
                    </button>
                </div>
                <div className={Style.infoContainer}>
                    <p className={Style.title}>{product.titulo}</p>
                    <p className={Style.description}>{product.descripcion}</p>
                    <span className={Style.price}>${product.precio}</span>
                </div>
            </div>
            {showModal && (
                <div className={Style.modal}>
                    <p>Producto agregado</p>
                </div>
            )}
        </main>
    );
}
