import { Link } from "react-router-dom";
import { IconArrow } from "../../Icons";
import PropTypes from "prop-types";

export default function BtnLink({ content, linkto }) {
    return (
        <Link to={linkto} className="button-link">
            <span>{content}</span>
            <IconArrow />
        </Link>
    );
}

BtnLink.propTypes = {
    linkto: PropTypes.string,
    content: PropTypes.string,
};

BtnLink.defaultProps = {
    linkto: "/",
    content: "home",
};
