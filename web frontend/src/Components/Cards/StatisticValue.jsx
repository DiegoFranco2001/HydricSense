import PropTypes from "prop-types";

export default function StatisticValue({ title, value }) {
    return (
        <div className="statistic">
            <p className="small">{title}</p>
            <p>
                <b>{value}</b>
            </p>
        </div>
    );
}

StatisticValue.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
};

StatisticValue.defaultProps = {
    title: "Valor Actual",
    value: 0,
};
