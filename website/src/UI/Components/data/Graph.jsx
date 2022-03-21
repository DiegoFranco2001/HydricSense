import { Line } from "react-chartjs-2";
import PropTypes from "prop-types"

export default function Graph(properties) {
    const data = {
        labels: properties.values,
        datasets: [
            {
                label: properties.title,
                data: properties.values,
                fill: true,
                backgroundColor: properties.bgcolor,
                borderColor: properties.linecolor,
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

Graph.propTypes = {
    title: PropTypes.string,
    linecolor: PropTypes.string,
    bgcolor: PropTypes.string,
    values: PropTypes.array
}

Graph.defaultProps = {
    title: "Non Title",
    linecolor: "rgb(0, 0, 102)",
    bgcolor: "rgba(153, 179, 255, 0.6)",
    values: [1, 2, 3, 4, 10]
}
