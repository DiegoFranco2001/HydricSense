import create from "zustand";

let getValue = (set) => ({
    value: "0:0:0",
    update: (dbvalue) =>
        set(() => ({
            value: dbvalue,
        })),
});

let tables = (set) => ({
    value: [],
    add: (valueArray) =>
        set((state) => ({
            value: [...state.value, valueArray],
        })),
});

export const useValue = create(getValue);
export const useTable = create(tables);
