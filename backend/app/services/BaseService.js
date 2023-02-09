class BaseService {
  constructor(model) {
    this.model = model;
  }
  async deleteOne(filter, cb) {
    this.model.findOneAndRemove(filter, cb);
  }
  async updateOne(filter, obj, options = {}, cb) {
    return await this.model.findOneAndUpdate(filter, obj, options).exec(cb);
  }
  async update(filter, obj, options = {}) {
    return await this.model.findOneAndUpdate(filter, obj, options).exec();
  }
  async removeOne(filter, cb) {
    if (cb !== undefined) {
      this.model.findOneAndRemove(filter, cb);
      return;
    }
    return await this.model.findOneAndRemove(filter)
      .exec();
  }
  async removeMany(filter, cb) {
    if (cb !== undefined) {
      this.model.deleteMany(filter, cb);
      return;
    }
    return await this.model.deleteMany(filter).exec();
  }
  async createOne(obj, cb) {
    if (cb !== undefined) {
      this.model.create(obj, cb);
      return;
    }
    return await new this.model(obj).save();
  }
  async create(obj, cb) {
    return await new this.model(obj).save(cb);
  }
  async save(obj, cb) {
    return await new this.model(obj).save(cb);
  }
  async addOne(obj) {
    const doc = new this.model(obj);
    await doc.save();
    return doc;
  }
  async fetchLimit(filter, limit, cb) {
    this.model.find(filter).limit(limit).exec(cb);
  }
  async fetch(filter, options, cb) {
    let builder = this.model.find(filter);
    if (!isNaN(options.limit)) {
      builder.limit(options.limit)
    }
    if (options.populationOptions instanceof Array) {
      for (const opt of options.populationOptions) {
        builder = builder.populate(opt);
      }
    }
    builder.exec(cb);
  }
  async find(filter, cb) {
    this.model.find(filter, cb);
  }
  async findOne(filter, cb) {
    return await this.model.findOne(filter).exec(cb);
  }
  async isExist(filter) {
    switch(typeof filter) {
    case "string":
      return await this.model.exists({ _id: filter });
    case "object":
      return await this.model.exists(filter);
    }
  }
  async exists(filter) {
    switch(typeof filter) {
    case "string":
      return await this.model.exists({ _id: filter });
    case "object":
      return await this.model.exists(filter);
    }
  }
  size(cb) {
    return this.model.countDocuments().exec(cb)
  }
}

module.exports = BaseService;
