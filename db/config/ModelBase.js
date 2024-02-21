class ModelBase {
    constructor(model) {
        this.model = model
    }

    findAll(where, page, limit, populates, sort) {
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
    create(params) {
        const data = new this.model(params)
        return data.save()
    }
    findItem(where) {
        if (!where.deletedAt) where.deletedAt = null;
        const query = this.model.findOne(where);
        return query.exec()
    }
}
module.exports = ModelBase