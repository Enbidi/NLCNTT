class BaseService {
  constructor(model) {
    this.model = model;
  }
  async deleteOne(id, cb) {
    this.model.findOneAndRemove({ _id: id }, cb);
  }
  async updateOne(id, obj, options={}, cb) {
    this.model.findOneAndUpdate({ _id: id }, obj, options, cb);
  }
  async createOne(obj, cb) {
    this.model.create(obj, cb);
  }
  async save(obj) {
    await (new this.model(obj)).save();
  }
  async addOne(obj) {
    const doc = new this.model(obj);
    await doc.save();
    return doc;
  }
  async fetchLimit(limit, cb) {
    this.model.find({}, cb).limit(limit);
  }
  async find(filter, cb) {
    this.model.find(filter, cb);
  }
  async isExist(id) {
    return await this.model.exists({_id: id});
  }
}

module.exports = BaseService;