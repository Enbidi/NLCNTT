const BaseService = require("./BaseService");

const { Comment } = require("../models/Comment");

class CommentService extends BaseService {
  constructor(model) {
    super(model);
  }
  async findByContent(content, cb) {
    this.model.findByContent(content, cb);
  }

  // async deleteOne(id, cb) {
  //   super.deleteOne(id).then(cb);
  // }

  // async updateOne(id, obj, cb) {
  //   super.updateOne(id, obj).then(cb);
  // }

  // async createOne(obj, cb) {
  //   super.createOne(obj).then(cb);
  // }

  // async fetchLimit(limit, cb) {
  //   super.fetchLimit(limit, cb);
  // }
}

module.exports = new CommentService(Comment);