import { AnyType, IConfig, IEvent } from '../types';

//------------------------------------------------------------------------------------
export const isEvent = (eventLike: AnyType): eventLike is IEvent<AnyType> => {
  return Boolean(eventLike?.isEvent);
};

//------------------------------------------------------------------------------------
export const isConfigValid = (config: IConfig) => {
  return config.publicKey && config.endpoint && config.projectId;
};
