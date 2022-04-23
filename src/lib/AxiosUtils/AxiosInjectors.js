export const injectInterceptors = (instance, type, success, reject) => {
  instance && instance.interceptors[type].use(success, reject);
  return instance;
};

export const injectInterceptorsRequest = (instance, success, reject) => injectInterceptors(instance, 'request', success, reject);

export const injectInterceptorsResponse = (instance, success, reject) => injectInterceptors(instance, 'response', success, reject);