import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { RouterTypes } from 'umi';
import { AuthModelStateType } from './auth';
import { PageModelStateType } from './page';

export interface ConnectState {
  auth: AuthModelStateType;
  page: PageModelStateType;
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
