const x_axis_labels = ["5", "4", "3", "2", "1"];
const colors = ["#0E0E52", "#0D41E1", "#07C8F9"];

export const ph = (dataValues) => {
    return {
        labels: x_axis_labels,
        datasets: [
            {
                label: "pH - Acidez",
                data: dataValues,
                fill: false,
                backgroundColor: colors[0],
                borderColor: colors[0],
            },
        ],
    };
};

function xAxisArr(arr) {
    const newArray = [];
    for (let i = 1; i < arr.length + 1; i++) {
        newArray.push(i);
    }
    return newArray;
}

export const statistics = (dataArray) => {
    return {
        labels: xAxisArr(dataArray),
        fill: true,
        datasets: [
            {
                label: "Valor Medido",
                data: dataArray,
                backgroundColor: "#000066",
                borderColor: "#0D41E1",
            },
        ],
    };
};

export const temp = (dataValues) => {
    return {
        labels: x_axis_labels,
        datasets: [
            {
                label: "Temperatura",
                data: dataValues,
                fill: false,
                backgroundColor: colors[1],
                borderColor: colors[1],
            },
        ],
    };
};

export const turb = (dataValues, divider = 1) => {
    return {
        labels: x_axis_labels,
        datasets: [
            {
                label: "Turbidez",
                data: dataValues.map((value) => value / divider),
                fill: false,
                backgroundColor: colors[2],
                borderColor: colors[2],
            },
        ],
    };
};

export const all = (_ph, _te, _tu) => {
    return {
        labels: x_axis_labels,
        datasets: [ph(_ph).datasets[0], temp(_te).datasets[0], turb(_tu, 100).datasets[0]],
    };
};
