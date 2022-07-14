import PropTypes from "prop-types";

export default function Information({ title, description }) {
    return (
        <div className="card information">
            <p>{title}</p>
            <p className="small">{description}</p>
        </div>
    );
}

Information.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

Information.defaultProps = {
    title: "Card Title",
    description: "Card brief description",
};
