import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { RouterTypes } from 'umi';
import { AuthModelState } from './auth';
import { PageModelState } from './page';

export { AuthModelState, PageModelState };
export interface ConnectState {
  auth: AuthModelState;
  page: PageModelState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> {
  dispatch?: Dispatch;
}
