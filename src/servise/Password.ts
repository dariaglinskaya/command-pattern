import { CommandConfig } from './CommandConfig';
import { IAction } from './interfaces/IAction';

export class ChangePasswordCommand extends CommandConfig {
    constructor(action: IAction) {
        super({
            receiver: action.receiver,
            changedValue: action.changedValue,
            modificationType: 'password'
        });
    }
}