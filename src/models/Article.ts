import {Model, ObjectID} from '@tsed/mongoose';
import {Property, Required} from '@tsed/common';

@Model()
export class Article {
    @ObjectID('id')
    _id: string;

    @Property()
    title?: string;

    @Required()
    @Property()
    link: string;

    @Property()
    pdfLink?: string;

    constructor(link: string) {
        this.link = link;
    }
}
