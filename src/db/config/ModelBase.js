import mongoose from "mongoose"
class ModelBase {

    static init(tableName, schema) {
        const newSchema = new mongoose.Schema(schema, { timestamps: true })
        this.model = mongoose.model(tableName, newSchema)
    }

    static findAll(where, page, limit, populates, sort) {
        if (!where.deletedAt) where.deletedAt = null;
        const query = this.model.find(where);
        if (sort) query.sort(sort);
        if (limit && page) {
            const skip = Number(limit) * (Number(page) - 1);
            query.skip(skip).limit(limit);
        }

        if (populates && populates.length > 0) {
            populates.forEach(p => query.populate(p))
        }
        return query.exec();
    }
    static count(where) {
        if (!where.deletedAt) where.deletedAt = null;
        const total = this.model.countDocuments(where);
        return total
    }
    static create(params) {
        const data = this.model(params)
        return data.save()
    }
    static async findOneAndUpdate(where, attr) {
        if (!where.deletedAt) where.deletedAt = null;
        const before = await this.model.findOne(where).exec();
        const item = await this.model.findOneAndUpdate(where, attr, { new: true }).exec();
        return {
            item, before
        }
    }
    static findItem(where) {
        if (!where.deletedAt) where.deletedAt = null;
        const query = this.model.findOne(where, populates);
        if (populates && populates.length > 0) {
            populates.forEach(p => query.populate(p))
        }
        return query.exec()
    }
    static delete(where) {
        if (!where.deletedAt) where.deletedAt = null;
        const update = { deletedAt: new Date() };
        this.model.findOneAndUpdate(where, update, { new: true }).exec();
    }
}
export default ModelBase