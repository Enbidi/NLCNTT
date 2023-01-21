class BaseService {
  constructor(model) {
    this.model = model;
  }
  async deleteOne(filter, cb) {
    this.model.findOneAndRemove(filter, cb);
  }
  async updateOne(filter, obj, options = {}, cb) {
    if (cb !== undefined) {
      this.model.findOneAndUpdate(filter, obj, options, cb);
      return;
    } 
    return await this.model.findOneAndUpdate(filter, obj, options).exec();
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
  async createOne(obj, cb) {
    if (cb !== undefined) {
      this.model.create(obj, cb);
      return;
    }
    return await new this.model(obj).save();
  }
  async create(obj) {
    return await new this.model(obj).save();
  }
  async save(obj) {
    await new this.model(obj).save();
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
    if (cb) {
      this.model.findOne(filter, cb);
      return;
    }
    return await this.modal.findOne(filter).exec();
  }
  async isExist(id) {
    return await this.model.exists({ _id: id });
  }
}

module.exports = BaseService;
