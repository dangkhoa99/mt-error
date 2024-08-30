import { IClient } from './client.type';
import { AnyType } from './common.type';

//------------------------------------------------------------------------------------
export interface IDevice {
  language?: string;
  userAgent?: string;
  title?: string;
  referrer?: string;
  url?: string;
  [key: string]: AnyType;
}

//------------------------------------------------------------------------------------
export type TGetDevice = (client?: IClient) => IDevice;
