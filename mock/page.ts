import qs from 'qs'
import mockjs from 'mockjs'
export default {
    'GET /getHeaderMenuList'(req: any, res: any) {
        let data = qs.parse(req.query);
        res.json({
            code: 0,
            success: true,
            message: '成功',
            data: {
                list: [
                    {
                        value: '0',
                        label: '首页',
                        target: '/index'
                    },
                    {
                        value: '1',
                        label: '管理中心',
                        target: '/manageCenter'
                    },
                    {
                        value: '2',
                        label: '数据中心',
                        target: '/dataCenter'
                    },
                    {
                        value: '3',
                        label: '设置',
                        target: '/setting'
                    }
                ]
            }
        });
    },
    'GET /getSideMenuList'(req: any, res: any) {
        let data = qs.parse(req.query);
        res.json({
            code: 0,
            success: true,
            message: '成功',
            data: {
                list: [
                    {
                        value: 'sub1',
                        iconType: 'user',
                        label: '用户管理',
                        children: [
                            {
                                value: 'child1',
                                label: '用户列表',
                                target: '/manageCenter/userList',
                                innerPage: [
                                    {
                                        label: '用户详情',
                                        target: '/manageCenter/userList/userDetail'
                                    }
                                ]
                            },
                            {
                                value: 'child2',
                                label: '角色列表',
                                target: '/manageCenter/roleList'
                            },
                            {
                                value: 'child3',
                                label: '权限列表',
                                target: '/manageCenter/rightList'
                            }
                        ]
                    },
                    {
                        value: 'sub2',
                        iconType: 'laptop',
                        label: '设备管理',
                        children: [
                            {
                                value: 'child4',
                                label: '设备列表',
                                target: '/manageCenter/deviceList'
                            },
                            {
                                value: 'child5',
                                label: '设备事件',
                                target: '/manageCenter/deviceEventsList'
                            }
                        ]
                    }
                ]
            }
        });
    }
}