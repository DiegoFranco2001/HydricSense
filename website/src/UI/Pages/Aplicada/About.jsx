import { Fragment } from "react";
import withLayout from "../../Components/HOC/withLayout";
import data from "../../../data.json";

const menu = JSON.parse(JSON.stringify(data));

function About() {
    return (
        <Fragment>
            <div className="w3-padding-16">
                <h1>
                    Diseño e implementación de un sistema electrónico e
                    informático para el análisis de la calidad del agua mediante
                    el uso de tecnologías web y de Arduino
                </h1>
                <section>
                    <p>
                        Nuestro proyecto consiste en una serie de sensores que
                        medirán las características básicas de las propiedades
                        del agua que se miden para saber si el agua es apta para
                        una labor específica, originalmente se tenía planeado
                        para ser usado en las lagunas o en sectores de
                        piscicultura, la cual requieren de análisis del agua
                        para saber si es apta para los seres vivos que la
                        habitan, pero con la situación actual no se pueden
                        realizar pruebas en ambientes externos a la universidad
                        o nuestros hogares.
                    </p>
                    <p>
                        Nuestro proyecto, además de medir las propiedades del
                        agua, es capaz de enviar información en tiempo real del
                        estado del agua al usuario, incluyendo así, un proceso
                        automático que evita costos y reduce tiempo al hacer
                        mediciones.
                    </p>
                </section>
            </div>
            <div className="w3-padding-16">
                <h2>Integrantes</h2>
                <section>
                    <ul className="w3-ul w3-border">
                        <li className="w3-hover-indigo">
                            Malison Franco Picado Solórzano
                        </li>
                        <li className="w3-light-gray w3-hover-blue">
                            Anthony Ángel Rodríguez Matamoros
                        </li>
                        <li className="w3-hover-blue">
                            Abiel Enrique Sequeira Robleto
                        </li>
                        <li className="w3-light-gray w3-hover-blue">
                            Pablo Josué Vásquez Guevara
                        </li>
                        <li className="w3-hover-blue">
                            Josaf Isaí Bustillo Cajina
                        </li>
                        <li className="w3-light-gray w3-hover-blue">
                            Rommel Antonio López Mercado
                        </li>
                    </ul>
                </section>
            </div>
            <div className="w3-padding-16">
                <h2>Maestro</h2>
                <section>
                    <p>
                        Este proyecto está asignado y siendo supervisado por el
                        maestro Ing. MsC. Saúl Otoniel Núñez Zeledón
                    </p>
                </section>
            </div>
            <div className="w3-padding-16">
                <h2>Grupo</h2>
                <section>
                    <p>
                        Somos estudiantes de la Carrera de Ingeniería
                        Electrónica, de la Facultad de Electrotecnica y
                        Computación, pertenecientes al grupo 3T1-EO
                    </p>
                </section>
            </div>
            <div className="w3-padding-16">
                <h2>Álma Máter</h2>
                <section>
                    <p>
                        Universidad Nacional de Inegeniería, Managua, Nicaragua
                    </p>
                </section>
            </div>
            <div className="w3-padding-16">
                <h2>Mediciones y Datos</h2>
                <section>
                    <p>
                        Para ver los datos de las propiedades del agua, por
                        favor enciende el dispositivo y asegúrate que esté
                        conectado a la red.
                    </p>
                </section>
            </div>
        </Fragment>
    );
}

export default withLayout(menu["menu-aplicada"])(About);
