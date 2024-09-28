import { IAction, IDevice, IEvent, TEnvironment } from '../types';

//------------------------------------------------------------------------------------
export class Event<T> implements IEvent<T> {
  readonly actions?: IAction[];
  readonly appType?: string;
  readonly appVersion?: string;
  readonly trace: T;
  readonly device: IDevice;
  readonly environment?: TEnvironment;
  readonly projectId: string | number;
  readonly signature: string;
  readonly eventType: string;

  //------------------------------------------------------------------------------------
  constructor(event: IEvent<T>) {
    const {
      actions,
      appType,
      appVersion,
      trace,
      device,
      environment,
      projectId,
      signature,
      eventType,
    } = event;

    this.actions = actions;
    this.appType = appType;
    this.appVersion = appVersion;
    this.trace = trace;
    this.device = device;
    this.environment = environment;
    this.projectId = projectId;
    this.signature = signature;
    this.eventType = eventType;
  }

  //------------------------------------------------------------------------------------
  get isEvent() {
    return true;
  }
}
