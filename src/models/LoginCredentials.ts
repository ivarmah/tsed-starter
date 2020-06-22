import {Description, Example,} from '@tsed/swagger';
import {Format, Required} from '@tsed/common';
import {Model, ObjectID, PreHook, Unique} from '@tsed/mongoose';
import * as bcrypt from 'bcrypt';

export class LoginCredentialsForm {
    @Description('User email')
    @Example('user@domain.com')
    @Format('email')
    @Unique()
    @Required()
    email: string;

    @Description('User password')
    @Required()
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}


@Model()
export class UserLoginCredentials extends LoginCredentialsForm {
    @Description('Database assigned id')
    @ObjectID('id')
    _id?: string;

    constructor(email: string, password: string) {
        super(email, password);
    }

    async verifyPassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    @PreHook('save')
    static preSave(credentials: UserLoginCredentials, next: any): void {
        credentials.password = bcrypt.hashSync(credentials.password, 10);
        next();
    }
}
