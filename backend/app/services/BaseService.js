class BaseService {
  constructor(model) {
    this.model = model;
  }
  async deleteOne(id, cb) {
    this.model.findOneAndRemove({ _id: id }).then(cb);
  }
  async updateOne(id, obj, options={}, cb) {
    this.model.findOneAndUpdate({ _id: id }, obj, options).then(cb);
  }
  async createOne(obj, cb) {
    this.model.create(obj).then(cb);
  }
  async fetchLimit(limit, cb) {
    this.model.find().limit(limit).then(cb);
  }
  async find(filter, cb) {
    this.model.find(filter).then(cb);
  }
  async isExist(id) {
    return await this.model.exists({_id: id});
  }
}

module.exports = BaseService;