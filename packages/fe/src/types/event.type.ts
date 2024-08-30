import { IAction } from './action.type';
import { IDevice } from './device.type';

//------------------------------------------------------------------------------------
export type TEnvironment = string;

//------------------------------------------------------------------------------------
export type TEventType = string;

//------------------------------------------------------------------------------------
export interface IEvent<T> {
  projectId: string | number;
  signature: string;
  appVersion?: string;
  appType?: string;
  environment?: TEnvironment;
  type: string;

  details: T;
  device: IDevice;
  actions?: IAction[];
}

//------------------------------------------------------------------------------------
export interface IBaseDetail {
  message?: string;
}

//------------------------------------------------------------------------------------
export interface ICreateEvent<T> {
  type: TEventType;
  details: T;
}
