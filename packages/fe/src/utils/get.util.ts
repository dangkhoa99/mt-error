import { MTErrorGlobal, MTErrorObject } from '../types';

//------------------------------------------------------------------------------------
export const getGlobal = <T = Window>(): T & MTErrorGlobal => {
  return (
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
          ? self
          : {}
  ) as T & MTErrorGlobal;
};

//------------------------------------------------------------------------------------
export const getMTErrorObject = <T = Window>(): MTErrorObject => {
  const global = getGlobal<T>();

  if (!global.__MT_ERROR__) {
    throw new Error('Failed to get `MTErrorObject`');
  }

  return global.__MT_ERROR__;
};
