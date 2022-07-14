import PropTypes from "prop-types";

export default function Value({ title, value }) {
    return (
        <div className="card value">
            <p className="numerical">{value}</p>
            <p className="small">
                <i>{title}</i>
            </p>
        </div>
    );
}

Value.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
};

Value.defaultProps = {
    title: "Valor Actual",
    value: 0,
};
