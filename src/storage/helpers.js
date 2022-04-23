export const getViewFromStorage = (STORAGE_KEY) => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
        return null;
    }
};

export const setViewFromStorage = (STORAGE_KEY, value) => {
    try {
        return localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
        //ignore
    }
};