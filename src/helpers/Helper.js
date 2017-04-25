export function convertObjectToArray(data) {
    if (!data) {
        return [];
    }

    return Object.keys(data).map(function (k) {
        return data[k]
    });
}

export function wrapText(text) {
    return text.length > 300 ? text.substring(0, 300) + "..." : text;
}
