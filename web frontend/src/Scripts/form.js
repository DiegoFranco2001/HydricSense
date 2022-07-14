export function isNotEmpty(array) {
    return array.length !== 0;
}

export function getObject(array, objectName) {
    for (let i = 0; i < array.length; i++) if (array[i].variable === objectName) return array[i][objectName];

    return {};
}

export function getVariable(array, position = 0) {
    const variable = array[position]["variable"];
    return variable;
}

export function wrapValue(value) {
    switch (value) {
        case "ph":
            return "pH - Acidez";
        case "temperature":
            return "Temperatura";
        case "turbidity":
            return "Turbidez";
        default:
            return "invalid";
    }
}

export function wrapVariableSelection(value) {
    if (value === "pH - Acidez") {
        return "ph";
    } else if (value === "Temperatura") {
        return "temperature";
    } else {
        return "turbidity";
    }
}

export const millisToMin = (millis) => millis / 60 / 1000;

export const minToMillis = (min) => min * 60 * 1000;
