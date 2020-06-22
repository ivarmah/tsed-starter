import {BodyParams, Controller, Get, Post, Required, UseAfter} from '@tsed/common';
import {ArticlesService} from '../services/ArticlesService';
import {Article} from '../models/Article';
import {Authenticate} from '@tsed/passport';
import {JwtSignTokenMiddleware} from '../middlewares/jwt-sign-token-middleware';
import {BadRequest} from "@tsed/exceptions";

@Controller('/articles')
@Authenticate('jwt', {failWithError: true})
export class ArticleController {
    constructor(private readonly articlesService: ArticlesService) {
    }

    @UseAfter(JwtSignTokenMiddleware)
    @Get('/')
    findAll(): any {
        return this.articlesService.query();
    }

    @Post('/')
    @UseAfter(JwtSignTokenMiddleware)
    upload(@Required() @BodyParams('links') links: string[]): any {
        if (!links || links.length === 0) {
            throw(new BadRequest('Links array is empty'));
        } else {
            return this.articlesService.saveMany(links.map(l => new Article(l)));
        }
    }
}


