import { CommandConfig } from './CommandConfig';
import { IAction } from './interfaces/IAction';

export class ChangeEmailCommand extends CommandConfig {
    constructor(action: IAction) {
        super({
            receiver: action.receiver,
            changedValue: action.changedValue,
            modificationType: 'email'
        });
    }
}