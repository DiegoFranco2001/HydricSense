import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const style = {
    zIndex: "10000",
};

export default function Success({ msg }) {
    const [state, setState] = useState(true);

    function handleClick() {
        setState(!state);
    }

    return (
        <div className={`dialog-panel ${state ? "" : "hide"}`} style={style}>
            <div className="dialog">
                <p> {msg} </p>
                <Link to={"/vista"} className="button" onClick={() => handleClick()}>
                    OK!
                </Link>
            </div>
        </div>
    );
}

Success.propTypes = {
    msg: PropTypes.string,
    initState: PropTypes.bool,
};

Success.defaultProps = {
    initState: false,
};
