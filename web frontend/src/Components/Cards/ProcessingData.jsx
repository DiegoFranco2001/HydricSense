import PropTypes from "prop-types";

export default function ProcessingData({ title, value }) {
    return (
        <div className="card processing">
            <p className="small">{value.toFixed(2)}% completado</p>
            <h4>{title}</h4>
        </div>
    );
}

ProcessingData.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
};

ProcessingData.defaultProps = {
    title: "Card Title",
    value: 0,
};
