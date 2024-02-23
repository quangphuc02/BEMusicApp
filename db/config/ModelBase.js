class ModelBase {
    constructor(model) {
        this.model = model
    }

    async findAll(where, page, limit, populates, sort) {
        if (!where.deletedAt) where.deletedAt = null;
        const query = await this.model.find(where);
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
    async count(where) {
        if (!where.deletedAt) where.deletedAt = null;
        const total = await this.model.countDocuments(where);
        return total
    }
    async create(params) {
        const data = await this.model(params)
        return data.save()
    }
    async findOneAndUpdate(where, attr) {
        if (!where.deletedAt) where.deletedAt = null;
        const before = await this.model.findOne(where).exec();
        const item = await this.model.findOneAndUpdate(where, attr, { new: true }).exec();
        return {
            item, before
        }
    }
    async findItem(where) {
        if (!where.deletedAt) where.deletedAt = null;
        const query = await this.model.findOne(where);
        return query.exec()
    }
    async delete(where) {
        if (!where.deletedAt) where.deletedAt = null;
        const update = { deletedAt: new Date() };
        await this.model.findOneAndUpdate(where, update, { new: true }).exec();

    }
}
module.exports = ModelBase