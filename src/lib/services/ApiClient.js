import axios from 'axios/index';
import {Subject} from 'rxjs/index';
import {filter} from 'rxjs/operators/index';

class ApiClient {
    constructor() {
        const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
        this.ACCESS_TOKKEN_KEY = process.env.REACT_APP_ACCESS_TOKKEN || '__access_token__';
        this.LANG_KEY = process.env.LANG_KEY || 'i18nextLng';
        let service = axios.create({
            baseURL: API_URL
        });
        this.defaultHeaders = {};
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        service.interceptors.request.use(this.onRequestSuccess);
        Object.assign(this, service);
        this.API_URL = API_URL;
        this.service = service;
        this.listener = new Subject();
    }

    pushDefaultHeader(key, value) {
        this.defaultHeaders[key] = value;
    }

    removeDefaultHeader(key) {
        delete this.defaultHeaders[key];
    }

    onRequestSuccess = config => {
        const token = this.getToken();
        const lan = this.getLan();
        if (token) {
            config.headers = {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
                ...config.headers,
                ...this.defaultHeaders
            };
            if (lan && !config.headers['Accept-Language']) {
                config.headers['Accept-Language'] = lan;
            }
        }
        config.timeout = process.env.REACT_APP_TIMEOUT || 1000000;
        config.url = `${this.API_URL.replace(/\/$/, '')}${config.url}`;
        return config;
    };

    onError(callback, statusCode) {
        this.listener.pipe(filter(
            error =>
                !statusCode || (error.response && error.response.status === statusCode))
        ).subscribe(callback);
    }

    handleSuccess(response) {
        return response;
    };

    handleError = (error) => {
        this.listener.next(error);
        return Promise.reject(
            {status: error.response && error.response.status, response: error.response || error})
    };

    uploadRequest(url, opts = {}, onProgress) {
        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (const k in opts.headers || {})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e => {
                let result = null;
                if (e.target && e.target.status === 200) {
                    const parseJSON = JSON.parse(e.target._response);
                    result = {
                        status: e.target.status,
                        ...parseJSON
                    };
                    res(result);
                } else
                    rej({
                        status: e.target.status,
                    })
            };
            xhr.onerror = rej;
            if (xhr.upload && onProgress)
                xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(opts.body);
        });
    }

    getToken() {
        return localStorage.getItem(this.ACCESS_TOKKEN_KEY) || sessionStorage.getItem(this.ACCESS_TOKKEN_KEY);
    }

    getLan() {
        const lang = localStorage.getItem(this.LANG_KEY) || sessionStorage.getItem(this.LANG_KEY);
        if (lang)
            return lang.split('-')[0]
    }

    setToken(token, remember = true) {
        return (remember ? localStorage : sessionStorage).setItem(this.ACCESS_TOKKEN_KEY, token);
    }
}

export default new ApiClient(); // making it singlenton
