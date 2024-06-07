import React, {useState} from "react";
import Style from "../styles/personalozarPastel.module.css"

const PersonalizarPastel = () => {
    const [peopleOption, setPeopleOption] = useState("");
    const [charactersOption, setCharactersOption] = useState("");
    const [panFlavor, setPanFlavor] = useState("");
    const [fillingFlavor, setFillingFlavor] = useState("");

    const today = new Date();
    const twoDaysAhead = new Date(today);
    twoDaysAhead.setDate(today.getDate() + 3);
    const formattedDate = twoDaysAhead.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });


    return (
        <div className={Style.contenedorPrincipal}>
            <h1 className={Style.tituloPrincipal}>Personaliza tu Pastel</h1>
            <div className={Style.recuadroAviso}>
                ¿Quieres tu pastel para este {formattedDate}? ¡Haz tu pedido HOY!
            </div>
            <div className={Style.descripcion}>
                <strong>Descripción</strong>
                <p>Hacemos cualquier Modelo o Idea</p>
                <p>Solo llena este formato con los detalles de tu pastel. Puedes subir fotos y todos los detalles del modelo que quieres:</p>
            </div>
            <div className={Style.contenedorImg}>
                <img src="./Pasteles_Personalizados.jpg" alt="Cake" className={Style.imagen} />
            </div>
            <div className={Style.contenedorSecundario}>
                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Tamaño</label>
                    <p className={Style.letraSecundaria}>¿Para cuántas personas?</p>
                    <select value={peopleOption} onChange={e => setPeopleOption(e.target.value)} className={Style.select} required>
                        <option value="" disabled>Seleccionar una opción</option>
                        <option value="4-6">4-6 personas (+$400)</option>
                        <option value="6-10">6-10 personas (+$1,000)</option>
                        <option value="10-20">10-20 personas (+$1,180)</option>
                    </select>
                </div>


                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Cantidad de personajes 3D</label>
                    <p className={Style.letraSecundaria}>¿Cuántos personajes en 3D quieres?</p>
                    <select value={charactersOption} onChange={e => setCharactersOption(e.target.value)} className={Style.select} required>
                        <option value="" disabled>Seleccionar una opción</option>
                        <option value="0">Sin personajes</option>
                        <option value="1">1 personaje (+$250)</option>
                        <option value="2">2 personajes (+$500)</option>
                        <option value="3">3 personajes (+$750)</option>
                    </select>
                </div>


                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Descripción Personajes 3D</label>
                    <p className={Style.letraSecundaria}>Describe los personajes en 3D que quieres</p>
                    <textarea rows="2" className={Style.cajaTexto}></textarea>
                </div>


                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Frase y/o Número que llevará tu pastel</label>
                    <p className={Style.letraSecundaria}>Por ej. "Felicidades Tomás" 3</p>
                    <textarea rows="2" className={Style.cajaTexto}></textarea>
                </div>


                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Especifica los Detalles Especiales</label>
                    <p className={Style.letraSecundaria}>Por ej. colores, adornos especiales, etc</p>
                    <textarea rows="2" className={Style.cajaTexto}></textarea>
                </div>


                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Sube la Foto de Modelo que quieres</label>
                    <p className={Style.letraSecundaria}>Aceptamos JPG, JPEG o PNG</p>
                    <input type="file" accept="image/*" className={Style.fileInput} />
                </div>


                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Sabor del pan</label>
                    <div className={Style.radioGroup}>
                        <label><input type="radio" name="panFlavor" value="Vainilla" onChange={e => setPanFlavor(e.target.value)} /> Vainilla</label>
                        <label><input type="radio" name="panFlavor" value="Chocolate" onChange={e => setPanFlavor(e.target.value)} /> Chocolate</label>
                        <label><input type="radio" name="panFlavor" value="Zebra" onChange={e => setPanFlavor(e.target.value)} /> Zebra (pan vainilla y chocolate)</label>
                    </div>
                </div>


                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Sabor de relleno</label>
                    <select value={fillingFlavor} onChange={e => setFillingFlavor(e.target.value)} className={Style.select}>
                        <option value="">Seleccionar una opción</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Vainilla">Vainilla</option>
                        <option value="Limón">Limón</option>
                        <option value="Fresa">Fresa</option>
                    </select>
                </div>


                <button className={Style.botonCarrito}>Agregar al carrito</button>
            </div>
        </div>
    )


}


export default PersonalizarPastel