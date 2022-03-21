import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

export default function GeneralGraph(properties) {
    const data = {
        labels: ["3", "2", "1"],
        datasets: [
            {
                label: properties.data[0].title,
                data: properties.values[0],
                fill: false,
                backgroundColor: properties.data[0].bgcolor,
                borderColor: properties.data[0].linecolor,
            },
            {
                label: properties.data[1].title,
                data: properties.values[1],
                fill: false,
                backgroundColor: properties.data[1].bgcolor,
                borderColor: properties.data[1].linecolor,
            },
            {
                label: properties.data[2].title,
                data: properties.values[2],
                fill: false,
                backgroundColor: properties.data[2].bgcolor,
                borderColor: properties.data[2].linecolor,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    return <Line data={data} options={options} />;
}

GeneralGraph.propTypes = {
    data: PropTypes.array,
    values: PropTypes.array,
};

GeneralGraph.defaultProps = {
    data: [
        {
            title: "Non Title",
            linecolor: "rgb(0, 0, 102)",
            bgcolor: "rgba(153, 179, 255, 0.6)",
        },
        {
            title: "Non Title",
            linecolor: "rgb(0, 0, 102)",
            bgcolor: "rgba(153, 179, 255, 0.6)",
        },
        {
            title: "Non Title",
            linecolor: "rgb(0, 0, 102)",
            bgcolor: "rgba(153, 179, 255, 0.6)",
        },
    ],
    values: [
        [0, 1, 2],
        [6, 8, 10],
        [20, 30, 40],
    ],
};
