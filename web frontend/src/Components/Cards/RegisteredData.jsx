import PropTypes from "prop-types";

export default function RegisteredData({ time, value }) {
    const allValues = (time !== undefined && value !== undefined);

    return (
        <div className={allValues ? "registered" : "registered-header"}>
            <p>{allValues ? time : "Dato"}</p>
            <p>{allValues ? value : "Valor"}</p>
        </div>
    );
}

RegisteredData.propTypes = {
    time: PropTypes.string,
    value: PropTypes.string
}