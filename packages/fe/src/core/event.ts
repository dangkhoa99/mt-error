import { IAction, IDevice, IEvent, TEnvironment } from '../types';

//------------------------------------------------------------------------------------
export class Event<T> implements IEvent<T> {
  readonly actions?: IAction[];
  readonly appType?: string;
  readonly appVersion?: string;
  readonly details: T;
  readonly device: IDevice;
  readonly environment?: TEnvironment;
  readonly projectId: string | number;
  readonly signature: string;
  readonly type: string;

  //------------------------------------------------------------------------------------
  constructor(event: IEvent<T>) {
    const {
      actions,
      appType,
      appVersion,
      details,
      device,
      environment,
      projectId,
      signature,
      type,
    } = event;

    this.actions = actions;
    this.appType = appType;
    this.appVersion = appVersion;
    this.details = details;
    this.device = device;
    this.environment = environment;
    this.projectId = projectId;
    this.signature = signature;
    this.type = type;
  }

  //------------------------------------------------------------------------------------
  get isEvent() {
    return true;
  }
}
