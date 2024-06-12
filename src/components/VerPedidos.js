import React, { useState, useEffect } from "react";
import styles from "../styles/verPedidos.module.css";
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function VerPedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log("User Data: ", userData);
                        if (userData.pedido) {
                            setPedidos(userData.pedido);
                        } else {
                            console.error("No se encontraron pedidos para este usuario.");
                        }
                    } else {
                        console.error("El documento del usuario no existe.");
                    }
                } catch (error) {
                    console.error("Error al obtener los pedidos: ", error);
                }
            } else {
                console.error("No hay usuario autenticado.");
            }
        };

        fetchPedidos();
    }, []);

    return (
        <div className={styles.VerPedidos}>
            <table>
                <caption>Pedidos</caption>
                <thead>
                    <tr>
                        <th>Fecha de orden</th>
                        <th>Cliente</th>
                        <th>Número de contacto</th>
                        <th>Dirección de contacto</th>
                        <th>Tamaño de pastel</th>
                        <th>Solicitudes especiales</th>
                        <th>Fecha y hora de entrega</th>
                        <th>Recepcionista</th>
                        <th>Observación</th>
                        <th>Precio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido, index) => (
                        <tr key={index}>
                            <td>{pedido.fecha}</td>
                            <td>{pedido.cliente}</td>
                            <td>{pedido.contacto}</td>
                            <td>{pedido.direccion}</td>
                            <td>{pedido.tamanio}</td>
                            <td>{pedido.tipo_pastelz}</td>
                            <td>{pedido.fecha_entrega}</td>
                            <td>{pedido.recepcionista}</td>
                            <td>{pedido.observacion}</td>
                            <td>{pedido.precio}</td>
                            <td>{pedido.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
