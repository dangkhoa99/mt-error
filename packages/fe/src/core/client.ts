import { defaultConfig } from '../constants';
import {
  AnyType,
  IAction,
  IClient,
  IClientConstructor,
  IClientConstructorValues,
  IConfig,
  ICreateEvent,
  TDestroy,
  IEvent,
  TGetDevice,
  IPlugin,
  INewAction,
} from '../types';
import { encrypt, getSignature, isEvent } from '../utils';
import { Action } from './action';
import { Event } from './event';

//------------------------------------------------------------------------------------
class _Client implements IClient {
  readonly _config: IConfig;
  readonly _actions: IAction[];
  readonly _plugins: IPlugin[];
  readonly _device: TGetDevice;
  readonly _destroy: TDestroy;

  //------------------------------------------------------------------------------------
  constructor(opts: IClientConstructorValues) {
    const { config, device, destroy } = opts;

    this._config = config;
    this._device = device;
    this._destroy = destroy;

    this._plugins = [];
    this._actions = [];
  }

  //------------------------------------------------------------------------------------
  use(plugins: IPlugin[]) {
    plugins.forEach((helper) => helper.onSetup?.(this));
    this._plugins.push(...plugins);
    return this;
  }

  //------------------------------------------------------------------------------------
  destroy() {
    console.info(
      '%c MT Error %c has been destroyed',
      'background:#af5f5f; color: #fff',
      'background:transparent',
    );

    this._plugins.forEach((helper) => helper.onDestroy?.(this));
    return this._destroy();
  }

  //------------------------------------------------------------------------------------
  // Create an event
  // Return a data body containing device actions and other information
  createEvent<T = AnyType>(values: ICreateEvent<T>): IEvent<T> {
    const { publicKey, appVersion, appType, environment, projectId } =
      this._config;

    return new Event({
      actions: this._actions,
      appType,
      appVersion,
      trace: values.trace,
      device: this._device(this),
      environment,
      projectId,
      signature: getSignature(publicKey),
      eventType: values.eventType,
    });
  }

  //------------------------------------------------------------------------------------
  // Used to trigger the reporting of event
  notify<T = AnyType, TResponse = AnyType>(eventLike: AnyType) {
    let event: IEvent<T> | null;

    if (Boolean(eventLike) && !isEvent(eventLike)) {
      event = this.createEvent(eventLike);
    } else {
      event = eventLike;
    }

    const endpoint = this._config.endpoint;

    return new Promise<TResponse>((resolve, reject) => {
      if (!endpoint) {
        return resolve({} as unknown as TResponse);
      }

      if (!event) {
        return reject(new Error('Event is not valid'));
      }

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })
        .then((res) => {
          resolve(res as unknown as TResponse);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  //------------------------------------------------------------------------------------
  // Add an action.
  // Once the threshold is reached, the oldest actions will be deleted.
  addAction(opts: INewAction) {
    const actions = this._actions;
    const timestamp = new Date().toISOString();
    const action = new Action({ ...opts, timestamp });
    const maxActions = this._config.maxActions ?? defaultConfig.maxActions;

    if (maxActions > 0) {
      if (actions.length >= maxActions) {
        actions.shift();
      }
      actions.push(action);
    }
  }
}

//------------------------------------------------------------------------------------
export const Client: IClientConstructor = _Client;
