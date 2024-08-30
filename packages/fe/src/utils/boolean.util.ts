import { AnyType, IEvent } from '../types';

//------------------------------------------------------------------------------------
export const isEvent = (eventLike: AnyType): eventLike is IEvent<AnyType> => {
  return Boolean(eventLike?.isEvent);
};
