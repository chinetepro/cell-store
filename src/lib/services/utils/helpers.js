export const getViewFromStorage = (STORAGE_KEY, defaultValue) => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultValue;
    } catch (e) {
        return defaultValue;
    }
};

export const setViewFromStorage = (STORAGE_KEY, value) => {
    try {
        return localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
        //ignore
    }


};

const clean = (text) => text.toLowerCase().trim().replace(/-|(\.)|_|(\*)|(&)|(\[)|(\])|(\{)|(\}|`|"|(\\))/g, '');

export const searchByText = (text, criteria) => {
    if (!criteria) return true;
    if (!text) return false;
    const textToFind = clean(text);
    const criteriaToFind = clean(criteria);
    if (!criteriaToFind) return true;
    if (!textToFind) return false;
    return textToFind.indexOf(criteriaToFind) !== -1;
};