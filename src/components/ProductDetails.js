import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import Style from "../styles/productDetails.module.css";
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'

const products = {
 
  
  sizes: [
    { name: '10 personas', inStock: true },
    { name: '15 personas', inStock: true },
    { name: '25 personas', inStock: true },
  ],
 }
const reviews = { href: '#', average: 4, totalCount: 117 }

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
    <div className="bg-white">
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Galería de fotos */}
        <div className="mx-auto max-w-2xl sm:px-6 lg:grid-cols-2 lg:max-w-2xl lg:grid-cols-3 lg:grid-rows-[auto,auto,2fr] lg:gap-x-10 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:row-span-1">
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
                src={product.imagen.asset.url}
                alt={product.imagen.alt || product.titulo}
                className="h-full w-full object-cover object-center"
            />
            </div>
        </div>
        <div className="lg:row-span-1 lg:grid lg:grid-cols-3 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
                src={product.imagen.asset.url}
                alt={product.imagen.alt || product.titulo}
                className="h-full w-full object-cover object-center"
            />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
                src={product.imagen.asset.url}
                alt={product.imagen.alt || product.titulo}
                className="h-full w-full object-cover object-center"
            />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
                src={product.imagen.asset.url}
                alt={product.imagen.alt || product.titulo}
                className="h-full w-full object-cover object-center"
            />
            </div>
         </div>
        </div>


         {/*Informacion del producto*/}
          <div className="mx-auto max-w-2xl sm:px-6 lg:grid-cols-2 lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,2fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.titulo}</h1>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.precio}</p>
              <form className="mt-10">
                <div>
                <h3 className="sr-only">Descripcion</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.descripcion}</p>
                </div>
              </div>
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Tamano</h3>
                  </div>
                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {products.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ focus }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              focus ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ checked, focus }) => (
                            <>
                              <span>{size.name}</span>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    focus ? 'border' : 'border-2',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
                <button type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                 Agregar al carrtito
                </button>
              </form>
            </div>            
          </div>
        </div>
      </div>
    );
}
