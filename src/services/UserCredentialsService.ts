import {Inject, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {MongoService} from './MongoService';
import {UserLoginCredentials} from '../models/LoginCredentials';

@Service()
export class UserCredentialsService extends MongoService<UserLoginCredentials> {
    constructor(@Inject(UserLoginCredentials) private userModel: MongooseModel<UserLoginCredentials>) {
        super(userModel);
    }
}
