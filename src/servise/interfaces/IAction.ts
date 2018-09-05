import {User} from '../User';

export interface IAction {
    receiver: User,
    changedValue: string;
}