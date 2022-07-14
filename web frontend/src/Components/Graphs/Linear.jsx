import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

function LinearChart({ data }) {
    return <Line data={data} options={options} />;
}

LinearChart.propTypes = {
    data: PropTypes.object,
};

export default LinearChart;
