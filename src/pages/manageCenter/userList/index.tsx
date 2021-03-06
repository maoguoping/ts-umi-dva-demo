import React, {useState, useEffect, useRef, useLayoutEffect, useCallback} from 'react'
import withRouter from 'umi/withRouter';
import './style.scss'
import { message, Button } from 'antd'
import SearchBox from '../../../components/module/searchBox' 
import UserListTable from './components/userListTable'
import DialogModal from '../../../components/module/dialogModal'
import http from '../../../utils/axios'
import router from 'umi/router';
import { connect } from 'dva';
import { ConnectProps, ConnectState, Dispatch, AuthModelState, PageModelState } from '@/models/connect';
import { RouteComponentProps } from 'dva/router';
interface UserListProps extends ConnectProps, RouteComponentProps {
  auth: AuthModelState;
  page: PageModelState;
  location: any;
  dispatch: Dispatch;
}

interface SearchListItem {
  label: string,
  placeholder: string,
  type: string,
  name: string,
  options?: any[]
}
const  UserList: React.FC<UserListProps> = props => {
  const { dispatch, auth } = props;
  const { roleList } = auth;
  const searchList = [
    {
      label: '用户名',
      placeholder: '请输入用户名',
      type: 'input',
      name: 'username'
    },
    {
      label: '用户id',
      placeholder: '请输入用户id',
      type: 'input',
      name: 'userId'
    },
    {
      label: '用户角色',
      placeholder: '请选择用户角色',
      type: 'select',
      name: 'roleId',
      options: roleList
    }
  ]
  const deleteModalData = {
    title: '删除用户',
    text: '确定要删除该用户？',
    type: 'question-circle'
  };
  let deleteList = useRef<Array<any>>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  console.log('effect前')
  useLayoutEffect(() => {
    console.log('获取角色列表');
    dispatch({
      type: 'auth/getRoleList',
      payload: {}
    });
  }, []);
  useEffect(() => {
    console.log('获取用户列表')
    getUserList({});
  }, []);
  console.log('effect后')
  function getUserList(info: any) {
    let params = info || {};
    http.post('/getUserList',params).then((res: any) => {
      console.log(res);
      setTableData(res.data.list)
    }).catch((err: any) => {
    })
  }
  const deleteUser = useCallback(() => {
    http.get('/deleteUser',{
      userId: deleteList.current[0]
    }).then((res: any) => {
      message.success('删除用户成功');
      getUserList({});
    }).catch((err: any) => {
    })
  }, [deleteList])
  const onDeleteUser  = useCallback((e: any) => {
    deleteList.current.push(e.userId);
    setShowDeleteModal(true);
  }, [deleteList])
  const onDeleteCancel = useCallback(() => {
    deleteList.current = [];
    setShowDeleteModal(false);
  }, [deleteList])
  const onAddUser = useCallback(() => {
    router.push(`/manageCenter/userList/userDetail?mode=new`);
  }, [])
  const onDeleteConfirm = useCallback(() => {
    setShowDeleteModal(false);
    deleteUser();
  }, [])
  const onSearch = useCallback((e: any) => {
    console.log('搜索信息', e);
    let userId = e.userId || '';
    let roleId = e.roleId || '';
    let username = e.username || '';
    getUserList({
      userId,
      roleId,
      username
    });
  }, [])
  const onDetail = useCallback((e: any) => {
    console.log('查看详情');
    let userId = e.userId || '';
    router.push(`/manageCenter/userList/userDetail?mode=edit&userId=${userId}`);
  }, [])
  return (
    <div className="user-list-page">
    <div className="user-list-search">
      <SearchBox  list={searchList} onSearch={onSearch}></SearchBox>
    </div>
    <div className="user-list-action-bar">
      <Button type="primary" onClick={onAddUser}>新增</Button>
    </div>
    <div className="user-list-content">
      <UserListTable data={tableData} roleList={roleList} onDelete={onDeleteUser} onDetail={onDetail}></UserListTable>
    </div>
    <DialogModal value={showDeleteModal} data={deleteModalData} onConfirm={onDeleteConfirm} onCancel = {onDeleteCancel}></DialogModal>
  </div>
  )
}
export default withRouter(connect(({auth, page}: ConnectState) => ({auth, page}))(UserList));
