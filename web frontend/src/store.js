import create from "zustand";
import { formatDataArray } from "./Scripts/utilities";

function format(str, to) {
    if (to === "int") {
        return parseInt(str.substring(1, str.length));
    } else {
        return parseFloat(str.substring(1, str.length));
    }
}

let getPh = (set) => ({
    value: [0],
    update: (value) =>
        set((state) => ({
            value: [...formatDataArray(state.value, format(value, ""))],
        })),
});

let getTemp = (set) => ({
    value: [0],
    update: (value) =>
        set((state) => ({
            value: [...formatDataArray(state.value, format(value, "int"))],
        })),
});

let getTu = (set) => ({
    value: [0],
    update: (value) =>
        set((state) => ({
            value: [...formatDataArray(state.value, format(value, "int"))],
        })),
});

export const usePh = create(getPh);
export const useTemperature = create(getTemp);
export const useTurbidity = create(getTu);
