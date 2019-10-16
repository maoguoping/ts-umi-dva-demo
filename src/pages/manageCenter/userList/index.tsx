import React, {useState, useEffect, useRef} from 'react'
import withRouter from 'umi/withRouter';
import './style.scss'
import { message, Button } from 'antd'
import SearchBox from '../../../components/module/searchBox' 
import UserListTable from './components/userListTable'
import DialogModal from '../../../components/module/dialogModal'
import http from '../../../utils/axios'
import router from 'umi/router';
import { connect } from 'dva';
import { ConnectProps, ConnectState, Dispatch } from '@/models/connect';
import { RouteComponentProps } from 'dva/router';
interface UserListProps extends ConnectProps, RouteComponentProps {
  auth: any;
  page: any;
  location: any;
  dispatch: Dispatch;
}
const  UserList: React.FC<UserListProps> = props => {
  const { dispatch, auth } = props;
  const { roleList } = auth; 
  let deleteList = useRef<Array<any>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [searchList, setSearchList] = useState<Array<any>>([
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
      options: []
    }
  ]);
  const [tableData, setTableData] = useState<Array<any>>([]);
  const deleteModalData = {
    title: '删除用户',
    text: '确定要删除该用户？',
    type: 'question-circle'
  };
  console.log('初始化userList');
  useEffect(() => {
    dispatch({
      type: 'auth/getRoleList',
      payload: {}
    });
  }, [dispatch]);
  useEffect(() => {
    console.debug('角色列表', roleList);
    const newSearchList = searchList.map(item => {
      if (item.name === 'roleId') {
        item.options = roleList;
      }
      return item;
    }) 
    setSearchList(newSearchList);
  },[roleList]);
  useEffect(() => {
    getUserList({});
  }, []);
  function getUserList(info: any) {
    let params = info || {};
    http.post('/getUserList',params).then((res: any) => {
      console.log(res);
      setTableData(res.data.list)
    }).catch((err: any) => {
    })
  }
  function deleteUser() {
    http.get('/deleteUser',{
      userId: deleteList.current[0]
    }).then((res: any) => {
      message.success('删除用户成功');
      getUserList({});
    }).catch((err: any) => {
    })
  }
  function onDeleteUser (e: any) {
    deleteList.current.push(e.userId);
    setShowDeleteModal(true);
  }
  function onAddUser () {
    router.push(`/manageCenter/userList/userDetail?mode=new`);
  }
  function  onDeleteConfirm () {
    setShowDeleteModal(false);
    deleteUser();
  }
  function onDeleteCancel () {
    deleteList.current = [];
    setShowDeleteModal(false);
  }
  function onSearch (e: any) {
    console.log('搜索信息', e);
    let userId = e.userId || '';
    let roleId = e.roleId || '';
    let username = e.username || '';
    getUserList({
      userId,
      roleId,
      username
    });
  }
  function onDetail (e: any) {
    console.log('查看详情');
    let userId = e.userId || '';
    router.push(`/manageCenter/userList/userDetail?mode=edit&userId=${userId}`);
  }
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
