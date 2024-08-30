import { IClient } from './client.type';

//------------------------------------------------------------------------------------
export type AnyType = any;

//------------------------------------------------------------------------------------
export interface MTErrorObject {
  client: IClient;
}

//------------------------------------------------------------------------------------
export interface MTErrorGlobal {
  __MT_ERROR__: MTErrorObject;
}
