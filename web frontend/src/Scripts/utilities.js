const maxDataSize = 5;

export function formatDataArray(arr = [], newValue) {
    const thisArray = arr;

    if (thisArray.length >= maxDataSize) {
        thisArray.shift();
        thisArray.push(newValue);
    } else {
        thisArray.push(newValue);
    }

    return thisArray;
}
