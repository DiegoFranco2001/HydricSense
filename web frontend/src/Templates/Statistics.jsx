import Button from "../Components/Buttons/Button";
import CompletedData from "../Components/Cards/CompletedData";
import ProcessingData from "../Components/Cards/ProcessingData";
import { IconAdd } from "../Icons";
import PropTypes from "prop-types";
import axios from "axios";
import React from "react";
import { allCollected, inProcess } from "../urls";

const Msg = ({ msg }) => <p>{msg}</p>;
const Processing = ({ label, percentage }) => (
    <>
        <p>Actualmente Recolectando:</p>
        <ProcessingData title={label} value={percentage} />
    </>
);
const Collected = ({ array }) => (
    <>
        <p style={{ marginTop: "20px" }}>Datos Recolectados:</p>
        {array.map((data) => (
            <CompletedData title={data.label} linkto={data.id + ""} btnTxt="Ver Datos" key={data.id} />
        ))}
    </>
);

export default class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: null,
            collected: null,
        };
    }

    componentDidMount() {
        axios.all([axios.get(allCollected(this.props.variable)), axios.get(inProcess(this.props.variable))]).then(
            axios.spread((collected, processing) => {
                this.setState({
                    processing: processing.data,
                    collected: collected.data,
                });
            })
        );
    }

    render() {
        const state = this.state;

        function VerifyInProcessData() {
            if (state.processing !== null) {
                return !state.processing.running ? (
                    <Msg msg="No hay un proceso de recolección de datos actualmente!" />
                ) : (
                    <Processing label={state.processing.label} percentage={state.processing.percentage} />
                );
            }

            return <Msg msg="Cargando..." />;
        }

        function VerifyCollectedData() {
            if (state.collected !== null) {
                return state.collected.length === 0 ? (
                    <Msg msg="No hay datos recolectados!" />
                ) : (
                    <Collected array={state.collected} />
                );
            }

            return <Msg msg="Cargando..." />;
        }

        return (
            <section>
                <h2>Estadísticas</h2>
                <VerifyInProcessData />
                <VerifyCollectedData />
                <div
                    style={{
                        marginTop: "28px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button icon={<IconAdd />} txt="Nueva Recolección" linkTo="/recoleccion" />
                </div>
            </section>
        );
    }
}

Statistics.propTypes = {
    variable: PropTypes.string,
};
