import PropTypes from "prop-types";

export default function GroupSeparator({ title }) {
    return <p className="group-separator"> {title} </p>;
}

GroupSeparator.propTypes = { title: PropTypes.string };

GroupSeparator.defaultProps = { title: "Nuevo grupo" };
