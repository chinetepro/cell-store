
import {
  injectInterceptorsResponse,
  injectInterceptorsRequest
} from "../AxiosUtils/AxiosInjectors";
import { networkModule } from "./configRaindrop";
import trimObjectValues from "../Utils/trimObjectValues";
import _isObject from "lodash/isObject";
import { ApiClientService } from "..";


let apiClientInstance = ApiClientService;

apiClientInstance = injectInterceptorsResponse(
  apiClientInstance,
  d => d,
  e => {
    networkModule(e);
    return Promise.reject(e);
  }
);

apiClientInstance = injectInterceptorsRequest(
  apiClientInstance,
  config => {
    if (
      (!config.headers["Content-Type"] ||
        config.headers["Content-Type"] === "application/json") &&
      _isObject(config.data)
    ) {
      config.data = trimObjectValues(config.data);
    }
    return config;
  },
  e => Promise.reject(e)
);

export default apiClientInstance;
