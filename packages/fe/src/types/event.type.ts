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
  eventType: string;

  trace: T;
  device: IDevice;
  actions?: IAction[];
}

//------------------------------------------------------------------------------------
export interface IBaseDetail {
  message?: string;
}

//------------------------------------------------------------------------------------
export interface ICreateEvent<T> {
  eventType: TEventType;
  trace: T;
}
