import React from "react";
import styles from "../styles/verPedidos.module.css"
export default function VerPedidos(){
    return (
        <main>
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
                        <tr>
                            <td>23/05/2024</td>
                            <td>Juan Carlos García</td>
                            <td>9500000000</td>
                            <td>Salón de fiesta 1</td>
                            <td>Pequeño</td>
                            <td>Imagen de tal personaje</td>
                            <td>04/06/2024 17:00</td>
                            <td>Juan Carlos García</td>
                            <td>Ninguna</td>
                            <td>$$$$</td>
                            <td>Aceptado</td>
                        </tr>
                        <tr>
                        <td>23/05/2024</td>
                            <td>Juan Carlos García</td>
                            <td>9500000000</td>
                            <td>Salón de fiesta 1</td>
                            <td>Pequeño</td>
                            <td>Imagen de tal personaje</td>
                            <td>04/06/2024 17:00</td>
                            <td>Juan Carlos García</td>
                            <td>Ninguna</td>
                            <td>$$$$</td>
                            <td>Aceptado</td>
                        </tr>
                        <tr>
                        <td>23/05/2024</td>
                            <td>Juan Carlos García</td>
                            <td>9500000000</td>
                            <td>Salón de fiesta 1</td>
                            <td>Pequeño</td>
                            <td>Imagen de tal personaje</td>
                            <td>04/06/2024 17:00</td>
                            <td>Juan Carlos García</td>
                            <td>Ninguna</td>
                            <td>$$$$</td>
                            <td>Aceptado</td>
                        </tr>
                        <tr>
                        <td>23/05/2024</td>
                            <td>Juan Carlos García</td>
                            <td>9500000000</td>
                            <td>Salón de fiesta 1</td>
                            <td>Pequeño</td>
                            <td>Imagen de tal personaje</td>
                            <td>04/06/2024 17:00</td>
                            <td>Juan Carlos García</td>
                            <td>Ninguna</td>
                            <td>$$$$</td>
                            <td>Aceptado</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}