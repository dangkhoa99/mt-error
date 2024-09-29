import { plugins } from '../plugins';
import { IClient, IConfig } from '../types';
import { device, getGlobal, isConfigValid } from '../utils';
import { Client } from './client';

//------------------------------------------------------------------------------------
export class MTError {
  private static instance: MTError;
  private _client: IClient | null = null;

  //------------------------------------------------------------------------------------
  constructor(config: IConfig) {
    if (!isConfigValid(config)) {
      console.info(
        '%c MT Error %c initialization failed',
        'background:#af5f5f; color: #FFF',
        'background:transparent',
      );
      return;
    }

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
  static init(config: IConfig) {
    if (!this.instance) {
      this.instance = new MTError(config);
    }
    return this.instance._client;
  }
}
