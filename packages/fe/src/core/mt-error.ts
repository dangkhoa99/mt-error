import { plugins } from '../plugins';
import { IClient, IConfig } from '../types';
import { device, getGlobal, getSignature } from '../utils';
import { Client } from './client';

//------------------------------------------------------------------------------------
export class MTError {
  private static instance: MTError;
  private _client: IClient | null = null;

  //------------------------------------------------------------------------------------
  constructor(config: IConfig) {
    const global = getGlobal<Window>();

    //------------------------------------------------------------------------------------
    const destroy = () => {
      this._client = null;
      global.__MT_ERROR__ = undefined;
    };

    //------------------------------------------------------------------------------------
    const client = new Client({ config, device, destroy });

    client.registerSignature();
    client.use(plugins);

    global.__MT_ERROR__ = { client };

    this._client = client;

    console.info(
      '%c MT Error %c initialized',
      'background:#af5f5f; color: #FFF',
      'background:transparent',
    );
  }

  //------------------------------------------------------------------------------------
  static getInstance(config: IConfig) {
    if (!this.instance) {
      this.instance = new MTError(config);
    }
    return this.instance;
  }

  //------------------------------------------------------------------------------------
  get client() {
    if (!this._client) {
      throw new Error('MT Error not initialized');
    }
    return this._client;
  }
}
