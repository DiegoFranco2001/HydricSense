import { Fragment } from "react";
import { useTable } from "../../../store";

function onClicking(event, add, name) {
    event.preventDefault();
    add([name, "0"]);
}

export default function FromCreateData() {
    const addData = useTable((state) => state.add);
    return (
        <Fragment>
            <h2 className="w3-padding w3-blue">Crear Tabla de Datos</h2>
            <form
                className="w3-container w3-border"
                onSubmit={(event) =>
                    onClicking(
                        event,
                        addData,
                        document.getElementById("name").value
                    )
                }
            >
                <div className="w3-padding">
                    <label>
                        <b>Nombre de la tabla:</b>
                    </label>
                    <p>Ingresa el nombre identificador de la tabla de datos</p>
                    <input
                        className="w3-input w3-border"
                        type="text"
                        id="name"
                        required
                    />
                </div>
                <div className="w3-padding">
                    <label>
                        <b>Cantidad de datos:</b>
                    </label>
                    <p>Selecciona la cantidad de muestras para la tabla</p>
                    <input
                        className="w3-input w3-border"
                        type="number"
                        required
                    />
                </div>
                <div className="w3-padding">
                    <label>
                        <b>Intervalo de tiempo:</b>
                    </label>
                    <p>
                        Selecciona el intervalo de tiempo para cada dato
                        estadístico
                    </p>
                    <div className="w3-row-padding">
                        <div className="w3-half">
                            <input
                                className="w3-input w3-border w3-margin-bottom"
                                type="number"
                                required
                            />
                        </div>
                        <div className="w3-half">
                            <select className="w3-input w3-border" required>
                                <option>Minutos</option>
                                <option>Horas</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w3-padding">
                    <label>
                        <b>Tipo de dato:</b>
                    </label>
                    <p>
                        Selecciona qué variable estadística quieres determinar
                    </p>
                    <select className="w3-input w3-border" required>
                        <option>Nivel de Acidez (pH)</option>
                        <option>Temperatura</option>
                        <option>Nivel de Turbidez</option>
                    </select>
                </div>
                <div className="w3-padding w3-center">
                    <input
                        className="w3-button w3-hover-indigo w3-blue"
                        type="submit"
                        value="Crear Nueva Tabla"
                    />
                </div>
            </form>
        </Fragment>
    );
}
