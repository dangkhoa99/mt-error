import { TEnvironment } from './event.type';

//------------------------------------------------------------------------------------
export interface IConfig {
  publicKey?: string;
  endpoint?: string;
  environment?: TEnvironment;
  projectId?: string | number;
  appVersion?: string;
  appType?: string;
  maxActions?: number;
}
