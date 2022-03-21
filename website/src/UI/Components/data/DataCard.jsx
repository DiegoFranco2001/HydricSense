import PropTypes from "prop-types";

export default function DataCard(properties) {
    return (
        <div className="w3-third w3-padding-16">
            <div className="w3-card w3-center w3-container">
                <h3 className="w3-text-blue"> {properties.value} </h3>
                <p className="w3-wide"> {properties.title} </p>
            </div>
        </div>
    );
}

DataCard.propTypes = {
    value: PropTypes.number,
    title: PropTypes.string,
};

DataCard.defaultProps = {
    value: 0,
    title: "no especificado",
};
