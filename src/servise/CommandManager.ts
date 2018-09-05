import { ICommand } from './interfaces/ICommand';

export class CommandManager {
    private executedCommands: Array<ICommand> = [];
    private currentExecutionState: number = -1;

    constructor() { };

    public getExecutedCommands() {
        return this.executedCommands.length;
    }
    public getExecutedCommandsArray() {
        return this.executedCommands;
    }
    public getCurrentExecutions() {
        return this.currentExecutionState;
    }

    public execute(command: ICommand): void {
        if (this.executedCommands.length - 1 > this.currentExecutionState) {
            let nextCommand: number = this.currentExecutionState + 1;
            this.executedCommands.splice(nextCommand, this.executedCommands.length - nextCommand);
        }

        this.executedCommands.push(command);
        command.do();
        this.currentExecutionState = this.executedCommands.length - 1;
    }

    public undo() {
        if (this.currentExecutionState >= 0) {
            this.executedCommands[this.currentExecutionState--].undo();
        }
    }

    public redo() {
        if (this.currentExecutionState < this.executedCommands.length - 1) {
            this.executedCommands[++this.currentExecutionState].do();
        }
    }
}