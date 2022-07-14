import Information from "../Components/Cards/Information";

export default function Home() {
    return (
        <main>
            <section>
                <h1>Nuestro Proyecto</h1>
                <p>
                    Este proyecto tiene como título principal: Diseño e
                    implementación de un sistema electrónico e informático para
                    el análisis de la calidad del agua mediante el uso de
                    tecnologías web y de arduino, para su uso en la apicultura.
                </p>
                <p>
                    Nuestro objetivo es diseñar un dispositivo electrónico que
                    sea capaz de medir e informar la temperatura, la acidez y el
                    nivel de turbidez de un estanque de piscicultura.
                </p>
                <p>
                    Específicamente, diseñar un sistema de análisis capaz de
                    medir la temperatura, acidez (pH) y turbidez del agua para
                    transmitir en tiempo real la información que el usuario
                    desea analizar, implementar un dispositivo que permita
                    realizar lis análisis de medición sobre el control de la
                    calidad del agua de manera remota, evaluar las acciones de
                    los sensores del proyecto en estados de agua purificada y
                    contaminada para comprobar que los resultados sean precisos
                    sobre la calidad del agua.
                </p>
                <p>Las variables de medición de nuestro proyecto son:</p>

                <Information
                    title="pH - Acidez"
                    description="Propiedad usada para el monitoreo de la acidez del agua."
                />
                <Information
                    title="Temperatura"
                    description="Propiedad usada para el monitoreo de la temperatura del agua."
                />
                <Information
                    title="Turbidez"
                    description="Propiedad usada para el monitoreo del grado de saturación de suciedad del agua."
                />
            </section>

            <section>
                <h2>Nuestro Grupo</h2>
                <p>
                    Somos estudiantes de la Universidad Nacional de Ingeniería,
                    pertenecientes a la facultad de electrotecnia y computación,
                    de la carrera de ingeniería electrónica y del grupo 4T1-EO.
                </p>
                <p>
                    Este proyecto lo integran, Picado Solórzano Malison Franco,
                    Rodríguez Matamoros Anthony Ángel, Sequeira Robleto Abiel
                    Enrique, Bustillo Cajina Josaf Isaí, Vásquez Guevara Pablo
                    Josué, Lopez Mercado Rommel Antonio.
                </p>
                <p>Bajo la evaluación del docente, Álvaro Antonio Gaitán.</p>
            </section>
        </main>
    );
}
