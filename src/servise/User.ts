import {IUser} from './interfaces/IUser';

export class User implements IUser{
    public email;
    public phone;
    public password;
    constructor(email, phone, password) {
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
}