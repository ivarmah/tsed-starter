import {BodyParams, Context, Controller, Get, Post, ProviderScope, Req, Res, Scope, UseAfter} from '@tsed/common';
import {Authenticate} from '@tsed/passport';
import {Responses, Returns} from '@tsed/swagger';
import {UserCredentialsService} from '../services/UserCredentialsService';
import {LoginCredentialsForm, UserLoginCredentials} from '../models/LoginCredentials';
import {JwtUtility} from '../utilities/jwt.utility';
import {JwtSignTokenMiddleware} from '../middlewares/jwt-sign-token-middleware';

@Controller('/auth')
@Scope(ProviderScope.SINGLETON)
export class PassportController {
    constructor(
        private readonly userCredentialsService: UserCredentialsService,
        private readonly jwtUtility: JwtUtility) {
    }

    @Post('/login')
    @Authenticate('login', {failWithError: true})
    @Responses(400, {description: 'Validation error'})
    login(@Req() req: Req, @BodyParams() {email}: LoginCredentialsForm, @Context() context: Context) {
        context.set('userEmail', email);
        return {email, token: this.jwtUtility.generateToken(email)};
    }

    @Post('/signup')
    @Returns(Boolean)
    signup(@Req() req: Req, @BodyParams() {email, password}: LoginCredentialsForm) {
        return this.userCredentialsService.save(new UserLoginCredentials(email, password)).then(credential => {
            return {token: this.jwtUtility.generateToken(credential._id)};
        });
    }
}
