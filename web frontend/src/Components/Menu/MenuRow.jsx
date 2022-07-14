import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IconHome } from "../../Icons";

export default function MenuRow({ text, icon, linkto, clickFunction }) {
    return (
        <li className="menu-row" onClick={() => clickFunction()}>
            <Link to={linkto}>
                <span>{icon}</span>
                <span>{text}</span>
            </Link>
        </li>
    );
}

MenuRow.propTypes = {
    text: PropTypes.string,
    linkto: PropTypes.string,
    icon: PropTypes.any,
};

MenuRow.defaultProps = {
    text: "Home",
    linkto: "/",
    icon: <IconHome />,
};
