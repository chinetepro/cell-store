import { createContext } from 'react';

export const CarContext = createContext({
    items: [],
    itemsConfig: [],
    addItem: () => { },
    setItemConfig: () => { },
    removeItem: () => { },
    inCar: () => { },
});