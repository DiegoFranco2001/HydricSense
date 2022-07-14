const phDb = require("../database/ph");
const tempDb = require("../database/temperature");
const turbDb = require("../database/turbidity");

function isAvailable(variable) {
    switch (variable) {
        case "PH":
            return (
                phDb.general["remaining-collections"] !== 0 &&
                !phDb["running-process"].collecting
            );
        case "TEMPERATURE":
            return (
                tempDb.general["remaining-collections"] !== 0 &&
                !tempDb["running-process"].collecting
            );
        case "TURBIDITY":
            return (
                turbDb.general["remaining-collections"] !== 0 &&
                !turbDb["running-process"].collecting
            );
        default:
            return false;
    }
}

function getMinMax(variable, varName) {
    return {
        variable: varName,
        [varName]: {
            "max-data": variable.general["max-data"],
            "min-data": variable.general["min-data"],
            "max-range": variable.general["max-range"],
            "min-range": variable.general["min-range"],
        },
    };
}

module.exports = {
    available: function () {
        let vars = [];

        if (isAvailable("PH")) vars.push(getMinMax(phDb, "ph"));

        if (isAvailable("TEMPERATURE"))
            vars.push(getMinMax(tempDb, "temperature"));

        if (isAvailable("TURBIDITY")) vars.push(getMinMax(turbDb, "turbidity"));

        return vars;
    },
    inprocess: function (variable) {
        switch (variable) {
            case "PH":
                return {
                    running: phDb["running-process"].collecting,
                    percentage: phDb["running-process"].percentage,
                    label: phDb["running-process"].label,
                };
            case "TEMPERATURE":
                return {
                    running: tempDb["running-process"].collecting,
                    percentage: tempDb["running-process"].percentage,
                    label: tempDb["running-process"].label,
                };
            case "TURBIDITY":
                return {
                    running: turbDb["running-process"].collecting,
                    percentage: turbDb["running-process"].percentage,
                    label: turbDb["running-process"].label,
                };
            default:
                return [];
        }
    },
    collected: function (variable) {
        switch (variable) {
            case "PH":
                return phDb["collection-done"];
            case "TEMPERATURE":
                return tempDb["collection-done"];
            case "TURBIDITY":
                return turbDb["collection-done"];
            default:
                return [];
        }
    },
};
