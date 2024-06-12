import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from "../styles/productDetails.module.css";

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
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(products.sizes[2])
    const [selectedPrice, setSelectedPrice] = useState(null);
    const { productId } = useParams();

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
            .then((data) => {
                setProduct(data[0]);
                setSelectedPrice(data[0].precio); // Asignar el precio inicial al seleccionar el producto
            })
            .catch(err => console.error(err));
    }, [productId]);

    const calculatePrice = (selectedSizeName) => {
        let price = product.precio;
        switch (selectedSizeName) {
            case '15':
                price += 100;
                break;
            case '25':
                price += 200;
                break;
            case '30':
                price += 300;
                break;
            case '50':
                price += 400;
                break;
            default:
                break;
        }
        setSelectedPrice(price);
    };

    if (!product) return <div>Loading...</div>;

    const addToCart = async (productId, productName, productPrice, productImage) => {
      console.log("productId:", productId);
      console.log("productName:", productName);
      console.log("productPrice:", productPrice);
      console.log("productImage:", productImage);
    
      const user = auth.currentUser;
      if (!user) {
          toast.info("Por favor, inicia sesión para añadir productos al carrito.");
          return;
      }
    
      try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
    
          if (userDoc.exists()) {
              const cart = userDoc.data().cart || [];
              // Agregar el nuevo producto al carrito existente
              cart.push({ 
                  productoId: productId, 
                  nombre: productName, 
                  precio: productPrice,
                  imagen: productImage // Agregar la URL de la imagen al carrito
              });
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
        <div className={Style.app}>
          <div className={Style.details}>
            <div className={Style.bigImg}>
              <img src={product.imagen.asset.url}  alt={product.imagen.alt || product.titulo}/>
            </div>
            <div className={Style.box}>
              <div className={Style.row}>
                <h2>{product.titulo}</h2>
                <span>${selectedPrice}</span>
              </div>
            <div className={Style.box}>
                  <p>Tamaño por cantidad de personas</p>
            </div>
              <div className={Style.sizes}>
                        {products.sizes.map((size, index) => (
                            <button 
                                key={index} 
                                onClick={() => {
                                    setSelectedSize(size);
                                    calculatePrice(size.name);
                                }} 
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
            <button 
  className={Style.cart}
  onClick={() => {
    if (selectedPrice !== null) {
      addToCart(productId, product.titulo, selectedPrice, product.imagen.asset.url);
    } else {
      // Manejar el caso en que el precio seleccionado sea null o undefined
      console.error("El precio seleccionado es inválido.");
      toast.error("Hubo un error al añadir el producto al carrito");
    }
  }}
>
  Agregar al carrito
</button>

            </div>
          </div>
        </div>
    );
}
