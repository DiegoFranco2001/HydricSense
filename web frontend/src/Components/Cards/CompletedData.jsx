import PropTypes from "prop-types";
import BtnLink from "../Buttons/BtnLink";

export default function CompletedData({ title, linkto, btnTxt }) {
    return (
        <div className="card completed">
            <h4>{title}</h4>
            <BtnLink content={btnTxt} linkto={linkto} />
        </div>
    );
}

CompletedData.propTypes = {
    title: PropTypes.string,
};

CompletedData.defaultProps = {
    title: "Card Title",
};
