import {ProviderScope, Scope, Service} from '@tsed/di';
import * as jwt from 'jsonwebtoken';

@Service()
@Scope(ProviderScope.SINGLETON)
export class JwtUtility {
    private secret: string;
    private issuer: string;

    constructor() {
        this.secret = process.env.JWT_SECRET;
        this.issuer = process.env.JWT_ISSUER;
    }

    generateToken(id: string): string {
        return jwt.sign(
            {uid: id, iss: this.issuer},
            this.secret,
            {expiresIn: '1h'}
        );
    }
}
