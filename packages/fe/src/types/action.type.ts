import { AnyType } from './common.type';

//------------------------------------------------------------------------------------
export interface IAction {
  type: string;
  timestamp: string;
  message: string;
  data: Record<string, AnyType>;
}

//------------------------------------------------------------------------------------
export interface INewAction extends Omit<IAction, 'timestamp'> {}
