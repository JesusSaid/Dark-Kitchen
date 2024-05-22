import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import SanityClient from "../client.js"

export default function Catalogue(){
    const [catalogueData, setCatalogueData] = useState(null);

    useEffect(() => {
        SanityClient
            .fetch(`*[_type == "product"]{
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

    return (
        <main className="min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center cursive">
                    CATÁLOGO
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catalogueData && catalogueData.map((catalogue, index) => (
                    <article>
                        <Link to = {"/catalogue/" + catalogue.titulo.current} key = {catalogue.titulo.current}>
                            <span
                                className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-400"
                                key = {index}
                            >
                                <img
                                    src = {catalogue.imagen.asset.url}
                                    alt = {catalogue.imagen.alt || catalogue.titulo}
                                    className="w-full h-full rounded-r object-cover absolute"
                                />
                                <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                                    <h3 className="text-gray-800 text-lg font-blog px-3 py-4 bg-red-700 text-red-100 bg-opacity-75 rounded">
                                        {catalogue.titulo}
                                    </h3>
                                </span>
                            </span>
                        </Link>
                    </article>
                    ))}
                </div>
            </section>
        </main>
    );
}