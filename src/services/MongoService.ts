import {MongooseModel} from '@tsed/mongoose';

export class MongoService<T> {
    constructor(private model: MongooseModel<T>) {
    }

    async save(item: T, upsert = true): Promise<T> {
        const doc = new this.model(item);
        return await doc.save(item);
    }

    async saveMany(docs: T[]): Promise<T[]> {
        return this.model.insertMany(docs);
    }

    async findById(id: string): Promise<T> {
        return await this.model.findById(id).exec();
    }

    async remove(id: string): Promise<void> {
        return await this.model.findById(id).remove().exec();
    }

    async findOne(options = {}): Promise<T> {
        return this.model.findOne(options).exec();
    }

    async query(options = {}): Promise<T[]> {
        return this.model.find(options).exec();
    }
}
