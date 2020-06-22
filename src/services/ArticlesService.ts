import {Inject, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {Article} from '../models/Article';
import {MongoService} from './MongoService';

@Service()
export class ArticlesService extends MongoService<Article> {
    constructor(@Inject(Article) private articleModel: MongooseModel<Article>) {
        super(articleModel);
    }
}
