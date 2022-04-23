import React, {useState, useEffect} from 'react';
import _isNil from "lodash/isNil";
import _get from "lodash/get";
import _find from "lodash/find";
import {useTranslation} from "react-i18next";
import { MODULES } from '../../../lib/Config/configRaindrop';
import { watcher } from '../../../lib/raindrop';
import { errorToast } from '../../../utils/toast';

const CUSTOM_CODE_ERROR_BY_PATH = [];


export const mapTextError = (type, t) => {
    switch (type) {
        case 400:
        case 401:
        case 403:
        case 404:
        case 503:
        case 500:
            return t(`network_error.${type}`);            
        default:
            return t('network_error.offline');
    }
};

export const mapReqError = (e) => {
    const url = _get(e, 'response.config.url');
    let status = e.status || 404;
    if (url) {
        const val = _find(CUSTOM_CODE_ERROR_BY_PATH, ({regex}) => {
            return new RegExp(regex).test(url);
        });   
       if (val) {
            status = val.codeError[status]
       }
    }
    if(!window.navigator.onLine){
        status = 'OFFLINE'
    }
    return status
};

export default () => {
    const [networkType, setNetworkType] = useState();
    const {t} = useTranslation();

    useEffect(() => {
        if (!_isNil(networkType)) {
            setTimeout(() => {
                setNetworkType()
            }, 5500)
        }
    }, [networkType]);

    watcher(MODULES.NETWORK_MODULE, (e) => {
        const networkError = mapReqError(e);
        const textError = mapTextError(networkError, t);
        errorToast(textError);    
        if((e?.status === 403 || e?.status === 401 )){
            setTimeout(() => {window.localStorage.clear();
            window.sessionStorage.clear()}, 2000)
        };    
    });

    return <></>
}