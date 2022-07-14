import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { mean, median, mode, standardDeviation, variance } from "simple-statistics";
import { statistics } from "../chartStyles";
import RegisteredData from "../Components/Cards/RegisteredData";
import StatisticValue from "../Components/Cards/StatisticValue";
import LinearChart from "../Components/Graphs/Linear";
import { millisToMin } from "../Scripts/form";
import Success from "../Templates/Success";
import { deleteCollection, idCollected } from "../urls";

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null, delSuccess: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(idCollected(this.props.variable, this.props.id))
            .then((res) => {
                this.setState({ data: res.data });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .delete(deleteCollection(this.props.variable, this.props.id))
            .then((response) => {
                this.setState({ delSuccess: response.data.success });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const data = this.state.data;

        function round(value) {
            return parseFloat(value.toFixed(2));
        }

        return data ? (
            <>
                {this.state.delSuccess ? <Success msg="La colección de datos ha sido eliminada exitosamente!" /> : null}
                <main>
                    <h1>{data.label}</h1>
                    <section>
                        <p>Medidas de tendencia central</p>
                        <div className="statistic-cards">
                            <StatisticValue title={"Media"} value={round(mean(data.data))} />
                            <StatisticValue title={"Mediana"} value={round(median(data.data))} />
                            <StatisticValue title={"Moda"} value={round(mode(data.data))} />
                        </div>
                    </section>
                    <section>
                        <p>Medidas de Dispersión</p>
                        <div className="statistic-cards">
                            <StatisticValue title={"Varianza"} value={round(variance(data.data))} />
                            <StatisticValue title={"Desviación Estándar"} value={round(standardDeviation(data.data))} />
                        </div>
                    </section>
                    <section>
                        <h4>Información General</h4>
                        <RegisteredData />
                        <RegisteredData
                            value={round(millisToMin(data["interval-data"])) + " minutos"}
                            time={"Intérvalo entre datos"}
                        />
                        <RegisteredData value={data.label} time={"Título de la colección"} />
                        <RegisteredData value={data.id + ""} time={"ID de colección"} />
                        <RegisteredData value={data["quantity-data"] + ""} time={"Cantidad de Datos"} />
                    </section>
                    <section>
                        <h4>Datos</h4>
                        <LinearChart data={statistics(data.data)} />
                    </section>
                    <section>
                        <h4>Eliminar</h4>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="input">
                                <label>Desea Eliminar este registro?</label>
                                <input type="submit" value="Eliminar Este Registro" className="button" />
                            </div>
                        </form>
                    </section>
                </main>
            </>
        ) : (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }
}

export default function DataSet({ variable }) {
    const params = useParams();
    return <Body id={params.id} variable={variable} />;
}
