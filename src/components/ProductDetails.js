import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import Style from "../styles/catologo.module.css";

export default function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

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
                    <button className={Style.addToCartButton}>Agregar al carrito</button>
                </div>
                <div className={Style.infoContainer}>
                    <p className={Style.title}>{product.titulo}</p>
                    <p className={Style.description}>{product.descripcion}</p>
                    <span className={Style.price}>${product.precio}</span>
                </div>
            </div>
        </main>
    );
}
