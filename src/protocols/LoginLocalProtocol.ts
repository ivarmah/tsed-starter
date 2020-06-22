import {BodyParams, Req} from '@tsed/common';
import {OnVerify, Protocol, Arg} from '@tsed/passport';
import {IStrategyOptions, Strategy} from 'passport-local';
import {UserCredentialsService} from '../services/UserCredentialsService';
import {LoginCredentialsForm} from '../models/LoginCredentials';
import {ExtractJwt, StrategyOptions, Strategy as JwtStrategy} from 'passport-jwt';
import {get} from 'lodash';

@Protocol<IStrategyOptions>({
    name: 'login',
    useStrategy: Strategy,
    settings: {
        usernameField: 'email',
        passwordField: 'password'
    }
})
export class LoginLocalProtocol implements OnVerify {
    constructor(private userCredentialsService: UserCredentialsService) {
    }

    async $onVerify(@Req() request: Req, @BodyParams() credentials: LoginCredentialsForm) {
        const {email, password} = credentials;
        const userCredentials = await this.userCredentialsService.findOne({email});
        return userCredentials ? userCredentials.verifyPassword(password) : false;
    }
}


@Protocol<StrategyOptions>({
    name: 'jwt',
    useStrategy: JwtStrategy,
    settings: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER
    }
})
export class JwtProtocol implements OnVerify {
    constructor(private userCredentialsService: UserCredentialsService) {
    }

    async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
        const email = get(jwtPayload, 'uid');
        if (email) {
            const userCredentials = await this.userCredentialsService.findOne({email});
            return !!userCredentials;
        } else {
            return false;
        }
    }
}
