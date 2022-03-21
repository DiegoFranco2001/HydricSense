import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const paddingStyle = {
    padding: "0px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

function converter(text) {
    return parseInt(text);
}

function TypeButton(properties) {
    const available = converter(properties.percentage) === 100;

    return available ? (
        <Link
            to={properties.link}
            className="w3-button w3-blue w3-hover-indigo"
        >
            <a> Explorar Datos </a>
        </Link>
    ) : (
        <p
            className="w3-button w3-red w3-hover-purple w3-disabled"
            title="La tabla aún no tiene la cantidad de datos necesario para mostrar"
        >
            Explorar Datos
        </p>
    );
}

export default function DataRow(properties) {
    return (
        <div className="w3-border w3-margin-top">
            <div style={paddingStyle}>
                <p> {properties.name} </p>
                <p className="w3-center">{properties.percentage}%</p>
                <TypeButton
                    percentage={properties.percentage}
                    link={properties.link}
                />
            </div>
        </div>
    );
}

DataRow.propTypes = {
    percentage: PropTypes.string,
    name: PropTypes.string,
    link: PropTypes.string,
};
