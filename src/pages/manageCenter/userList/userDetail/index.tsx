import React, {useState, useEffect} from 'react'
import { Descriptions, Tag, Input, Button, message } from 'antd'
import './style.scss'
import http from '../../../../utils/axios'
import withRouter from 'umi/withRouter';
import { ConnectProps, ConnectState, Dispatch } from '@/models/connect';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'dva';
import qs from 'qs';
interface UserDetailProps extends ConnectProps, RouteComponentProps{
    dispatch: Dispatch;
    auth: any;
    page: any;
}
const UserDetail: React.FC<UserDetailProps> = props => {
    const { dispatch, auth } = props;
    const { roleList } = auth; 
    const [mode, setMode] = useState('edit');
    const [userDetailInfo, setUserDetailInfo] = useState({
        username: '',
        userId: '',
        userTickname: '',
        roleId: []
    });
    let roleMap = new Map();
    if (roleList.length > 0) {
        roleList.forEach((item: any) => {
            roleMap.set(item.value, item.label);
        })
    }
    const username = userDetailInfo.username;
    const userTickname =userDetailInfo.userTickname;
    useEffect(() => {
        let location = props.history.location;
        let params = qs.parse(location.search.substring(1));
        console.debug('解析结果', params)
        if (params.mode === 'edit') {
           loadData(params.userId)
        }
        setMode(params.mode)
        dispatch({
            type: 'auth/getRoleList',
            payload: {}
        });
    }, [dispatch, props.history.location]);
    function changeUsername (e: any) {
        setUserDetailInfo({
            ...userDetailInfo,
            username: e.target.value
        })
    }
    function changeUserTickname (e: any) {
        setUserDetailInfo({
            ...userDetailInfo,
            userTickname: e.target.value
        })
    }
    function loadData(userId: string) {
        http.get('/getUserDetailById', {
            userId
        }).then((res: any) => {
            console.log(res);
            const data = res.data;
            setUserDetailInfo({
                username: data.username,
                userId: data.userId,
                userTickname: data.userTickname,
                roleId: data.roleId
            })     
        }).catch((err: any) => {
            console.error(err);
        })
    }
    function saveData () {
        const {
            userId,
            username,
            userTickname
        } = userDetailInfo;
        if(!username) {
            message.warning('用户名不能为空!');
            return;
        }
        if(!userTickname) {
            message.warning('用户昵称不能为空!');
            return;
        }
        if (mode === 'edit') {
            http.get('/setUserDetailById', {
                userId,
                username,
                userTickname
            }).then((res: any) => {
                message.success('保存成功');
                loadData(userId);
            }).catch((err: any) => {
            })
        } else {
            http.get('/addUser', {
                username,
                userTickname
            }).then((res: any) => {
                message.success('新增成功');
                window.history.go(-1);
            }).catch((err: any) => {
            })
        }
    }
    return (
        <div className="user-detail-page">
            <Descriptions title="用户信息">
                <Descriptions.Item label="用户名">
                    <Input value={username} defaultValue={username} onChange={changeUsername}></Input>
                </Descriptions.Item>
                {
                   mode === 'edit' && 
                    <Descriptions.Item label="用户id">{userDetailInfo.userId}</Descriptions.Item>
                }
                <Descriptions.Item label="用户昵称">
                    <Input value={userTickname} defaultValue={userTickname} onChange={changeUserTickname}></Input>
                </Descriptions.Item>
                {
                    mode === 'edit' && 
                    <Descriptions.Item label="用户角色">
                        {
                            userDetailInfo.roleId.map((tag: any) => {
                                let color = tag.length > 5 ? 'geekblue' : 'green';
                                if (tag === '00') {
                                    color = 'volcano';
                                }
                                if (tag === '10') {
                                    color = 'gold';
                                }
                                if (tag === '20') {
                                    color = 'blue';
                                }
                                return (
                                    <Tag color={color} key={tag}>
                                    {roleMap.get(tag)}
                                    </Tag>
                                );
                            })
                        }
                    </Descriptions.Item>
                }
            </Descriptions>
            <div className="action-bar">
                <Button type="primary" onClick={saveData}>保存</Button>
            </div>
        </div>
    );
}
export default withRouter(connect(({auth, page}: ConnectState) => ({auth, page}))(UserDetail));