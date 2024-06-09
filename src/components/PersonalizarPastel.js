import React, {useState} from "react";
import Style from "../styles/personalozarPastel.module.css"
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const PersonalizarPastel = ({ userId }) => {
    const [peopleOption, setPeopleOption] = useState("");
    const [charactersOption, setCharactersOption] = useState("");
    const [panFlavor, setPanFlavor] = useState("");
    const [fillingFlavor, setFillingFlavor] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [descripcionPersonajes, setDescripcionPersonajes] = useState("");
    const [fraseNumero, setFraseNumero] = useState("");
    const [detallesEspeciales, setDetallesEspeciales] = useState("");

    const today = new Date();
    const twoDaysAhead = new Date(today);
    twoDaysAhead.setDate(today.getDate() + 3);
    const formattedDate = twoDaysAhead.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const addToCart = async () => {
        // Validar si todos los campos están completos
    if (!peopleOption || !charactersOption || !panFlavor || !fillingFlavor || !imagePreview || !descripcionPersonajes || !fraseNumero || !detallesEspeciales) {
        toast.error("Por favor, completa todos los campos antes de agregar al carrito.");
        return;
    }
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

            // Calcular el precio del pastel personalizado
            let price = 0;
            if (peopleOption === "4-6") price += 400;
            else if (peopleOption === "6-10") price += 1000;
            else if (peopleOption === "10-20") price += 1180;

            if (charactersOption === "1") price += 250;
            else if (charactersOption === "2") price += 500;
            else if (charactersOption === "3") price += 750;

            // Agregar el nuevo pastel personalizado al carrito existente
            cart.push({ 
                nombre: "Pastel Personalizado", 
                precio: price, 
                productoId: uuidv4(),
                detalles: { 
                    tamanio: peopleOption,
                    personajes: charactersOption,
                    saborPan: panFlavor,
                    saborRelleno: fillingFlavor,
                    imagen: imagePreview,
                    descripcionPersonajes: descripcionPersonajes,
                    fraseNumero: fraseNumero,
                    detallesEspeciales: detallesEspeciales
                }
            });

            // Actualizar el documento del usuario con el nuevo carrito
            await setDoc(userRef, { cart: cart }, { merge: true });
            toast.success("Pastel personalizado añadido al carrito.");

            // Limpiar los estados después de agregar al carrito
            setPeopleOption("");
            setCharactersOption("");
            setPanFlavor("");
            setFillingFlavor("");
            setImagePreview(null);
            setDescripcionPersonajes("");
            setFraseNumero("");
            setDetallesEspeciales("");
        } else {
            console.error("El documento del usuario no existe.");
            toast.error("Hubo un error al añadir el pastel personalizado al carrito.");
        }
    } catch (error) {
        console.error("Error adding custom cake to cart: ", error);
        toast.error("Hubo un error al añadir el pastel personalizado al carrito.");
    }
};           

    return (
        <main className={Style.contenedorPrincipal}>
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
                    <textarea rows="2" className={Style.cajaTexto} value={descripcionPersonajes} onChange={e => setDescripcionPersonajes(e.target.value)}></textarea>
                </div>

                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Frase y/o Número que llevará tu pastel</label>
                    <p className={Style.letraSecundaria}>Por ej. "Felicidades Tomás" 3</p>
                    <textarea rows="2" className={Style.cajaTexto} value={fraseNumero} onChange={e => setFraseNumero(e.target.value)}></textarea>
                </div>

                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Especifica los Detalles Especiales</label>
                    <p className={Style.letraSecundaria}>Por ej. colores, adornos especiales, etc</p>
                    <textarea rows="2" className={Style.cajaTexto} value={detallesEspeciales} onChange={e => setDetallesEspeciales(e.target.value)}></textarea>
                </div>

                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Sube la Foto de Modelo que quieres</label>
                    <p className={Style.letraSecundaria}>Aceptamos JPG, JPEG o PNG</p>
                    <input
                        type="file"
                        accept="image/*"
                        className={Style.fileInput}
                        onChange={handleImageChange}
                    />
                    <div className={Style.imagenElegida}>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className={Style.imagePreview} />
                        )}
                    </div>
                </div>

                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Sabor del pan</label>
                    <div className={Style.radioGroup}>
                        <label><input type="radio" name="panFlavor" value="Vainilla" checked={panFlavor === "Vainilla"} onChange={() => setPanFlavor("Vainilla")} /> Vainilla</label>
                        <label><input type="radio" name="panFlavor" value="Chocolate" checked={panFlavor === "Chocolate"} onChange={() => setPanFlavor("Chocolate")} /> Chocolate</label>
                        <label><input type="radio" name="panFlavor" value="Zebra" checked={panFlavor === "Zebra"} onChange={() => setPanFlavor("Zebra")} /> Zebra (pan vainilla y chocolate)</label>
                    </div>
                </div>

                <div className={Style.seccion}>
                    <label className={Style.letraPrincipal}>Sabor de relleno</label>
                    <select value={fillingFlavor} onChange={e => setFillingFlavor(e.target.value)} className={Style.select} required>
                        <option value="" disabled>Seleccionar una opción</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Vainilla">Vainilla</option>
                        <option value="Limón">Limón</option>
                        <option value="Fresa">Fresa</option>
                    </select>
                </div>

                <button className={Style.botonCarrito} onClick={addToCart}>Agregar al carrito</button>
            </div>
        </main>
    )

}

export default PersonalizarPastel