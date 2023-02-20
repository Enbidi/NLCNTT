const BaseService = require("./BaseService");

const { Comment } = require("../models/Comment");

class CommentService extends BaseService {
  constructor(model) {
    super(model);
  }
  async findByContent(content, cb) {
    this.model.findByContent(content, cb);
  }

  async getComments(filter, limit, cb) {
    return await this.model.find()
      .limit(limit)
      .populate({
        path: 'product',
        populate: {
          path: 'origin branch',
          select: 'country name'
        }
      })
      .populate('user')
      .exec(cb);
  }

}

module.exports = new CommentService(Comment);