import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button({ icon, txt, linkTo }) {
    return (
        <Link to={linkTo} className="button">
            {icon}
            <span>{txt}</span>
        </Link>
    );
}

Button.propTypes = {
    icon: PropTypes.any,
    txt: PropTypes.string,
    linkTo: PropTypes.string,
};

Button.defaultProps = {
    icon: null,
    txt: "Click Me",
    linkTo: "#",
};
