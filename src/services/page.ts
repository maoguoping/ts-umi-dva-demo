import http from '../utils/axios'
export async function getHeaderMenuList (params: any) {
    return http.get('/getHeaderMenuList', params);
}
export async function getSideMenuList (params: any) {
    return http.get('/getSideMenuList', params);
}