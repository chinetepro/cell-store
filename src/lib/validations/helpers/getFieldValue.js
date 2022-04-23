
const getFieldValue = (data, field) => {
    try {
        const path = field.split('.');
        let res = data;
        for (let i = 0; i < path.length; i++) res = res[path[i]];
        return res;
    }catch (e) {
        return undefined;
    }

};



export default getFieldValue;
