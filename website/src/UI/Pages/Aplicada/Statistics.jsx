import { Fragment } from "react";
import FromCreateData from "../../Components/others/FormCreateData";
import withLayout from "../../Components/HOC/withLayout";
import data from "../../../data.json";
import DataRow from "../../Components/others/DataRow";
import { useTable } from "../../../store";

const menu = JSON.parse(JSON.stringify(data));
const headerStyle = {
    padding: "0px 24px",
};
const proportionStyle = {
    width: "33.33%",
};

function Header() {
    return (
        <div className="w3-bar w3-blue" style={headerStyle}>
            <p className="w3-item-bar w3-left" style={proportionStyle}>
                <b>Tabla</b>
            </p>
            <p
                className="w3-item-bar w3-left w3-center"
                style={proportionStyle}
            >
                <b>Progreso</b>
            </p>
        </div>
    );
}

function Statistics() {
    const table = useTable((state) => state.value);
    return (
        <Fragment>
            <div className="w3-padding-24">
                <FromCreateData></FromCreateData>
            </div>
            <div className="w3-padding-24">
                <h2>Datos Recolectados</h2>
                <br />
                <Header />
                <br />
                {table.map(function (item, index) {
                    return (
                        <DataRow
                            name={item[0]}
                            link="#"
                            percentage={item[1]}
                            key={index}
                        />
                    );
                })}
            </div>
        </Fragment>
    );
}

export default withLayout(menu["menu-aplicada"])(Statistics);
