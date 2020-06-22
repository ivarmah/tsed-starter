import {ConverterService, IMiddleware, Middleware, Req, Res} from '@tsed/common';
import {JwtUtility} from '../utilities/jwt.utility';

@Middleware()
export class JwtSignTokenMiddleware implements IMiddleware {
    makeToken = (email: string): string => this.jwtUtility.generateToken(email);
    setBearerToken = (response: Res, uid: string) => response.header('authorization', `Bearer ${this.makeToken(uid)}`);

    constructor(private converterService: ConverterService, private jwtUtility: JwtUtility) {
    }

    public use(@Req() request: Req, @Res() response: Res): any {
        const email = request.ctx.get('userEmail');

        if (request.header('authorization')) {
            this.setBearerToken(response, email);
        }
    }
}
