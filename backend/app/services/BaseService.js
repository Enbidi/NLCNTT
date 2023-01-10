class BaseService {
  constructor(model) {
    this.model = model;
  }
  async deleteOne(filter, cb) {
    this.model.findOneAndRemove(filter, cb);
  }
  async updateOne(filter, obj, options={}, cb) {
    this.model.findOneAndUpdate(filter, obj, options, cb);
  }
  // async findOneAndUpdate(filter, obj, options) {
  //   await this.model.findOneAndUpdate(filter, obj)
  //     .exec();
  // }
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