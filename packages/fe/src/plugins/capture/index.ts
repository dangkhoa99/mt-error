import { IPlugin } from '../../types';
import { captureClick, removeCaptureClick } from './captureClick';
import { captureUrlChange, removeCaptureUrlChange } from './captureUrlChange';

//------------------------------------------------------------------------------------
const onClickPlugin: IPlugin = {
  name: 'CaptureClick',
  onSetup: () => {
    captureClick();
  },
  onDestroy: () => {
    removeCaptureClick();
  },
};

//------------------------------------------------------------------------------------
const onUrlPlugin: IPlugin = {
  name: 'CaptureUrl',
  onSetup: () => {
    captureUrlChange();
  },
  onDestroy: () => {
    removeCaptureUrlChange();
  },
};

//------------------------------------------------------------------------------------
export const plugins = [onClickPlugin, onUrlPlugin];
