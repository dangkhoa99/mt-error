import { IDevice, TGetDevice } from '../types';

//------------------------------------------------------------------------------------
export const device: TGetDevice = () => {
  const rs: IDevice = {};

  if (navigator) {
    rs.language = navigator.language;
    rs.userAgent = navigator.userAgent;
  }

  if (document) {
    rs.title = document.title;
    rs.referrer = document.referrer;
  }

  if (window.location) {
    rs.url = window.location.href;
  }

  return rs;
};
