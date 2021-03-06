import { EffectsCommandMap, Subscription } from 'dva';
import { routerRedux } from 'dva/router'
import { AnyAction, Reducer } from 'redux';
import { getLocalStorage, setLocalStorage } from '../../utils/persist'
import { getHeaderMenuList, getSideMenuList } from '../../services/page'
import { parse } from 'qs'
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;
export interface HeaderItem {
  value: string;
  label: string;
  target: string;
}
export interface CurrentHeader {
  value: string;
  label: string;
}
export interface SiderItem {
  value: string;
  label: string;
  children: any[];
}
export interface CurrentSiderItem {
  value: string;
  label: string;
}
export interface InnerPageItem {
  value: string;
  label: string;
}
export interface PageModelState {
  headerMenuList: HeaderItem[];
  sideMenuList: SiderItem[];
  currentHeader: CurrentHeader;
  currentSide: CurrentSiderItem[];
  innerPageList: InnerPageItem[];
};
export interface PageModelType {
  namespace: string;
  state: PageModelState;
  effects: {
    getHeaderMenuList: Effect;
    getSideMenuList: Effect;
    changeHistory: Effect;
  };
  reducers: {
    setHeaderMenuList: Reducer<PageModelState>;
    setSideMenuList: Reducer<PageModelState>;
    setCurrentHeader: Reducer<PageModelState>;
    setCurrentSide: Reducer<PageModelState>;
    setInnerPageList: Reducer<PageModelState>;
  };
  subscriptions: {
    setup: Subscription
  }
};

const initState: PageModelState = {
  headerMenuList: [],
  sideMenuList: [],
  currentHeader: {
    value: '1',
    label: '管理中心'
  },
  currentSide: [
    {
      value: 'sub1',
      label: '用户管理'
    },
    {
      value: 'child1',
      label: '用户列表'
    }
  ],
  innerPageList: []
}
const PageModelType: PageModelType = {
  namespace: 'page',
  state: initState,
  reducers: {
    setHeaderMenuList(state = initState, { payload: headerMenuList }) {
      console.debug('头部菜单', headerMenuList)
      return {
        ...state,
        headerMenuList
      };
    },
    setSideMenuList(state = initState, { payload: sideMenuList }) {
      return {
        ...state,
        sideMenuList
      };
    },
    setCurrentHeader(state = initState, { payload: { pathname } }) {
      let currentHeader = state.currentHeader;
      let headerMenuList = state.headerMenuList;
      if (headerMenuList.length > 0) {
        for (const block of state.headerMenuList) {
          if (pathname.indexOf(block.target) === 0) {
            currentHeader = {
              value: block.value,
              label: block.label
            };
            break;
          }
        }
      }
      return {
        ...state,
        currentHeader
      };
    },
    setCurrentSide(state = initState, { payload: { pathname }}) {
      let currentSide: CurrentSiderItem[] = [];
      let sideMenuList = state.sideMenuList;
      if (sideMenuList.length > 0) {
        console.log('菜单', state.sideMenuList)
        for (const block of state.sideMenuList) { 
          console.log('菜单1', block)
          for (const item of block.children) {
            console.log('菜单定位', pathname, item.target, pathname.indexOf(item.target))
            if (pathname.indexOf(item.target) === 0) {
              currentSide = [
                {
                  value: block.value,
                  label: block.label
                },
                {
                  value: item.value,
                  label: item.label
                }
              ];
            }
          }
        }
      } else {
        currentSide = state.currentSide;
      }
      return {
        ...state,
        currentSide
      };
    },
    setInnerPageList(state = initState, { payload: { pathname, routeInfo } }) {
      let innerPageList = []; 
      if (routeInfo.isInnerPage) {
        innerPageList.push({
          label: routeInfo.name,
          value: routeInfo.path
        });
      };
      return {
        ...state,
        innerPageList
      };
    }
  },
  effects: {
    *getHeaderMenuList({ payload }, { call, put }) {
      const { data, success } = yield call(getHeaderMenuList, parse(payload));
      if (success) {
        yield console.debug('加载头部菜单', data)
        setLocalStorage('headerMenuList', data.list);
        yield put({
          type: 'setHeaderMenuList',
          payload: data.list,
        });
      }
    },
    *getSideMenuList({ payload }, { call, put }) {
      const { data, success } = yield call(getSideMenuList, parse(payload));
      if (success) {
        setLocalStorage('sideMenuList', data.list);
        yield put({
          type: 'sideMenuList',
          payload: data.list,
        });
      }
    },
    *changeHistory({ payload }, { call, put, select }) {
      const routeInfo: any = yield select( (state: any) => state.auth.routeInfo);
      console.debug('路由信息', routeInfo);
      if(routeInfo && Object.keys(routeInfo).length > 0) {
        let path = payload.split('?')[0];
        let routeInfoValue = routeInfo[path];
        console.debug('匹配到路由信息', routeInfoValue);
        if(routeInfoValue) {
          yield put({
            type: 'setCurrentHeader',
            payload: {
              pathname: payload,
              routeInfo: routeInfoValue
            }
          });
          yield put({
            type: 'setCurrentSide',
            payload: {
              pathname: payload,
              routeInfo: routeInfoValue
            }
          });
          yield put({
            type: 'setInnerPageList',
            payload: {
              pathname: payload,
              routeInfo: routeInfoValue
            }
          });
        } else {
          // yield put(routerRedux.push('/404'));
        }
      }
    }
  },
  subscriptions: {
    setup(e) {
      const { dispatch, history } = e;
      console.debug('setup', e);
      const headerMenuList = getLocalStorage('headerMenuList');
      const sideMenuList = getLocalStorage('sideMenuList');
      if (headerMenuList && headerMenuList.length !== 0) {
        dispatch({
          type: 'setHeaderMenuList',
          payload: headerMenuList
        });
      } else {
        dispatch({
          type: 'getHeaderMenuList',
          payload: {}
        });
      }
      console.debug('sideMenuList内容', sideMenuList);
      if (sideMenuList && sideMenuList.length !== 0) {
        dispatch({
          type: 'setSideMenuList',
          payload: sideMenuList
        });
      } else {
        dispatch({
          type: 'getSideMenuList',
          payload: {}
        });
      }
      history.listen((location) => {
        // console.debug('监听路由变化', location);
        let pathname = location.pathname;
        if(pathname.indexOf('/login') !== 0) {
          dispatch({
            type: 'changeHistory',
            payload: pathname
          });
        }
      })
    }
  },
};
export default PageModelType;