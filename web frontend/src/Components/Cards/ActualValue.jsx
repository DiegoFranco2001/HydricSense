import PropTypes from "prop-types";

export default function ActualValue({ title, value }) {
    return (
        <div className="card actual-value">
            <p>
                <b>{title}</b>
            </p>
            <p className="numerical">{value}</p>
        </div>
    );
}

ActualValue.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
};

ActualValue.defaultProps = {
    title: "Valor Actual",
    value: 0,
};
