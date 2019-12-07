export const routeList: any[] = [
    {
        path: '/', component: './index', routes: [
            {
                path: '/login', component: './login'
            },
            {
                path: '/index', component: './index/index'
            },
            {
                path: '/manageCenter', component: './manageCenter/_layout',
                routes: [
                    { path: '/manageCenter/userList', component: './manageCenter/userList' },
                    { path: '/manageCenter/userList/userDetail', component: './manageCenter/userList/userDetail' },
                    { path: '/manageCenter/roleList', component: './manageCenter/roleList' },
                    { path: '/manageCenter/rightList', component: './manageCenter/rightList' },
                    { path: '/manageCenter/deviceList', component: './manageCenter/deviceList' },
                    { path: '/manageCenter/deviceEventsList', component: './manageCenter/deviceEventsList' },
                    { component: './404' },
                ]
            },
            {
                path: '/dataCenter', component: './dataCenter/index'
            },
            {
                path: '/setting', component: './setting/index'
            },
            {
                path: '/', component: './index/index'
            }
        ]
    },
    { component: './404' }
];