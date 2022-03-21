import { Fragment } from "react";
import DataCard from "../../Components/data/DataCard";
import GeneralGraph from "../../Components/data/GeneralGraph";
import Graph from "../../Components/data/Graph";
import withLayout from "../../Components/HOC/withLayout";
import data from "../../../data.json";
import { useValue } from "../../../store";

function strConverter(str) {
    let inputData = [0, 0, 0];

    str.split(",").forEach(function (element, index) {
        inputData[index] = parseFloat(element);
    });

    return inputData;
}

function arrayConverter(str1, str2, str3) {
    return [strConverter(str1), strConverter(str2), strConverter(str3)];
}

const menu = JSON.parse(JSON.stringify(data));
const values = [
    {
        title: "Nivel de Acidez (pH)",
        linecolor: "rgb(0, 0, 102)",
        bgcolor: "rgba(153, 179, 255, 0.6)",
    },
    {
        title: "Temperatura del Agua (°C)",
        linecolor: "rgb(102, 0, 102)",
        bgcolor: "rgba(255, 153, 255, 0.6)",
    },
    {
        title: "Nivel de Turbidez",
        linecolor: "rgb(0, 153, 0)",
        bgcolor: "rgba(153, 255, 153, 0.6)",
    },
];

function Graphics() {
    const getvalue = useValue((state) => state.value);
    const val = getvalue.split(":");

    return (
        <Fragment>
            <div className="w3-padding-24">
                <h1> Mediciones </h1>
                <section className="w3-row-padding">
                    <DataCard
                        value={val[0].split(",")[2]}
                        title="pH"
                    ></DataCard>
                    <DataCard
                        value={val[1].split(",")[2]}
                        title="Temperatura"
                    ></DataCard>
                    <DataCard
                        value={val[2].split(",")[2]}
                        title="Turbidez"
                    ></DataCard>
                </section>
            </div>
            <div className="w3-padding-24">
                <h2> Gráfica General</h2>
                <section>
                    <GeneralGraph
                        data={values}
                        values={arrayConverter(val[0], val[1], val[2])}
                    ></GeneralGraph>
                </section>
            </div>
            <div className="w3-padding-24">
                <h2> Gráfica del pH </h2>
                <section>
                    <Graph
                        title={values[0].title}
                        bgcolor={values[0].bgcolor}
                        linecolor={values[0].linecolor}
                        values={strConverter(val[0])}
                    ></Graph>
                </section>
            </div>
            <div className="w3-padding-24">
                <h2> Gráfica de la Temperatura </h2>
                <section>
                    <Graph
                        title={values[1].title}
                        bgcolor={values[1].bgcolor}
                        linecolor={values[1].linecolor}
                        values={strConverter(val[1])}
                    ></Graph>
                </section>
            </div>
            <div className="w3-padding-24">
                <h2> Gráfica de la Turbidez</h2>
                <section>
                    <Graph
                        title={values[2].title}
                        bgcolor={values[2].bgcolor}
                        linecolor={values[2].linecolor}
                        values={strConverter(val[2])}
                    ></Graph>
                </section>
            </div>
        </Fragment>
    );
}

export default withLayout(menu["menu-aplicada"])(Graphics);
