
import { createHook } from '../../../lib';
import AuthService from '../../../lib/services/auth.service';

export const useRefreshToken = createHook(AuthService.refreshToken);
