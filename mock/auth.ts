import qs from 'qs';
import mockjs from 'mockjs';
interface UserListItem {
    key: string;
    username: string;
    userTickname: string;
    userId: string;
    age: number,
    address: string;
    roleId: string[],
}
let userList: UserListItem[] = [
    {
        key: '1',
        username: 'John Brown',
        userTickname: '2342',
        userId: '1',
        age: 32,
        address: 'New York No. 1 Lake Park',
        roleId: ['00'],
    },
    {
        key: '2',
        username: 'Jim Green',
        userTickname: '2342',
        userId: '2',
        age: 42,
        address: 'London No. 1 Lake Park',
        roleId: ['01'],
    },
    {
        key: '3',
        username: 'Joe Black',
        userTickname: '2342',
        userId: '3',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        roleId: ['01','10'],
    },
    {
        key: '4',
        username: 'Jim Green3',
        userTickname: '2342',
        userId: '4',
        age: 42,
        address: 'London No. 1 Lake Park',
        roleId: ['20'],
    },
    {
        key: '5',
        username: 'Joe Blackt',
        userTickname: '23423',
        userId: '5',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        roleId: ['20'],
    }
];
export default {
    'POST /loginIn' (req: any, res: any) {
        let data = qs.parse(req.body);
        res.json({
            code: 0,
            success: true,
            message: '登录成功',
            data: {
                userId: '007',
                username: 'mgp'
            }
        });
    },
    'POST /getRouteInfo' (req: any, res: any) {
        res.json({
            code: 0,
            success: true,
            message: '获取路由信息成功',
            data: {
                '/login': {
                    right: true,
                    name: '登陆',
                    path:  '/login'
                },
                '/manageCenter/userList': {
                    right: true,
                    name: '用户列表',
                    path: '/manageCenter/userList'
                },
                '/manageCenter/userList/userDetail': {
                    right: true,
                    name: '用户详情',
                    path: '/manageCenter/userList/userDetail',
                    isInnerPage: true
                },
                '/manageCenter/roleList': {
                    right: true,
                    name: '角色列表',
                    path: '/manageCenter/roleList'
                },
                '/manageCenter/rightList': {
                    right: true,
                    name: '权限列表',
                    path: '/manageCenter/rightList'
                },
                '/manageCenter/deviceList': {
                    right: true,
                    name: '设备列表',
                    path: '/manageCenter/deviceList'
                },
                '/manageCenter/deviceEventsList': {
                    right: true,
                    name: '设备事件列表',
                    path: '/manageCenter/deviceEventsList'
                }
            }
        });
    },
    'GET /getRoleList' (req: any, res: any) {
        let data = qs.parse(req.query);
        res.json({
            code: 0,
            success: true,
            message: '获取成功',
            data: {
                list: [
                    {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: '00',
                        label: '超级管理员'
                    },
                    {
                        value: '01',
                        label: '管理员'
                    },
                    {
                        value: '10',
                        label: '会员'
                    },
                    {
                        value: '20',
                        label: '普通用户'
                    }
                ],
                total: 2
            }
        });
    },
    'POST /getUserList' (req: any, res: any) {
        let  data= qs.parse(req.body);
        const { userId, roleId, username } = data;
        const filterList = userList.filter(item => {
            if (userId) {
                if(userId !== item.userId) {
                    return false;
                }
            }
            if (roleId) {
                if(!item.roleId.includes(roleId)) {
                    return false;
                }
            }
            if (username) {
                if(username !== item.username) {
                    return false;
                }
            }
            return true;
        })
        res.json({
            code: 0,
            success: true,
            message: '获取成功',
            data: {
                list: filterList,
                page: 1,
                size: 10,
                total: 6
            }
        });
    },
    'GET /deleteUser' (req: any, res: any) {
        let data = qs.parse(req.query);
        userList = userList.filter(item => {
            return item.userId !== data.userId
        })
        res.json({
            code: 0,
            success: true,
            message: '删除成功',
            data: {
               userId: data.userId
            }
        });
    },
    'GET /getUserDetailById' (req: any, res: any) {
        let data = qs.parse(req.query);
        let arr = userList.filter(item => item.userId == data.userId);
        res.json({
            code: 0,
            success: true,
            message: '获取成功',
            data: arr[0]
        });
    },
    'GET /setUserDetailById' (req: any, res: any) {
        let data = qs.parse(req.query);
        for(const o of userList) {
            if (o.userId == data.userId) {
                o.username = data.username;
                o.userTickname = data.userTickname;
                break;
            }
        }
        res.json({
            code: 0,
            success: true,
            message: '设置',
            data: null
        });
    },
    'GET /addUser' (req: any, res: any) {
        let data = qs.parse(req.query);
        userList.push({
            key: '6',
            username: data.username,
            userTickname:  data.userTickname,
            userId: '6',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            roleId: ['20'],
        });
        res.json({
            code: 0,
            success: true,
            message: '添加成功',
            data: null
        });
    },
}
