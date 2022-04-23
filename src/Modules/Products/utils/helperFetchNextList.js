import isFunction from 'lodash/isFunction';

export default async (service, fn, defaultParams = {}, disable) => {   
        try {
            if (disable) {
                throw  new Error('disable');
            }
            const res = await (service.getAllPost([defaultParams]));   
             
            if(isFunction(fn)){
                return fn(res?.data)
            }

            return res?.data[0]
        } catch (e) {
            return {};
        }
};

