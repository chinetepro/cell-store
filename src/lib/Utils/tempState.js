import ls from 'localstorage-ttl';
import size from 'lodash/size';
import head from 'lodash/head';

const TIME = (process.env.REACT_APP_BACKEND_URL || 60) * 60 * 1000;

export default (module) => {
    
    const key = `temp-${module}`;
    
    return function () {
        switch (size(arguments)) {
            case 1:
                ls.set(key, head(arguments), TIME);
                return undefined;
            case 0:
                return ls.get(key);
            default:
                ls.set(key, arguments, TIME);
                return undefined;
        }
    };
};
