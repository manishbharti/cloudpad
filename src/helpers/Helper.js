export function convertObjectToArray(data) {
    return Object.keys(data).map(function (k) {
        return data[k]
    });
}

export function wrapText(text) {
    return text.length > 300 ? text.substring(0, 300) + "..." : text;
}
