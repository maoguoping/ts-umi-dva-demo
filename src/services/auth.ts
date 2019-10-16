import http from '@/utils/axios'
export async function loginIn (params: any) {
    return http.post('/loginIn', params);
}
export async function getRouteInfo (params: any) {
    return http.post('/getRouteInfo', params);
}
export async function getRoleList (params: any) {
    return http.get('/getRoleList', params);
}