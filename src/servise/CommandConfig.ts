import { ICommand } from './interfaces/ICommand';
import { ICommandConfig } from './interfaces/ICommandConfig';

export class CommandConfig implements ICommand {
    private previousValue: string;

    constructor(private config: ICommandConfig) { };

    public do(): void {
        this.previousValue = this.config.receiver[this.config.modificationType];
        this.config.receiver[this.config.modificationType] = this.config.changedValue;
    }

    public undo(): void {
        this.config.receiver[this.config.modificationType] = this.previousValue;
    }
}
