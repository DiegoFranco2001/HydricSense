import React from "react";
import axios from "axios";
import BtnLink from "../Components/Buttons/BtnLink";
import {
    getObject,
    getVariable,
    isNotEmpty,
    millisToMin,
    minToMillis,
    wrapValue,
    wrapVariableSelection,
} from "../Scripts/form";
import Success from "../Templates/Success";
import { availables, postNew } from "../urls";

export default class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            variable: "None",
            label: "",
            interval: 0,
            quantity: 0,
            variableName: "",
            postSuccess: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleVariableChange = this.handleVariableChange.bind(this);
        this.handleLabelChange = this.handleLabelChange.bind(this);
    }

    componentDidMount() {
        axios
            .get(availables())
            .then((res) => {
                if (isNotEmpty(res.data)) {
                    const variable = getObject(res.data, getVariable(res.data));

                    this.setState({
                        response: res.data,
                        variable: variable,
                        interval: millisToMin(variable["min-range"]),
                        quantity: variable["min-data"],
                        variableName: res.data[0].variable,
                    });
                } else {
                    this.setState({
                        response: res.data,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .post(postNew(this.state.variableName), {
                interval: minToMillis(this.state.interval),
                quantity: this.state.quantity,
                label: this.state.label,
            })
            .then((response) => {
                this.setState({ postSuccess: response.data.success });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleIntervalChange(event) {
        event.preventDefault();
        this.setState({ interval: event.target.value });
    }

    handleLabelChange(event) {
        event.preventDefault();
        this.setState({ label: event.target.value });
    }

    handleQuantityChange(event) {
        event.preventDefault();
        this.setState({ quantity: event.target.value });
    }

    handleVariableChange(event) {
        event.preventDefault();
        this.setState({
            variable: getObject(this.state.response, event.target.value),
            interval: millisToMin(this.state.variable["min-range"]),
            quantity: this.state.variable["min-data"],
            variableName: wrapVariableSelection(event.target.value),
        });
    }

    render() {
        const response = this.state.response;
        return response !== null ? (
            isNotEmpty(response) ? (
                <>
                    {this.state.postSuccess ? (
                        <Success msg={"Se ha iniciado existosamente un nuevo proceso de recolección"} />
                    ) : null}

                    <main>
                        <h1>Nueva Recolección de Datos</h1>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="input">
                                <label>Nombre de la colección:</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Testing"
                                    className="input-box"
                                    required
                                    onChange={(event) => this.handleLabelChange(event)}
                                    value={this.state.label}
                                />
                            </div>
                            <div className="input">
                                <label>Selecciona una de las variables:</label>
                                <select onChange={(event) => this.handleVariableChange(event)} required>
                                    {response.map((value) => (
                                        <option value={value.variable} key={value.variable}>
                                            {wrapValue(value.variable)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input">
                                <label>Intérvalo entre datos (minutos):</label>
                                <input
                                    type="number"
                                    min={millisToMin(this.state.variable["min-range"])}
                                    max={millisToMin(this.state.variable["max-range"])}
                                    value={this.state.interval}
                                    className="input-box"
                                    required
                                    onChange={(event) => this.handleIntervalChange(event)}
                                />
                            </div>
                            <div className="input">
                                <label>Cantidad de datos a obtener:</label>
                                <input
                                    type="number"
                                    min={this.state.variable["min-data"]}
                                    max={this.state.variable["max-data"]}
                                    value={this.state.quantity}
                                    className="input-box"
                                    required
                                    onChange={(event) => this.handleQuantityChange(event)}
                                />
                            </div>
                            <input type="submit" value="Iniciar Recolección de Datos" className="button" />
                            <BtnLink content="Cancelar" linkto="/vista" />
                        </form>
                    </main>
                </>
            ) : (
                <main>
                    <h4>
                        No puedes iniciar una nueva collección a menos que terminen todas las colecciones en procesos o elimines
                        una collección (ph, temperatura o turbidez)
                    </h4>
                </main>
            )
        ) : (
            <main>Cargando...</main>
        );
    }
}
