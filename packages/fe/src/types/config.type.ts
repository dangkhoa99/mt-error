import { TEnvironment } from './event.type';

//------------------------------------------------------------------------------------
export interface IConfig {
  apiKey: string;
  secretKey: string;
  endpoint?: string;
  environment: TEnvironment;
  projectId: string | number;
  appVersion?: string;
  appType?: string;
  maxActions?: number;
}
