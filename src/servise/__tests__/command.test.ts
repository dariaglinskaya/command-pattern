import { CommandConfig } from '../CommandConfig';
import { CommandManager } from '../CommandManager';
import { ChangeEmailCommand } from '../Email';
import { ChangePasswordCommand } from '../Password';
import { ChangePhoneCommand } from '../Phone';
import { User } from '../User';

describe('Command pattern implementation for Email class', () => {
    const user = new User('demo@email.com','+375332223344','1111');
    const manager: CommandManager = new CommandManager();
    let changeEmailCommand: CommandConfig = new ChangeEmailCommand({ receiver: user, changedValue: 'new@email.com' });
    let changePhoneCommand: CommandConfig = new ChangePhoneCommand({ receiver: user, changedValue: '+375331112233' });
    let changePasswordCommand: CommandConfig = new ChangePasswordCommand({ receiver: user, changedValue: 'password' });
    it('should change email', () => {
        expect(user.email).toEqual('demo@email.com');
        manager.execute(changeEmailCommand);
        expect(user.email).toEqual('new@email.com');
    });
    it('should change password', () => {
        expect(user.password).toEqual('1111');
        manager.execute(changePasswordCommand);
        expect(user.password).toEqual('password');
    });
    it('should change phone', () => {
        expect(user.phone).toEqual('+375332223344');
        manager.execute(changePhoneCommand);
        expect(user.phone).toEqual('+375331112233');
    });

    it('should undo and redo changing phone', () => {
        const countCommands = manager.getCurrentExecutions();
        expect(user.phone).toEqual('+375331112233');
        manager.undo();
        expect(manager.getCurrentExecutions()).toEqual(countCommands - 1);
        expect(user.phone).toEqual('+375332223344');
        manager.redo();
        expect(user.phone).toEqual('+375331112233');
        expect(manager.getCurrentExecutions()).toEqual(countCommands);
    });

    it('should save executed commands', () => {
        const count = manager.getExecutedCommands();
        manager.execute(changeEmailCommand);
        manager.execute(changePasswordCommand);
        manager.execute(changePhoneCommand);
        expect(manager.getExecutedCommands()).toEqual(count + 3);
    });

    it('should correctly add action after undo', () => {
        const current = manager.getCurrentExecutions();
        const count = manager.getExecutedCommands();
        manager.undo();
        expect(manager.getCurrentExecutions()).toEqual(current-1);
        expect(manager.getExecutedCommands()).toEqual(count);
        manager.execute(changePhoneCommand);
        expect(user.phone).toEqual('+375331112233');
    })


});

