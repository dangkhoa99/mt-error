import { AnyType } from '../../types';
import { getGlobal, getMTErrorObject, getSelector } from '../../utils';

const global = getGlobal<Window>();

//------------------------------------------------------------------------------------
const listener = (e: MouseEvent) => {
  if (e.target) {
    const { client } = getMTErrorObject<Window>();
    const { tagName, id, className, name, src, nodeType } = e.target as AnyType;

    if (
      (tagName as string).toUpperCase() !== 'HTML' &&
      (tagName as string).toUpperCase() !== 'BODY'
    ) {
      const selector = getSelector(e);

      client.addAction({
        message: `Click ${tagName}`,
        data: {
          tagName,
          id: id || undefined,
          className: className || undefined,
          name: name || undefined,
          src: src || undefined,
          nodeType: nodeType || undefined,
          selector: selector || undefined,
        },
        type: 'click',
      });
    }
  }
};

//------------------------------------------------------------------------------------
export const captureClick = () => {
  global?.document?.addEventListener?.('click', listener, true);
};

//------------------------------------------------------------------------------------
export const removeCaptureClick = () => {
  global?.document?.removeEventListener?.('click', listener, true);
};
