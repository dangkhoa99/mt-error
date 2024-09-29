import { IAction, INewAction } from './action.type';
import { AnyType } from './common.type';
import { IConfig } from './config.type';
import { TGetDevice } from './device.type';
import { ICreateEvent, IEvent } from './event.type';
import { IPlugin } from './plugin.type';

//------------------------------------------------------------------------------------
export type TDestroy = () => void;

//------------------------------------------------------------------------------------
export interface IClientConstructorValues {
  config: IConfig;
  device: TGetDevice;
  destroy: TDestroy;
}

//------------------------------------------------------------------------------------
export interface IClientConstructor {
  new (values: IClientConstructorValues): IClient;
}

//------------------------------------------------------------------------------------
export interface IClient {
  readonly _config: IConfig;
  readonly _plugins: IPlugin[];
  readonly _actions: IAction[];
  readonly _device: TGetDevice;
  readonly _destroy: TDestroy;

  use: (plugins: IPlugin[]) => IClient;

  registerSignature: () => Promise<void>;

  destroy: () => void;

  createEvent: <T = AnyType>(value: ICreateEvent<T>) => IEvent<T> | null;

  notify: <TResponse = AnyType>(eventLike: AnyType) => Promise<TResponse>;

  addAction: (opts: INewAction) => void;
}
