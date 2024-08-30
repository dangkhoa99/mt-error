import { AnyType, IAction } from '../types';

export class Action implements IAction {
  readonly type: string;
  readonly timestamp: string;
  readonly message: string;
  readonly data: Record<string, AnyType>;

  constructor(opts: IAction) {
    const { type, message, data, timestamp } = opts;

    this.type = type;
    this.timestamp = timestamp;
    this.message = message;
    this.data = data;
  }
}
