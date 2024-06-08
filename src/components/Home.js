import React, {useState, useEffect} from "react";
import SanityClient from "../client.js";
import Style from "../styles/home.module.css";

export default function Home(){
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        SanityClient
            .fetch(`*[_type == "evento"]{
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
            .then((data) => setHomeData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <main className="min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center cursive">EL MAMÓN</h1>
                <h2 className="text-lg text-gray-600 flex justify-center mb-12">Repostería Oaxaqueña</h2>
                <div className="grid lg:grid-cols-2 gap-10">
                    {homeData && homeData.map((home) => (
                        <article key={home._id}>
                            <span 
                                className="block h-64 relative rounded shadow leading-snug bg-white border-l-8">
                                <img
                                    style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
                                    src={home.imagen.asset.url}
                                    alt={home.imagen.alt || home.titulo}
                                    className="w-auto h-auto rounded-r"
                                />
                            </span>
                        </article>
                    ))}
                </div>
            </section>
            <section>
                <div className={Style.quotesContainer}>
                    <div className={Style.quoteItem}>
                        <img alt="User 1" src="https://pymstatic.com/5844/conversions/personas-emocionales-wide_webp.webp" className={Style.userImage}/>
                        <blockquote className={Style.quote}>
                            Me encantan los pasteles de "El mamón" porque son únicos, originales y a muy buen precio!
                        </blockquote>
                        <p className={Style.userName}>- Miranda Hernández</p>
                    </div>
                    <div className={Style.quoteItem}>
                        <img alt="User 2" src="https://media.gq.com.mx/photos/640f3efd5b759e424e0f463d/master/w_2560%2Cc_limit/premios%2520oscar%25202023%2520broches%2520hombre.jpg" className={Style.userImage}/>
                        <blockquote className={Style.quote}>
                            Estos pasteles son mis favoritos! Los amo con cada bocado... Gracias por crear algo tan único.
                        </blockquote>
                        <p className={Style.userName}>- Michael B. Jordan</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
