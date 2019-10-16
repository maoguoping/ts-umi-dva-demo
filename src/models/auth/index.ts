import { EffectsCommandMap, Subscription } from 'dva';
import { routerRedux } from 'dva/router'
import { AnyAction, Reducer } from 'redux';
import { getLocalStorage, setLocalStorage } from '../../utils/persist'
import { loginIn, getRouteInfo, getRoleList } from '../../services/auth'
import { parse } from 'qs'
const initState = {
  userInfo: {
    username: '',
  },
  routeInfo: null,
  roleList: []
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;
export interface AuthModelStateType {
  namespace: string;
  state: {};
  effects: {
    login: Effect;
    logout: Effect;
    getRouteInfo: Effect;
    refresh: Effect;
    getRoleList: Effect
  };
  reducers: {
    setUserInfo: Reducer<{}>;
    setRouteInfo: Reducer<{}>;
    setRoleList: Reducer<{}>;
  };
  subscriptions: {
    setup: Subscription
  }
}
const AuthModelState: AuthModelStateType = {
  namespace: 'auth',
  state: initState,
  reducers: {
    setUserInfo (state = initState, { payload: userInfo }) {
      console.debug('设置用户信息', state);
      return {
        ...state,
        userInfo
      };
    },
    setRouteInfo (state = initState, { payload: routeInfo }) {
      console.debug('修改路由信息')
      return {
        ...state,
        routeInfo
      };
    },
    setRoleList (state = initState, { payload: roleList }) {
      console.debug('修改角色信息')
      return {
        ...state,
        roleList
      };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.debug('登陆')
      const loginResult = yield call(loginIn, parse(payload));
      console.debug('登陆结果', loginResult)
      if (loginResult.success) {
        setLocalStorage('userInfo', loginResult.data);
        yield put({
          type: 'setUserInfo',
          payload: payload.userInfo,
        });
        const { data, success } = yield call(getRouteInfo, {});
        if (success) {
          setLocalStorage('userInfo', data);
          yield put({
            type: 'setRouteInfo',
            payload: data,
          });
          yield put(routerRedux.push('/'));
        }
      }
    },
    *logout({ payload }, { call, put }) {
      let empty = {
        username: '',
      }
      setLocalStorage('userInfo', empty);
      yield put({
        type: 'setUserInfo',
        payload: empty,
      });
      yield put(routerRedux.push('/login'));
    },
    *getRouteInfo({ payload }, { call, put }) {
      console.debug('获取权限路由信息', arguments);
      const { data, success } = yield call(getRouteInfo, {});
      if (success) {
        // setLocalStorage('userInfo', data);
        yield put({
          type: 'setRouteInfo',
          payload: data,
        });
      }
    },
    *refresh ({ payload }, { call, put }) {
      yield put({
        type: 'setUserInfo',
        payload
      });
      yield put({
        type: 'getRouteInfo',
        payload
      });
      console.debug('refresh')
    },
    *getRoleList({ payload }, { call, put }) {
      const { data, success } = yield call(getRoleList, {});
      if (success) {
        yield put({
          type: 'setRoleList',
          payload: data.list
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const data = getLocalStorage('userInfo');
      if (data) {
        dispatch({
          type: 'refresh',
          payload: data
        });
      }
    },
  },
};
export default AuthModelState;