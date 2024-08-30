import { AnyType } from '../../types';
import { getGlobal, getMTErrorObject, parseUrl, replace } from '../../utils';

const global = getGlobal<Window>();
let lastHref: string | undefined;

//------------------------------------------------------------------------------------
const handleUrlChange = (from?: string, to?: string) => {
  const { client } = getMTErrorObject<Window>();

  const parsedHref = parseUrl(global?.location?.href);
  let parsedFrom = parseUrl(from as string);
  const parsedTo = parseUrl(to as string);

  if (!parsedFrom.path) {
    parsedFrom = parsedHref;
  }

  lastHref = to;

  let targetFrom = from;
  let targetTo = to;

  if (
    parsedHref.protocol === parsedTo.protocol &&
    parsedHref.host === parsedTo.host
  ) {
    targetTo = parsedTo.relative;
  }

  if (
    parsedHref.protocol === parsedFrom.protocol &&
    parsedHref.host === parsedFrom.host
  ) {
    targetFrom = parsedFrom.relative;
  }

  if (targetFrom === targetTo) {
    return;
  }

  client.addAction({
    message: `Navigation to ${to}`,
    data: { from, to },
    type: 'navigation',
  });
};

//------------------------------------------------------------------------------------
const historyReplacement = (
  original: (data: AnyType, title: string, url?: string) => void,
) => {
  return function call(data: AnyType, title: string, url?: string) {
    if (url) {
      handleUrlChange(lastHref, String(url));
    }

    return original.apply(this, [data, title, url]);
  };
};

//------------------------------------------------------------------------------------
const historyOriginal = {
  pushState: global?.history?.pushState,
  replaceState: global?.history?.replaceState,
  onpopstate: global?.onpopstate,
};

//------------------------------------------------------------------------------------
const historyListener = () => {
  historyOriginal.pushState = replace(
    global?.history,
    'pushState',
    historyReplacement,
  );

  historyOriginal.replaceState = replace(
    global?.history,
    'replaceState',
    historyReplacement,
  );

  historyOriginal.onpopstate = replace(
    global,
    'onpopstate',
    (origin) =>
      function call(...args: AnyType[]) {
        const current = global?.location?.href;
        handleUrlChange(lastHref, current);
        return origin?.apply(this, args);
      },
  );
};

//------------------------------------------------------------------------------------
const hashListener = (e: Event) => {
  const { oldURL, newURL } = e as HashChangeEvent;
  handleUrlChange(oldURL, newURL);
};

//------------------------------------------------------------------------------------
export const captureUrlChange = () => {
  historyListener();
  global?.addEventListener?.('hashchange', hashListener, true);
};

//------------------------------------------------------------------------------------
export const removeCaptureUrlChange = () => {
  global.history.pushState = historyOriginal.pushState;
  global.history.replaceState = historyOriginal.replaceState;
  global.onpopstate = historyOriginal.onpopstate;
  global?.removeEventListener?.('hashchange', hashListener, true);
};
