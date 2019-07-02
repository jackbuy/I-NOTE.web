import http from '@/utils/http';
import { apiBaseUrl } from '@/constants/url-config';

export default {
    // 用户登录
    login: (params) => http('post', `${apiBaseUrl}/user/login`, params)
};
