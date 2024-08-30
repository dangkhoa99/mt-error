import { IClient } from './client.type';

//------------------------------------------------------------------------------------
export interface IPlugin {
  name: string;
  onSetup?: (client: IClient) => void;
  onDestroy?: (client: IClient) => void;
}
