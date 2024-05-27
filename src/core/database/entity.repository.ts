import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery, { __v: 0, ...projection });
  }

  async updateMany(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<boolean> {
    const updateResult = await this.entityModel.updateMany(entityFilterQuery, updateEntityData);
    return updateResult.modifiedCount >= 1;
  }

  async create(createEntityData: unknown) {
    const entity = new this.entityModel(createEntityData);
    await entity.save();

    return entity;
  }

  async createMany(createEntityData: unknown[]) {
    return this.entityModel.insertMany(createEntityData);
  }

  async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<unknown>): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
    });
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
