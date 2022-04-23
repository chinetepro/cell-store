import ServicePublicService from '../services/ServicePublic.api.service';
import { createCacheHook, createHook } from '../../../lib';

// Service operations
export const useFindServiceCache = createCacheHook(ServicePublicService.getOneCache);
export const useFindAllService = createHook(ServicePublicService.getAllPost,[]);
export const useFindServiceWithCache = createCacheHook(ServicePublicService.getAllCache, []);

