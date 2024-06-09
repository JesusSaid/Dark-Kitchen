import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import Style from "../styles/productDetails.module.css";
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'

const products = {
  sizes: [
    { name: '10', inStock: true },
    { name: '15', inStock: true },
    { name: '25', inStock: true },
    { name: '30', inStock: true },
    { name: '50', inStock: true },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(products.sizes[2])
  

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
    /*<img
                        src={product.imagen.asset.url}
                        alt={product.imagen.alt || product.titulo}
                        className={Style.productImage}
                    />
                    <button className={Style.addToCartButton}>Agregar al carrito</button>
                </div>
                <div className={Style.infoContainer}>
                    <p className={Style.title}>{product.titulo}</p>
                    <p className={Style.description}>{product.descripcion}</p>
                    <span className={Style.price}>${product.precio}</span>*/
    return (
        <div className={Style.app}>
          <div className={Style.details}>
            <div className={Style.bigImg}>
              <img src={product.imagen.asset.url}  alt={product.imagen.alt || product.titulo}/>
            </div>
            <div className={Style.box}>
              <div className={Style.row}>
                <h2>{product.titulo}</h2>
                <span>${product.precio}</span>
              </div>
            <div className={Style.box}>
                  <p>Tamaño por cantidad de personas</p>
            </div>
              <div className={Style.sizes}>
                        {products.sizes.map((size, index) => (
                            <button 
                                key={index} 
                                onClick={() => setSelectedSize(size)} 
                                className={classNames(
                                    size.inStock ? Style.inStock : Style.outOfStock,
                                    selectedSize === size ? Style.selected : ''
                                )}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>
              <p>{product.descripcion}</p>
              <div className={Style.thumb} >
                <img src={product.imagen.asset.url} alt="" />
                <img src={product.imagen.asset.url} alt="" />
                <img src={product.imagen.asset.url} alt="" />
            </div>
              <button className={Style.cart}>Agregar al carrito</button>
            </div>
          </div>
        </div>
    );
}
