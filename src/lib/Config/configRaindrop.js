import {observe} from "../raindrop";

export const MODULES = {
  NETWORK_MODULE: 'network_module'
};

//module : state
const networkModule = observe(MODULES.NETWORK_MODULE, null);

export {
  networkModule
}
