import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
};

const width = {
    width: "33.33%",
};

export default function Menu(properties) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="w3-bar w3-card w3-black w3-center w3-hide-medium w3-hide-large">
                <span className="w3-bar-item w3-left">HydricSense</span>
                <span
                    className="w3-bar-item w3-right w3-button w3-hover-blue"
                    style={style}
                    onClick={() => setOpen(!open)}
                >
                    <i className="material-icons">{open ? "close" : "menu"}</i>
                </span>
            </div>
            <nav
                className={`w3-bar w3-card w3-black w3-center ${
                    !open ? "w3-hide-small" : ""
                }`}
            >
                {properties.links.map((element) => (
                    <NavLink
                        to={element.link}
                        className={
                            "w3-bar-item w3-button w3-hover-blue w3-mobile w3-" +
                            element.align
                        }
                        key={Math.random() * 100}
                        style={width}
                        onClick={() => setOpen(false)}
                    >
                        <span style={style}>
                            <i className="material-icons w3-margin-right">
                                {element.icon}
                            </i>
                            {element.title}
                        </span>
                    </NavLink>
                ))}
            </nav>
        </>
    );
}

Menu.propTypes = {
    links: PropTypes.array,
};

Menu.defaultProps = {
    links: [{ title: "Home", link: "/" }],
};
