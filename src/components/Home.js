import React, {useState, useEffect} from "react";
import SanityClient from "../client.js";

export default function Home(){
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        SanityClient
            .fetch(`*[_type == "evento"]{
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
            .then((data) => setHomeData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <main className="bg-green-100 min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center cursive">EL MAMÓN</h1>
                <h2 className="text-lg text-gray-600 flex justify-center mb-12">Repostería Oaxaqueña</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {homeData && homeData.map((home, index) => (
                    <article>
                            <span 
                                className="block h-64 relative rounded shadow leading-snug bg-white border-l-8"
                                key={index}
                            >
                                <img
                                    style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
                                    src={home.imagen.asset.url}
                                    alt={home.imagen.alt || home.titulo}
                                    className="w-auto h-full rounded-r"
                                />
                            </span>
                    </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
